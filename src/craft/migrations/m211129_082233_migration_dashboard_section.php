<?php
namespace craft\contentmigrations;

use craft\db\Migration;
use dgrigg\migrationassistant\MigrationAssistant;

/**
 * Generated migration
 */
class m211129_082233_migration_dashboard_section extends Migration
{
    /**
    Migration manifest:

    SECTION
    - teacherDashboard
    */

    private $json = <<<'JSON'
{"settings":{"dependencies":{"sections":[{"name":"Teacher Dashboard","handle":"teacherDashboard","type":"single","enableVersioning":"1","propagationMethod":"all","sites":{"default":{"site":"default","hasUrls":true,"uriFormat":"teacher-dashboard","enabledByDefault":true,"template":"teacher-dashboard/_entry"}},"entrytypes":[{"sectionHandle":"teacherDashboard","hasTitleField":"0","titleFormat":"{section.name|raw}","name":"Teacher Dashboard","handle":"teacherDashboard","requiredFields":[],"fieldLayouts":{"tabs":[{"name":"Content","sortOrder":1,"elements":[{"type":"craft\\fieldlayoutelements\\EntryTitleField","autocomplete":false,"class":null,"size":null,"name":null,"autocorrect":true,"autocapitalize":true,"disabled":false,"readonly":false,"title":null,"placeholder":null,"step":null,"min":null,"max":null,"requirable":false,"id":null,"containerAttributes":[],"inputContainerAttributes":[],"labelAttributes":[],"orientation":null,"label":null,"instructions":null,"tip":null,"warning":null,"width":100},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"manageClassLabel"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"resourcesLabel"}]}]}}]}]},"elements":{"sections":[{"name":"Teacher Dashboard","handle":"teacherDashboard","type":"single","enableVersioning":"1","propagationMethod":"all","sites":{"default":{"site":"default","hasUrls":true,"uriFormat":"teacher-dashboard","enabledByDefault":true,"template":"teacher-dashboard/_entry"}},"entrytypes":[{"sectionHandle":"teacherDashboard","hasTitleField":"0","titleFormat":"{section.name|raw}","name":"Teacher Dashboard","handle":"teacherDashboard","requiredFields":[],"fieldLayouts":{"tabs":[{"name":"Content","sortOrder":1,"elements":[{"type":"craft\\fieldlayoutelements\\EntryTitleField","autocomplete":false,"class":null,"size":null,"name":null,"autocorrect":true,"autocapitalize":true,"disabled":false,"readonly":false,"title":null,"placeholder":null,"step":null,"min":null,"max":null,"requirable":false,"id":null,"containerAttributes":[],"inputContainerAttributes":[],"labelAttributes":[],"orientation":null,"label":null,"instructions":null,"tip":null,"warning":null,"width":100},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"manageClassLabel"},{"type":"craft\\fieldlayoutelements\\CustomField","label":"","instructions":"","tip":null,"warning":null,"required":"1","width":100,"fieldHandle":"resourcesLabel"}]}]}}]}]}}}
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
        echo "m211129_082233_migration_dashboard_section cannot be reverted.\n";
        return false;
    }
}
