<?php

namespace fablevision\netlogo\migrations;

use Craft;
use craft\db\Migration;

/**
 * m220110_213756_imageColumn migration.
 */
class m220110_213756_imageColumn extends Migration
{
    /**
     * @inheritdoc
     */
    public function safeUp() {
        $this->addColumn('{{%netlogo_progress}}', "image", "LONGTEXT");
    }

    /**
     * @inheritdoc
     */
    public function safeDown() {
        echo "m220110_213756_imageColumn reverting...\n";
        $this->dropColumn('{{%netlogo_progress}}', "image");
        return true;
    }
}
