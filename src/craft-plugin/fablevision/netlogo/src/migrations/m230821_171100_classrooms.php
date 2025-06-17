<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m230821_171100_classrooms migration.
 */
class m230821_171100_classrooms extends Migration
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
        echo "m230821_171100_classrooms  reverting...\n";
        
       $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_classrooms}}');
        
        if ($tableSchema !== null) {
            $this->dropTable('{{%netlogo_classrooms}}');
        }
        
        $this->dropColumn('{{%netlogo_students}}', "classId");
        $this->dropIndex("idx_bhfjoovufyzcdnspuoejkuhdohyzzemfprli", '{{%netlogo_students}}');
        $this->createIndex(
            "idx_bhfjoovufyzcdnspuoejkuhdohyzzemfprli",
            "{{%netlogo_students}}",
            array("studentNumber"),
            true
        );

        return true;
    }

     protected function createTables() {
        $tablesCreated = true;

        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_classrooms}}');

        if ($tableSchema === null) {
            $this->createTable(
                '{{%netlogo_classrooms}}',
                [
                    'id' => $this->primaryKey(),
                    'dateCreated' => $this->dateTime()->notNull(),
                    'dateUpdated' => $this->dateTime()->notNull(),
                    'uid' => $this->uid(),
                    'teacherId' => $this->integer()->notNull(),
                    'name' => $this->string()
                ]
            );
        } else {
            $tablesCreated = false;
        }
        $indexName = $this->db->getIndexName( "{{%netlogo_students}}",array("studentNumber"),true);
        $this->addColumn('{{%netlogo_students}}', "classId", "INT(11) UNSIGNED DEFAULT 1");
        $this->insert("{{%netlogo_classrooms}}", array("name" => "Default Classroom", "teacherId" => 51));
        $this->dropIndex("idx_bhfjoovufyzcdnspuoejkuhdohyzzemfprli", '{{%netlogo_students}}');
        $this->createIndex(
            "idx_bhfjoovufyzcdnspuoejkuhdohyzzemfprli",
            "{{%netlogo_students}}",
            array("studentNumber"),
            false
        );
        return $tablesCreated;
    }

    protected function createIndexes() {  
        $this->addNetlogoIndex("netlogo_classrooms", array("teacherId"), false);
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
