<?php

namespace fablevision\netlogo\jobs;
use fablevision\netlogo\Netlogo;

use Craft;
use ZipArchive;
use craft\helpers\Json;
use craft\queue\BaseJob;

class Export extends BaseJob {

    private $package = false;
    private $upload = false;

    public function __construct($config = [], $package = false, $upload = false) {
        parent::__construct($config);
        $this->package = $package;
        $this->upload = $upload;
    }

    public function execute($queue) {
        $content = $this->compileSiteContent($queue);
    }

    // Protected Methods
    // =========================================================================

    /**
     * Returns a default description for [[getDescription()]], if [[description]] isn’t set.
     *
     * @return string The default task description
     */
    protected function defaultDescription(): string {
        return Craft::t('netlogo', 'Creating content export');
    }

    private function compileSiteContent($queue) {
        
        $content = Netlogo::$plugin->exporter->compile();

        if($this->package === true) {
          $this->createMigrationPackage($content);
        }
    }

    private function createMigrationPackage($content) {
        $zipPath = Netlogo::$plugin->exporter->package($content);
        
        if($this->upload === true) {
          $this->upload($zipPath);
        }
    }

    private function upload($zip) {
        Netlogo::$plugin->exporter->upload($zip);
    }
}
