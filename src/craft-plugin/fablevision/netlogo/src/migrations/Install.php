<?php
/**
 * netlogo plugin for Craft CMS 3.x
 *
 * Craft plugin to support Blockly and Netlogo integration 
 *
 * @link      fablevision.com
 * @copyright Copyright (c) 2021 Chris Spence
 */

namespace fablevision\netlogo\migrations;

use fablevision\netlogo\Netlogo;

use Craft;
use craft\config\DbConfig;
use craft\db\Migration;

/**
 * @author    Chris Spence
 * @package   Netlogo
 * @since     0.0.5
 */
class Install extends Migration
{
    // Public Properties
    // =========================================================================

    /**
     * @var string The database driver to use
     */
    public $driver;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function safeUp()
    {
        $this->driver = Craft::$app->getConfig()->getDb()->driver;
        if ($this->createTables()) {
            $this->createIndexes();
            Craft::$app->db->schema->refresh();
        }

        return true;
    }

   /**
     * @inheritdoc
     */
    public function safeDown()
    {
        $this->driver = Craft::$app->getConfig()->getDb()->driver;
        $this->removeTables();

        return true;
    }

    // Protected Methods
    // =========================================================================

    /**
     * @return bool
     */
    protected function createTables()
    {
        $tablesCreated = true;
        $tableSchema = Craft::$app->db->schema->getTableSchema('{{%netlogo_progress}}');
        
        if ($tableSchema === null) {
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
                    'image' => "LONGTEXT"
                ]
            );
        } else {
            $tablesCreated = false;
        }

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

    /**
     * @return void
     */
    protected function createIndexes()
    {
    	$this->addNetlogoIndex("netlogo_progress", array("userId","journeyId","taskId"), true);
        $this->addNetlogoIndex("netlogo_progress", array("journeyId"));
        $this->addNetlogoIndex("netlogo_progress", array("taskId"));
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
        $this->addNetlogoIndex("netlogo_students", array("userId"), true);
        $this->addNetlogoIndex("netlogo_students", array("studentNumber"), true);
        $this->addNetlogoIndex("netlogo_students", array("teacherId"));
        $this->addNetlogoIndex("netlogo_student_assignments", array("studentId","journeyId"), true);
        $this->addNetlogoIndex("netlogo_student_assignments", array("journeyId"), false);
        $this->addNetlogoIndex("netlogo_student_assignments", array("status"), false);
        $this->addNetlogoIndex("netlogo_favorites", array("teacherId","studentId","taskId"), true);
        $this->addNetlogoIndex("netlogo_favorites", array("studentId"));
        $this->addNetlogoIndex("netlogo_favorites", array("taskId"));
    }

     * @return void
     */
    protected function removeTables()
    {
        $this->dropTableIfExists('{{%netlogo_progress}}');
        $this->dropTableIfExists('{{%netlogo_charts}}');
        $this->dropTableIfExists('{{%netlogo_events}}');
        $this->dropTableIfExists('{{%netlogo_students}}');
        $this->dropTableIfExists('{{%netlogo_student_assignments}}');
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
