<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m211001_195152_dataStorageTables migration.
 */
class m211001_195152_dataStorageTables extends Migration
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
        echo "m211001_195152_dataStorageTables reverting...\n";
        
        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_events}}');
        
        if ($tableSchema !== null) {
            $this->dropTable('{{%netlogo_events}}');
        }

        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_charts}}');
        
        if ($tableSchema !== null) {
            $this->dropTable('{{%netlogo_charts}}');
        }

        return true;
    }

     protected function createTables() {
        $tablesCreated = true;

        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_events}}');
        
        if ($tableSchema === null) {
            $this->createTable(
                '{{%netlogo_events}}',
                [
                    'id' => $this->primaryKey(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                    'userId' => $this->integer()->notNull(),
                    'journeyId' => $this->integer()->notNull(),
                    'taskId' => $this->integer()->notNull(),
                    'blockType' => $this->string(255),
                    'actionType' => $this->string(255),
                    'workspace' => $this->text()
                ]
            );
        } else {
            $tablesCreated = false;
        }

        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_charts}}');

        if ($tableSchema === null) {
            $this->createTable(
                '{{%netlogo_charts}}',
                [
                    'id' => $this->primaryKey(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                    'userId' => $this->integer()->notNull(),
                    'journeyId' => $this->integer()->notNull(),
                    'taskId' => $this->integer()->notNull(),
                    'submissionId' => $this->string(255),
                    'chartId' => $this->string(255),
                    'xValue' => $this->integer(),
                    'yValue' => $this->integer()
                ]
            );
        } else {
            $tablesCreated = false;
        }

        
        return $tablesCreated;
    }

    protected function createIndexes() {  
        $this->addNetlogoIndex("netlogo_events", array("userId"));
        $this->addNetlogoIndex("netlogo_events", array("journeyId"));
        $this->addNetlogoIndex("netlogo_events", array("taskId"));
        $this->addNetlogoIndex("netlogo_events", array("blockType"));
        $this->addNetlogoIndex("netlogo_events", array("actionType"));
        $this->addNetlogoIndex("netlogo_charts", array("userId"));
        $this->addNetlogoIndex("netlogo_charts", array("journeyId"));
        $this->addNetlogoIndex("netlogo_charts", array("taskId"));
        $this->addNetlogoIndex("netlogo_charts", array("submissionId"));
        $this->addNetlogoIndex("netlogo_charts", array("chartId"));
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