<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211129_081745_migration_dashboard_fields extends Migration
{
    /**
    Migration manifest:

    FIELD
    - manageClassLabel
    - resourcesLabel
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"fields":[{"group":"Dashboard","name":"Manage Class Label","handle":"manageClassLabel","instructions":"","translationMethod":"none","translationKeyFormat":null,"required":null,"searchable":true,"type":"craft\\fields\\PlainText","typesettings":{"uiMode":"normal","placeholder":null,"code":"","multiline":"","initialRows":"4","charLimit":null,"byteLimit":255,"columnType":null}},{"group":"Dashboard","name":"Resources Label","handle":"resourcesLabel","instructions":"","translationMethod":"none","translationKeyFormat":null,"required":null,"searchable":true,"type":"craft\\fields\\PlainText","typesettings":{"uiMode":"normal","placeholder":null,"code":"","multiline":"","initialRows":"4","charLimit":null,"byteLimit":255,"columnType":null}}]}}}
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
        echo "m211129_081745_migration_dashboard_fields cannot be reverted.\n";
        return false;
    }
}
