<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m220107_082536_migration_task_experiment extends Migration
{
    /**
    Migration manifest:

    FIELD
    - taskExperiment
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"fields":[{"group":"Journey","name":"Task Experiment","handle":"taskExperiment","instructions":"Specify only if experiment component is checked above. Enter the name of the file (minus the suffix) for the task experiment. For example, videoComponent.vue -> videoComponent. This file must already exist in the experimentComponents folder in the git repo","translationMethod":"none","translationKeyFormat":null,"required":null,"searchable":"1","type":"craft\\fields\\PlainText","typesettings":{"uiMode":"normal","placeholder":null,"code":"","multiline":"","initialRows":"4","charLimit":255,"byteLimit":null,"columnType":null}}]}}}
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
        echo "m220107_082536_migration_task_experiment cannot be reverted.\n";
        return false;
    }
}
