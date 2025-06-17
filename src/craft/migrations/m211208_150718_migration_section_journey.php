<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211208_150718_migration_section_journey extends Migration
{
    /**
    Migration manifest:

    SECTION
    - journey
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":{"sections":[{"name":"Journey","handle":"journey","type":"channel","enableVersioning":"1","propagationMethod":"all","sites":{"default":{"site":"default","hasUrls":true,"uriFormat":"journey/{slug}","enabledByDefault":true,"template":"journey.twig"}},"entrytypes":[{"sectionHandle":"journey","hasTitleField":"1","name":"Journey","handle":"journey","requiredFields":[],"fieldLayouts":{"tabs":[{"name":"Content","sortOrder":1,"elements":[{"type":"craft\\fieldlayoutelements\\EntryTitleField","autocomplete":false,"class":null,"size":null,"name":null,"autocorrect":true,"autocapitalize":true,"disabled":false,"readonly":false,"title":null,"placeholder":null,"step":null,"min":null,"max":null,"requirable":false,"id":null,"containerAttributes":[],"inputContainerAttributes":[],"labelAttributes":[],"orientation":null,"label":"Internal CMS Title","instructions":"","tip":null,"warning":null,"width":100},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"journeyTitle"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"journeyDescription"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"thumbnail"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"journeyTasks"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"journeyResources"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"journeyCurriculum"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"curriculumLinks"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"journeyExamples"}]}]}}]}]},"elements":{"sections":[{"name":"Journey","handle":"journey","type":"channel","enableVersioning":"1","propagationMethod":"all","sites":{"default":{"site":"default","hasUrls":true,"uriFormat":"journey/{slug}","enabledByDefault":true,"template":"journey.twig"}},"entrytypes":[{"sectionHandle":"journey","hasTitleField":"1","name":"Journey","handle":"journey","requiredFields":[],"fieldLayouts":{"tabs":[{"name":"Content","sortOrder":1,"elements":[{"type":"craft\\fieldlayoutelements\\EntryTitleField","autocomplete":false,"class":null,"size":null,"name":null,"autocorrect":true,"autocapitalize":true,"disabled":false,"readonly":false,"title":null,"placeholder":null,"step":null,"min":null,"max":null,"requirable":false,"id":null,"containerAttributes":[],"inputContainerAttributes":[],"labelAttributes":[],"orientation":null,"label":"Internal CMS Title","instructions":"","tip":null,"warning":null,"width":100},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"journeyTitle"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"journeyDescription"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"thumbnail"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"journeyTasks"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"journeyResources"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"journeyCurriculum"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"curriculumLinks"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"journeyExamples"}]}]}}]}]}}}
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
        echo "m211208_150718_migration_section_journey cannot be reverted.\n";
        return false;
    }
}
