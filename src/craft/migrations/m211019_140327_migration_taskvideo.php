<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211019_140327_migration_taskvideo extends Migration
{
    /**
    Migration manifest:

    ASSETVOLUME
    - taskVideos
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":{"assetVolumes":[{"name":"Task Videos","handle":"taskVideos","type":"craft\\volumes\\Local","sortOrder":"3","typesettings":{"path":"@webroot/assets/videos"},"hasUrls":1,"url":"@web/assets/videos/"}]},"elements":{"assetVolumes":[{"name":"Task Videos","handle":"taskVideos","type":"craft\\volumes\\Local","sortOrder":"3","typesettings":{"path":"@webroot/assets/videos"},"hasUrls":1,"url":"@web/assets/videos/","fieldLayouts":{"tabs":[{"name":"Content","sortOrder":1,"elements":[{"type":"craft\\fieldlayoutelements\\AssetTitleField","autocomplete":false,"class":null,"size":null,"name":null,"autocorrect":true,"autocapitalize":true,"disabled":false,"readonly":false,"title":null,"placeholder":null,"step":null,"min":null,"max":null,"requirable":false,"id":null,"containerAttributes":[],"inputContainerAttributes":[],"labelAttributes":[],"orientation":null,"label":null,"instructions":null,"tip":null,"warning":null,"width":100}]}]}}]}}}
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
        echo "m211019_140327_migration_taskvideo cannot be reverted.\n";
        return false;
    }
}
