<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211130_105422_migration_journey_curriculum_fields extends Migration
{
    /**
    Migration manifest:

    FIELD
    - curriculumLinks
    - journeyCurriculum
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":[],"elements":{"fields":[{"group":"Journey","name":"Curriculum Links","handle":"curriculumLinks","instructions":"Only visible to teachers","translationMethod":"site","translationKeyFormat":null,"required":null,"searchable":"1","type":"craft\\fields\\Matrix","typesettings":{"minBlocks":"","maxBlocks":"","contentTable":"{{%matrixcontent_curriculumlinks}}","propagationMethod":"all","propagationKeyFormat":null,"blockTypes":{"new1":{"name":"Resource Links","handle":"resourceLinks","fields":{"new1":{"name":"Link Display Text","handle":"linkDisplayText","instructions":"","required":"1","type":"craft\\fields\\PlainText","translationMethod":"none","translationKeyFormat":null,"typesettings":{"uiMode":"normal","placeholder":null,"code":"","multiline":"","initialRows":"4","charLimit":null,"byteLimit":null,"columnType":null}},"new2":{"name":"Link URL","handle":"linkUrl","instructions":"","required":"1","type":"craft\\fields\\Url","translationMethod":"none","translationKeyFormat":null,"typesettings":{"types":["url"],"placeholder":null,"maxLength":"255"}}}}}}},{"group":"Journey","name":"Journey Curriculum","handle":"journeyCurriculum","instructions":"Only visible to teachers","translationMethod":"site","translationKeyFormat":null,"required":null,"searchable":"1","type":"craft\\fields\\Matrix","typesettings":{"minBlocks":"","maxBlocks":"","contentTable":"{{%matrixcontent_journeycurriculum}}","propagationMethod":"all","propagationKeyFormat":null,"blockTypes":{"new1":{"name":"Section Block","handle":"sectionBlock","fields":{"new1":{"name":"Section Title","handle":"sectionTitle","instructions":"","required":"1","type":"craft\\fields\\PlainText","translationMethod":"none","translationKeyFormat":null,"typesettings":{"uiMode":"normal","placeholder":null,"code":"","multiline":"","initialRows":"4","charLimit":null,"byteLimit":255,"columnType":null}},"new2":{"name":"Section Body","handle":"sectionBody","instructions":"","required":"1","type":"craft\\redactor\\Field","translationMethod":"none","translationKeyFormat":null,"typesettings":{"uiMode":"enlarged","redactorConfig":"","purifierConfig":"","cleanupHtml":true,"removeInlineStyles":"1","removeEmptyTags":"1","removeNbsp":"1","purifyHtml":"1","columnType":"text","availableVolumes":"*","availableTransforms":"*","showUnpermittedVolumes":false,"showUnpermittedFiles":false,"showHtmlButtonForNonAdmins":"","configSelectionMode":"choose","manualConfig":"","defaultTransform":""}}}}}}}]}}}
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
        echo "m211130_105422_migration_journey_curriculum_fields cannot be reverted.\n";
        return false;
    }
}
