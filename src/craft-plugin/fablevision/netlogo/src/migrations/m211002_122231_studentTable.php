<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m211002_122231_studentTable migration.
 */
class m211002_122231_studentTable extends Migration
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
    public function safeDown()
    {
        echo "m211002_122231_studentTable reverting...\n";
        
        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_students}}');
        
        if ($tableSchema !== null) {
            $this->dropTable('{{%netlogo_students}}');
        }

        return true;
    }

     protected function createTables() {
        $tablesCreated = true;

        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_students}}');

        if ($tableSchema === null) {
            $this->createTable(
                '{{%netlogo_students}}',
                [
                    'id' => $this->primaryKey(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                    'userId' => $this->integer()->notNull(),
                    'studentNumber' => $this->integer()->notNull(),
                    'teacherId' => $this->integer()->notNull(),
                ]
            );
        } else {
            $tablesCreated = false;
        }

        
        return $tablesCreated;
    }

    protected function createIndexes() {  
        $this->addNetlogoIndex("netlogo_students", array("userId"), true);
        $this->addNetlogoIndex("netlogo_students", array("studentNumber"), true);
        $this->addNetlogoIndex("netlogo_students", array("teacherId"));
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