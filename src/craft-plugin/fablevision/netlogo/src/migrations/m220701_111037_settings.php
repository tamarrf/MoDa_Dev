<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m220701_111037_settings migration.
 */
class m220701_111037_settings extends Migration
{
    /**
     * @inheritdoc
     * m220701_111037_settings.php
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
        echo "m220701_111037_settings  reverting...\n";
        
        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_graphs}}');
        
        if ($tableSchema !== null) {
            $this->dropTable('{{%netlogo_graphs}}');
        }

        $this->dropColumn('{{%netlogo_progress}}', "ggbSettings", "JSON");
        $this->dropColumn('{{%netlogo_progress}}', "graphSettings", "JSON");

        return true;
    }

     protected function createTables() {
        $tablesCreated = true;

        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_graphs}}');

        if ($tableSchema === null) {
            $this->createTable(
                '{{%netlogo_graphs}}',
                [
                    'id' => $this->primaryKey(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                    'userId' => $this->integer()->notNull(),
                    'taskId' => $this->integer()->notNull(),
                    'csv' => "LONGTEXT"
                ]
            );
        } else {
            $tablesCreated = false;
        }

        $this->addColumn('{{%netlogo_progress}}', "ggbSettings", "JSON");
        $this->addColumn('{{%netlogo_progress}}', "graphSettings", "JSON");
        
        return $tablesCreated;
    }

    protected function createIndexes() {  
        $this->addNetlogoIndex("netlogo_graphs", array("userId"), false);
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