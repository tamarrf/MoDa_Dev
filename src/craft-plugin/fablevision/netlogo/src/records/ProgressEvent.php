<?php
namespace fablevision\netlogo\records;

use Craft;
use craft\db\ActiveRecord;

class ProgressEvent extends ActiveRecord {
    public static function tableName() {
        return '{{%netlogo_events}}';
    }
}
