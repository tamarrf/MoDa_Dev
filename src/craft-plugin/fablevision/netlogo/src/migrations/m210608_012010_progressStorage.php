<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m210608_012010_progressStorage migration.
 */
class m210608_012010_progressStorage extends Migration
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
        echo "m210608_012010_progressStorage reverting...\n";
        
        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_progress}}');
        
        if ($tableSchema !== null) {
            $this->dropTable('{{%netlogo_progress}}');
        }

        return true;
    }

     protected function createTables() {
        $tablesCreated = false;


        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_progress}}');
        
        if ($tableSchema === null) {
            $tablesCreated = true;

            $this->createTable(
                '{{%netlogo_progress}}',
                [
                    'id' => $this->primaryKey(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                    'userId' => $this->integer()->notNull(),
                    'journeyId' => $this->integer()->notNull(),
                    'taskId' => $this->integer()->notNull(),
                    'progress' => $this->text(),
                ]
            );
        }

        
        return $tablesCreated;
    }

    protected function createIndexes() {  
        $this->addNetlogoIndex("netlogo_progress", array("userId","journeyId","taskId"), true);
        $this->addNetlogoIndex("netlogo_progress", array("journeyId"));
        $this->addNetlogoIndex("netlogo_progress", array("taskId"));
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

