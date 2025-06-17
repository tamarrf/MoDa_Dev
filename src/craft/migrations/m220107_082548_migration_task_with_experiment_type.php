<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m220107_082548_migration_task_with_experiment_type extends Migration
{
    /**
    Migration manifest:

    SECTION
    - journeyTask
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":{"sections":[{"name":"Journey Task","handle":"journeyTask","type":"channel","enableVersioning":"1","propagationMethod":"all","sites":{"default":{"site":"default","hasUrls":true,"uriFormat":"journey-task/{slug}","enabledByDefault":true,"template":"journey-task/_entry"}},"entrytypes":[{"sectionHandle":"journeyTask","hasTitleField":"1","name":"Journey Task","handle":"journeyTask","requiredFields":[],"fieldLayouts":{"tabs":[{"name":"Content","sortOrder":1,"elements":[{"type":"craft\\fieldlayoutelements\\EntryTitleField","autocomplete":false,"class":null,"size":null,"name":null,"autocorrect":true,"autocapitalize":true,"disabled":false,"readonly":false,"title":null,"placeholder":null,"step":null,"min":null,"max":null,"requirable":false,"id":null,"containerAttributes":[],"inputContainerAttributes":[],"labelAttributes":[],"orientation":null,"label":"Internal CMS Title","instructions":"","tip":null,"warning":null,"width":100},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"taskTitle"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"taskVideos"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"blockLibrary"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"taskScript"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"worldWidth"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"viewComponents"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"","width":100,"fieldHandle":"taskChart"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"taskExperiment"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"taskWidget"}]}]}}]}]},"elements":{"sections":[{"name":"Journey Task","handle":"journeyTask","type":"channel","enableVersioning":"1","propagationMethod":"all","sites":{"default":{"site":"default","hasUrls":true,"uriFormat":"journey-task/{slug}","enabledByDefault":true,"template":"journey-task/_entry"}},"entrytypes":[{"sectionHandle":"journeyTask","hasTitleField":"1","name":"Journey Task","handle":"journeyTask","requiredFields":[],"fieldLayouts":{"tabs":[{"name":"Content","sortOrder":1,"elements":[{"type":"craft\\fieldlayoutelements\\EntryTitleField","autocomplete":false,"class":null,"size":null,"name":null,"autocorrect":true,"autocapitalize":true,"disabled":false,"readonly":false,"title":null,"placeholder":null,"step":null,"min":null,"max":null,"requirable":false,"id":null,"containerAttributes":[],"inputContainerAttributes":[],"labelAttributes":[],"orientation":null,"label":"Internal CMS Title","instructions":"","tip":null,"warning":null,"width":100},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"taskTitle"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"taskVideos"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"blockLibrary"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"taskScript"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"worldWidth"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"viewComponents"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"","width":100,"fieldHandle":"taskChart"},{"type":"craft\\fieldlayoutelements\\CustomField","label":null,"instructions":null,"tip":null,"warning":null,"required":false,"width":100,"fieldHandle":"taskExperiment"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"taskWidget"}]}]}}]}]}}}
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
        echo "m220107_082548_migration_task_with_experiment_type cannot be reverted.\n";
        return false;
    }
}
