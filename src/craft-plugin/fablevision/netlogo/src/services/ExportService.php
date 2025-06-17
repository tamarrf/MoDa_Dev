<?php
/**
 * netlogo plugin for Craft CMS 3.x
 *
 * Craft plugin to support Blockly and Netlogo integration 
 *
 * @link      fablevision.com
 * @copyright Copyright (c) 2021 Chris Spence
 */

namespace fablevision\netlogo\services;

use fablevision\netlogo\Netlogo;
use fablevision\netlogo\records\ProgressRecord;

use Craft;
use craft\base\Component;
use craft\elements\User;
use craft\elements\Asset;
use craft\elements\Category;
use craft\elements\Entry;
use craft\elements\GlobalSet;
use craft\elements\MatrixBlock;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\helpers\FileHelper;

use Aws\S3\S3Client as S3Client;
use Aws\Credentials\Credentials as Credentials;
use Aws\Exception\AwsException;

use ZipArchive;
use DateTime;
use DateTimeZone;

/**
 * @author    Chris Spence
 * @package   Netlogo
 * @since     0.0.5
 */
class ExportService extends Component {

    public function import($path) {
        $filename = basename($path);
        $bucket = getenv("AWS_S3_BUCKET");
        $s3 = $this->createClient();
        $zipPath = dirname(__DIR__) . "/migrations-pkg/$filename";
        $folderPath = preg_replace("/.zip$/", "", $zipPath);
        $package = $s3->getObject(['Bucket' => $bucket, 'Key' => $path]);
        file_put_contents($zipPath, $package['Body']->getContents());

        $archive = new ZipArchive();
        $archive->open($zipPath);
        $archive->extractTo(dirname(__DIR__) . "/migrations-pkg/");
        $archive->close();

        $context = $this->createContext();
        $output = file_get_contents($folderPath . "/content.json", false, stream_context_create($context));
        $content = Json::decode($output);
        $origin = $content["origin"];

        copy($folderPath . "/content.json", dirname(__DIR__) . "/migrations-json/current.json");

        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $handle = preg_replace("/\//","\\/",getenv("PLUGIN_HANDLE"));
            $documentRoot = preg_replace("/" . $handle  . "\/src/", "web", dirname(__DIR__));
        } else {
            $documentRoot = $_SERVER["DOCUMENT_ROOT"];
        }
        
        $url = getenv("PRIMARY_SITE_URL");
        $assets = $content["assets"];
        
        foreach ($assets as $name => $volume) {
            foreach($volume as $asset) {
                $assetPath = str_replace($origin, $documentRoot, $asset["src"]);
                $filename = $asset["filename"];
                copy("$folderPath/$filename", $assetPath);
            }
        }

        FileHelper::unlink($zipPath);
        FileHelper::removeDirectory($folderPath);

        $feeds = Craft::$app->config->general->__get("feedConfig");

        foreach ($feeds as $id => $passcode) {
            $feedUrl = "$url/index.php?p=actions/feed-me/feeds/run-task&direct=1&feedId=$id&passkey=$passcode";
            $cmd = 'curl --silent --compressed "'.$feedUrl.'"';
            exec($cmd);
        }

        $queue = Craft::$app->getQueue();
        $queue->run();
    }

    public function getImports() {
        $bucket = getenv("AWS_S3_BUCKET");
        $slug = getenv("PLUGIN_SLUG");
        $s3 = $this->createClient();
        $objects = $s3->getPaginator('ListObjects', ['Bucket' => $bucket]);

        $imports = array();
        
        foreach ($objects as $listResponse) {
            $items = $listResponse->search("Contents[?starts_with(Key,'$slug')]");
            foreach($items as $item) {
                $date = $item['LastModified']->format('m/d/Y H:i:s');
                $imports[] = (object) array("key" => $item['Key'], "name" => basename($item['Key']) . " (" . $date . ")");
            }
        }

        return $imports;
    }

    public function compile() {
        $content = Netlogo::$plugin->exporter->export();
        $filename = $content->exportId;
        $content->origin = getenv("PRIMARY_SITE_URL");
        $current = dirname(__DIR__) . '/migrations-json/current.json';
        $path = dirname(__DIR__) . "/migrations-json/$filename.json";
        file_put_contents($path, Json::encode($content));
        file_put_contents($current, Json::encode($content, JSON_PRETTY_PRINT));
        return $content;
    }

    public function package($content) {
        $documentRoot = $_SERVER["DOCUMENT_ROOT"];
        $slug = $content->exportId;
        $migrationUrl = getenv("MIGRATION_ASSET_URL");
        $contentPath = dirname(__DIR__) . "/migrations-json/$slug.json";
        $zipPath = dirname(__DIR__) . "/migrations-pkg/$slug.zip";
        
        $zip = new ZipArchive();
        $zip->open($zipPath, ZipArchive::CREATE);
        $zip->addFile($contentPath, $slug . "/content.json");

        $assets = $content->assets;
        foreach ($assets as $name => $volume) {
            foreach($volume as $asset) {
                $assetPath = str_replace($migrationUrl, $documentRoot, $asset->src);
                $zip->addFile($assetPath,$slug . "/" . basename($assetPath));
            }
        }

        $zip->close();
        return $zipPath;
    }

    public function upload($zip) {
        $bucket = getenv("AWS_S3_BUCKET");
        $slug = getenv("PLUGIN_SLUG");
        $s3 = $this->createClient();
        $filename = $slug . "/" . basename($zip);

        $result = $s3->putObject([
            'Bucket' => $bucket,
            'Key'    => $filename,
            'Body'   => fopen($zip, 'r'),
        ]);

    }

    public function export() {
    	$content = (object) array();
        $content->exportId = 'm' . gmdate('ymd_His');
    	$content->globals = $this->exportGlobals();
    	$content->entries = $this->exportEntries();
    	$content->assets = $this->exportAssets();
    	$content->categories = $this->exportCategories();
        return $content;
    } 

    protected function exportGlobals() {
    	$globals = (object) array();
        $ghomePage = Craft::$app->globals->getSetByHandle('homePage');
        $fields = $ghomePage->getFieldLayout()->getFields();

        foreach ($fields as $field) {

            if($field->handle === "homePageBanner") {
                $homePage = (object) array();
                $info = $ghomePage->getFieldValue($field->handle);
                $homePage->homePageBanner = $this->createImage($info);
            }
        }
        
        $globals = (object) array("homePage" => $homePage);
        return $globals;
    }

    protected function exportEntries() {
    	$entries = (object) array();
        $entries->journies = array();
        $entries->tasks = array();
        $entries->menuPages = array();
        $entries->teacherDashboard = array();

        $journies = Entry::find()
                        ->section("journey")
                        ->all();

        $tasks = Entry::find()
                        ->section("journeyTask")
                        ->all();

        $menuPages = Entry::find()
                        ->section("menuPage")
                        ->all();

        $ggbSettings = Entry::find()
                        ->section("ggbSettings")
                        ->one();

        $graphSettings = Entry::find()
                        ->section("graphSettings")
                        ->one();

        foreach($menuPages as $menuPage) {
            $sections = $menuPage->pageSection->all();

            $sectionBlocks = [];
            foreach($sections as $section) {
                $sectionBlocks[] = (object) array(
                    "sectionTitle" => $section->sectionTitle,
                    "sectionBody" => $this->createRichText($section->sectionBody),
                );
            }

            $locations = [];
            foreach ($menuPage->menuLocation as $option) {
                if($option->selected){
                    $locations[] = $option->value;
                }
            }

            $entries->menuPages[] = (object) array(
                "slug" => $menuPage->slug,
                "title" => $menuPage->title,
                "pageTitle" => $menuPage->pageTitle,
                "pageImage" => $this->createImage($menuPage->pageImage),
                "pageSection" => $sectionBlocks,
                "menuLocation" => $locations
            );
        }

        foreach($tasks as $task) {
            $taskVideoBlocks = $task->taskVideos->all();
            $taskBlockLibraries = $task->blockLibrary->getOptions();
            $taskViewComponents = $task->viewComponents->getOptions();
            $taskVideos = array();
            $blockLibraries = array();
            $viewComponents = array();

            foreach($taskVideoBlocks as $taskVideoBlock) {
                $taskVideos[] = (object) array(
                    "source" => $this->createAsset($taskVideoBlock->source),
                    "dropdownTitle" => $taskVideoBlock->dropdownTitle
                );
            }

            foreach($taskBlockLibraries as $taskBlockLibrary) {
                if(!$taskBlockLibrary->selected) continue;
                $blockLibraries[] = $taskBlockLibrary->value;
            }

            foreach($taskViewComponents as $taskViewComponent) {
                if(!$taskViewComponent->selected) continue;
                $viewComponents[] = $taskViewComponent->value;
            }

            $entries->tasks[] = (object) array(
                "slug" => $task->slug,
                "title" => $task->title,
                "taskTitle" => $task->taskTitle,
                "taskVideoChildren" => $taskVideos,
                "blockLibrary" => $blockLibraries,
                "taskScript" => $this->createAsset($task->taskScript),
                "worldWidth" => $task->worldWidth,
                "viewComponents" => $viewComponents,
                "taskChart" => $task->taskChart,
                "taskExperiment" => $task->taskExperiment,
                "taskWidget" => $task->taskWidget
            );
        }
        
        foreach ($journies as $journey) {
            $journeyTaskEntries = $journey->journeyTasks->all();
            $journeyResourceLinks = $journey->journeyResources->all();
            $journeyTasks = array();
            $journeyResources = array();
            $journeyCurriculumLinks = array();
            $journeyExamples = array();
            $exampleBlocks = $journey->journeyExamples->all();

            
            foreach($exampleBlocks as $exampleBlock) {
                $journeyExampleTask = $exampleBlock->exampleTask->one();
                $journeyExamples[] = (object) array(
                    "exampleTitle" => $exampleBlock->exampleTitle,
                    "exampleScript" => $exampleBlock->exampleScript,
                    "exampleTask" => $journeyExampleTask->slug
                );
            }

            foreach($journeyTaskEntries as $journeyTaskEntry) {
                $journeyTasks[] = $journeyTaskEntry->slug;
            }

            foreach($journeyResourceLinks as $journeyResourceLink) {
                $journeyResources[] = (object) array(
                    "linkDisplayText" => $journeyResourceLink->linkDisplayText,
                    "linkUrl" =>  $journeyResourceLink->linkUrl
                );
            }

            $sections = $journey->journeyCurriculum->all();
            $sectionBlocks = [];
            foreach($sections as $section) {
                $sectionBlocks[] = (object) array(
                    "sectionTitle" => $section->sectionTitle,
                    "sectionBody" => $this->createRichText($section->sectionBody),
                );
            }

            $curriculumLinks = $journey->curriculumLinks->all();
            foreach($curriculumLinks as $curriculumLink) {
                $journeyCurriculumLinks[] = (object) array(
                    "linkDisplayText" => $curriculumLink->linkDisplayText,
                    "linkUrl" =>  $curriculumLink->linkUrl
                );
            }

            $entries->journies[] = (object) array(
                "slug" => $journey->slug,
                "title" => $journey->title,
                "journeyTitle" => $journey->journeyTitle,
                "journeyDescription" => $this->createRichText($journey->journeyDescription),
                "thumbnail" => $this->createImage($journey->thumbnail),
                "childTasks" => $journeyTasks,
                "resources" => $journeyResources,
                "journeyCurriculum" => $sectionBlocks,
                "curriculumLinks" => $journeyCurriculumLinks,
                "journeyExamples" => $journeyExamples
            );
        }

        $dashboard = Entry::find()
                    ->section("teacherDashboard")
                    ->one();

        $entries->teacherDashboard[] = (object) array(
            "manageClassLabel" => $dashboard->manageClassLabel,
            "resourcesLabel" => $dashboard->resourcesLabel
        );


        $ggbSettingsBlock = $ggbSettings->ggbSettings->one();

        $entries->ggbSettings = (object) array(
            "slug" => $ggbSettings->slug,
            "title" => $ggbSettings->title,
            "sensor1" => $ggbSettingsBlock->sensor1->value,
            "sensor2" => $ggbSettingsBlock->sensor2->value,
            "dataSamplingFrequency" => $ggbSettingsBlock->dataSamplingFrequency,
            "units" => $ggbSettingsBlock->units->value
        );


        $entries->graphSettings = (object) array();
        $entries->graphSettings->slug = $graphSettings->slug;
        $entries->graphSettings->title = $graphSettings->title;
        $graphSettingsGeneral = $graphSettings->graphSettingsGeneral->one();
        $graphSettingsModel = $graphSettings->graphSettingsModel->one();
        $graphSettingsReal = $graphSettings->graphSettingsReal->one();

        $entries->graphSettings->general = (object) array(
            "plotStyle" => $graphSettingsGeneral->plotsStyle->value
        );

        $entries->graphSettings->model = (object) array(
            "xAxis" => $graphSettingsModel->xAxis->value,
            "yAxis" => $graphSettingsModel->yAxis->value,
            "graphType" => $graphSettingsModel->graphType->value
        );

        $entries->graphSettings->realWorld = (object) array(
            "xAxis" => $graphSettingsReal->xAxis->value,
            "yAxis" => $graphSettingsReal->yAxis->value,
            "graphType" => $graphSettingsReal->graphType->value
        );

        return $entries;
    }

    protected function exportAssets() {
    	$assets = (object) array();
        $craftAssets = Asset::find()->all();

        foreach($craftAssets as $craftAsset) {
            $volume = $craftAsset->volume;
            $folder = $craftAsset->folder;

            if(empty($assets->{$volume->handle})) {
                $assets->{$volume->handle} = array();
            }

            $assets->{$volume->handle}[] = (object) array( 
                "src" => $this->createAsset(null, $craftAsset),
                "filename" => $craftAsset->filename,
                "title" => $craftAsset->title,
                "folder" => $folder->name
            );
        }

        return $assets;
    }

    protected function exportCategories() {
    	$categories = (object) array();
        return $categories;
    }

    protected function trace($obj) {
    	error_log(print_r($obj, true));
    }

    protected function createImage($info, $img = null, $dimensions = false) {
        if(empty($img) && (empty($info) || empty($info->one()))) return null;
        $url = getenv("PRIMARY_SITE_URL");
        $info = empty($img) ? $info->one() : $img;
        $alt = empty($info->altText) ? $info->title : $info->altText;
        $obj = (object) array("src" => getenv("MIGRATION_ASSET_URL") . str_replace($url, "", $info->getUrl()), "alt" => $alt);
        return $obj;
    }

    protected function createAsset($info, $asset = null) {
        if(empty($asset) && (empty($info) || empty($info->one()))) return null;
        $info = empty($asset) ? $info->one() : $asset;
        $url = getenv("PRIMARY_SITE_URL");
        return getenv("MIGRATION_ASSET_URL") . str_replace($url, "", $info->getUrl());
    }

    protected function createRichText($info) {
        if(empty($info)) return null;
        $value = preg_replace('/[\\n]/', " ", $info->getParsedContent());
        $collapsed = preg_replace('/\\s+/', "", $value);
        if(empty($collapsed)) return "";
        return preg_replace('/\s+/im', " ", $value);;
    }

    protected function createOptionalText($info) {
        if(empty($info)) return null;
        return preg_replace('/[\\n]/', "<br>", $info);
    }

    protected function createContext() {
        $url = getenv("PRIMARY_SITE_URL");
        $local = preg_match("/localhost/", $url);
        
        if(!$local) {
            $context = array(
                "http"=>array(
                    'protocol_version'=>'1.1'
                )
            );
        } else {
            $context = array(
                "ssl"=>array(
                    "verify_peer"=>false,
                    "verify_peer_name"=>false,
                ),
                "http"=>array(
                    'protocol_version'=>'1.1'
                )
            );
        }

        return $context;
    }

    private function createClient() {
        $key =  getenv("AWS_S3_KEY");
        $secret =  getenv("AWS_S3_SECRET");
        $region = getenv("AWS_S3_REGION");
        $credentials = new Credentials($key, $secret);

        $s3 = new S3Client([
            'version'     => 'latest',
            'region'      => $region,
            'credentials' => $credentials
        ]);

        return $s3;
    }
}
