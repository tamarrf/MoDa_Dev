<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211019_140435_migration_taskvideofield extends Migration
{
    /**
    Migration manifest:

    FIELD
    - taskVideos
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"fields":[{"group":"Journey","name":"Task Videos","handle":"taskVideos","instructions":"","translationMethod":"site","translationKeyFormat":null,"required":null,"searchable":true,"type":"craft\\fields\\Matrix","typesettings":{"minBlocks":"","maxBlocks":"","contentTable":"{{%matrixcontent_taskvideos}}","propagationMethod":"all","propagationKeyFormat":null,"blockTypes":{"new1":{"name":"Video","handle":"video","fields":{"new1":{"name":"Source","handle":"source","instructions":"","required":"1","type":"craft\\fields\\Assets","translationMethod":"site","translationKeyFormat":null,"typesettings":{"useSingleFolder":false,"allowUploads":true,"defaultUploadLocationSource":"taskVideos","defaultUploadLocationSubpath":"","singleUploadLocationSource":"contentImages","singleUploadLocationSubpath":"","restrictFiles":"1","allowedKinds":["video"],"showUnpermittedVolumes":false,"showUnpermittedFiles":false,"previewMode":"full","sources":["taskVideos"],"source":null,"targetSiteId":null,"viewMode":"large","limit":"1","selectionLabel":"","showSiteMenu":true,"localizeRelations":false,"validateRelatedElements":false,"allowSelfRelations":false}},"new2":{"name":"Dropdown Title","handle":"dropdownTitle","instructions":"","required":"1","type":"craft\\fields\\PlainText","translationMethod":"none","translationKeyFormat":null,"typesettings":{"uiMode":"normal","placeholder":null,"code":"","multiline":"","initialRows":"4","charLimit":null,"byteLimit":255,"columnType":null}}}}}}}]}}}
JSON;

    /**
     * Any migration code in here is wrapped inside of a transaction.
     * Returning false will rollback the migration
     *
     * @return bool
     */
    public function safeUp()
    {
        return MigrationAssistant::getInstance()->migrations->import($this->json);
    }

    public function safeDown()
    {
        echo "m211019_140435_migration_taskvideofield cannot be reverted.\n";
        return false;
    }
}
