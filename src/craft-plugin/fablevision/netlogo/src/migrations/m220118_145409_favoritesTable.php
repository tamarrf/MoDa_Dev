<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m220118_145409_favoritesTable migration.
 */
class m220118_145409_favoritesTable extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp()
    {
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
        echo "m220118_145409_favoritesTable  reverting...\n";
        
        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_favorites}}');
        
        if ($tableSchema !== null) {
            $this->dropTable('{{%netlogo_favorites}}');
        }

        return true;
    }

     protected function createTables() {
        $tablesCreated = true;

        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_favorites}}');

        if ($tableSchema === null) {
            $this->createTable(
                '{{%netlogo_favorites}}',
                [
                    'id' => $this->primaryKey(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                    'teacherId' => $this->integer()->notNull(),
                    'studentId' => $this->integer()->notNull(),
                    'taskId' => $this->integer()->notNull(),
                ]
            );
        } else {
            $tablesCreated = false;
        }

        
        return $tablesCreated;
    }

    protected function createIndexes() {  
        $this->addNetlogoIndex("netlogo_favorites", array("teacherId","studentId","taskId"), true);
        $this->addNetlogoIndex("netlogo_favorites", array("studentId"));
        $this->addNetlogoIndex("netlogo_favorites", array("taskId"));
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