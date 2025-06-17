<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211208_150652_migration_journey_examples extends Migration
{
    /**
    Migration manifest:

    FIELD
    - journeyExamples
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"fields":[{"group":"Journey","name":"Journey Examples","handle":"journeyExamples","instructions":"","translationMethod":"site","translationKeyFormat":null,"required":null,"searchable":true,"type":"craft\\fields\\Matrix","typesettings":{"minBlocks":"","maxBlocks":"","contentTable":"{{%matrixcontent_journeyexamples}}","propagationMethod":"all","propagationKeyFormat":null,"blockTypes":{"new1":{"name":"Journey Example","handle":"journeyExample","fields":{"new1":{"name":"Example Title","handle":"exampleTitle","instructions":"Only displayed in teacher dashboard","required":"1","type":"craft\\fields\\PlainText","translationMethod":"none","translationKeyFormat":null,"typesettings":{"uiMode":"normal","placeholder":null,"code":"","multiline":"","initialRows":"4","charLimit":null,"byteLimit":255,"columnType":null}},"new2":{"name":"Example Script","handle":"exampleScript","instructions":"Blockly XML to generate workspace ","required":"1","type":"craft\\fields\\PlainText","translationMethod":"none","translationKeyFormat":null,"typesettings":{"uiMode":"normal","placeholder":null,"code":"1","multiline":"","initialRows":"4","charLimit":null,"byteLimit":null,"columnType":null}},"new3":{"name":"Example Task","handle":"exampleTask","instructions":"","required":"1","type":"craft\\fields\\Entries","translationMethod":"site","translationKeyFormat":null,"typesettings":{"sources":["journeyTask"],"source":null,"targetSiteId":null,"viewMode":null,"limit":"1","selectionLabel":"The task that this is an example of","showSiteMenu":false,"localizeRelations":false,"validateRelatedElements":false,"allowSelfRelations":false}}}}}}}]}}}
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
        echo "m211208_150652_migration_journey_examples cannot be reverted.\n";
        return false;
    }
}
