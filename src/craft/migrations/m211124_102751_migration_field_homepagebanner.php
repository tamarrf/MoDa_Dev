<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211124_102751_migration_field_homepagebanner extends Migration
{
    /**
    Migration manifest:

    FIELD
    - homePageBanner
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"fields":[{"group":"Common","name":"Home Page Banner","handle":"homePageBanner","instructions":"","translationMethod":"site","translationKeyFormat":null,"required":null,"searchable":true,"type":"craft\\fields\\Assets","typesettings":{"useSingleFolder":false,"allowUploads":true,"defaultUploadLocationSource":"contentImages","defaultUploadLocationSubpath":"","singleUploadLocationSource":"contentImages","singleUploadLocationSubpath":"","restrictFiles":"1","allowedKinds":["image"],"showUnpermittedVolumes":false,"showUnpermittedFiles":false,"previewMode":"full","sources":["contentImages"],"source":null,"targetSiteId":null,"viewMode":"list","limit":"1","selectionLabel":"","showSiteMenu":false,"localizeRelations":false,"validateRelatedElements":false,"allowSelfRelations":false}}]}}}
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
        echo "m211124_102751_migration_field_homepagebanner cannot be reverted.\n";
        return false;
    }
}
