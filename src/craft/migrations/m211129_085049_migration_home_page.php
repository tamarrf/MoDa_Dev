<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211129_085049_migration_home_page extends Migration
{
    /**
    Migration manifest:

    GLOBAL
    - homePage
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"globals":[{"name":"Home Page","handle":"homePage","fieldLayout":[],"requiredFields":[],"fieldLayouts":{"tabs":[{"name":"Home Page","sortOrder":1,"elements":[{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"homePageBanner"}]}]}}]}}}
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
        echo "m211129_085049_migration_home_page cannot be reverted.\n";
        return false;
    }
}
