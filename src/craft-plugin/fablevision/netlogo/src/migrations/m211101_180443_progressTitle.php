<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m211101_180443_progressTitle migration.
 */
class m211101_180443_progressTitle extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp() {
        $this->dropIndex("idx_wiudlphaftzeoiuhkvisxxarqunkwmgvjbda",'{{%netlogo_progress}}');
        $this->addColumn('{{%netlogo_progress}}', "title", $this->string(255));
        $this->addNetlogoIndex("netlogo_progress", array("userId"));
    }

    /**
     * @inheritdoc
     */
    public function safeDown() {
        echo "m211101_180443_progressTitle reverting...\n";
        $this->dropIndex(
            $this->db->getIndexName(
                "{{%netlogo_progress}}",
                array("userId"),
                false
            ), "{{%netlogo_progress}}"
        );
        $this->dropColumn('{{%netlogo_progress}}', "title");
        $this->addNetlogoIndex("netlogo_progress", array("userId","journeyId","taskId"), true);
        return true;
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
