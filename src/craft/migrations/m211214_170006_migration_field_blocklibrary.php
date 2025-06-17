<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211214_170006_migration_field_blocklibrary extends Migration
{
    /**
    Migration manifest:

    FIELD
    - blockLibrary
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"fields":[{"group":"Journey","name":"Block Library","handle":"blockLibrary","instructions":"","translationMethod":"none","translationKeyFormat":null,"required":null,"searchable":true,"type":"craft\\fields\\MultiSelect","typesettings":{"multi":true,"optgroups":true,"options":[{"label":"General","value":"general","default":"1"},{"label":"Diffusion","value":"diffusion","default":""},{"label":"Wildfires","value":"wildfires","default":""},{"label":"Wildfires 2","value":"wildfires2","default":""}]}}]}}}
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
        echo "m211214_170006_migration_field_blocklibrary cannot be reverted.\n";
        return false;
    }
}
