<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m211123_192616_studentJourneyAssignments migration.
 */
class m211123_192616_studentJourneyAssignments extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp() {
        if ($this->createTables()) {
            $this->createIndexes();
            Craft::$app->db->schema->refresh();
        }
    }

    /**
     * @inheritdoc
     */
    public function safeDown() {
        echo "m211123_192616_studentJourneyAssignments reverting...\n";
        
        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_student_assignments}}');
        
        if ($tableSchema !== null) {
            $this->dropTable('{{%netlogo_student_assignments}}');
        }

        return true;
    }

     protected function createTables() {
        $tablesCreated = true;

        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_student_assignments}}');

        if ($tableSchema === null) {
            $this->createTable(
                '{{%netlogo_student_assignments}}',
                [
                    'id' => $this->primaryKey(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                    'studentId' => $this->integer()->notNull(),
                    'journeyId' => $this->integer()->notNull(),
                    'status' => $this->enum("status",array("new", "in-progress", "complete"))->notNull()->defaultValue("new")
                ]
            );
        } else {
            $tablesCreated = false;
        }

        
        return $tablesCreated;
    }

    protected function createIndexes() {  
        $this->addNetlogoIndex("netlogo_student_assignments", array("studentId","journeyId"), true);
        $this->addNetlogoIndex("netlogo_student_assignments", array("journeyId"), false);
        $this->addNetlogoIndex("netlogo_student_assignments", array("status"), false);
    }

    protected function addNetlogoIndex($table, $columns, $unique = false) {
        $this->createIndex(
            $this->db->getIndexName(
                "{{%$table}}",
                $columns,
                $unique
            ),
            "{{%$table}}",
            $columns,
            $unique
        );
    }
}
