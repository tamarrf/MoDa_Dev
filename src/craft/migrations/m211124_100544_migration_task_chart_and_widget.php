<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211124_100544_migration_task_chart_and_widget extends Migration
{
    /**
    Migration manifest:

    FIELD
    - taskChart
    - taskWidget
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"fields":[{"group":"Journey","name":"Task Chart","handle":"taskChart","instructions":"the name of the file (minus the suffix) for the task widget. For example, diffusionChart.vue -> diffusionChart. This file must already exist in the chartComponents folder in the git repo","translationMethod":"none","translationKeyFormat":null,"required":null,"searchable":"1","type":"craft\\fields\\PlainText","typesettings":{"uiMode":"normal","placeholder":null,"code":"","multiline":"","initialRows":"4","charLimit":255,"byteLimit":null,"columnType":null}},{"group":"Journey","name":"Task Widget","handle":"taskWidget","instructions":"the name of the file (minus the suffix) for the task widget. For example, diffusionWidget.vue -> diffusionWidget. This file must already exist in the widgetComponents folder in the git repo","translationMethod":"none","translationKeyFormat":null,"required":null,"searchable":"1","type":"craft\\fields\\PlainText","typesettings":{"uiMode":"normal","placeholder":null,"code":"","multiline":"","initialRows":"4","charLimit":255,"byteLimit":null,"columnType":null}}]}}}
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
        echo "m211124_100544_migration_task_chart_and_widget cannot be reverted.\n";
        return false;
    }
}
