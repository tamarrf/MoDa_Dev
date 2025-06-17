<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m220105_094441_migration_modular_view_components extends Migration
{
    /**
    Migration manifest:

    FIELD
    - viewComponents
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"fields":[{"group":"Journey","name":"View Components","handle":"viewComponents","instructions":"If chart is selected, specify the .vue file below\r\nchart:(appears at bottom)\r\nexperiment:(video(s) component - appears at right)\r\n","translationMethod":"none","translationKeyFormat":null,"required":null,"searchable":true,"type":"craft\\fields\\Checkboxes","typesettings":{"multi":true,"options":[{"label":"Chart Component","value":"chartComponent","default":""},{"label":"Experiment Component","value":"experimentComponent","default":""}]}}]}}}
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
        echo "m220105_094441_migration_modular_view_components cannot be reverted.\n";
        return false;
    }
}
