<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m220217_135318_loggingTable migration.
 */
class m220217_135318_loggingTable extends Migration
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
        echo "m220217_135318_loggingTable  reverting...\n";
        
        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_logs}}');
        
        if ($tableSchema !== null) {
            $this->dropTable('{{%netlogo_logs}}');
        }

        return true;
    }

     protected function createTables() {
        $tablesCreated = true;

        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_logs}}');

        if ($tableSchema === null) {
            $this->createTable(
                '{{%netlogo_logs}}',
                [
                    'id' => $this->primaryKey(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                    'userId' => $this->integer()->notNull(),
                    'message' => "LONGTEXT"
                ]
            );
        } else {
            $tablesCreated = false;
        }

        
        return $tablesCreated;
    }

    protected function createIndexes() {  
        $this->addNetlogoIndex("netlogo_logs", array("userId"), false);
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