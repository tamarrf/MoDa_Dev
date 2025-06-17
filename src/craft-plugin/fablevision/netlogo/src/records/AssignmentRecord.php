<?php
namespace fablevision\netlogo\records;

use Craft;
use craft\db\ActiveRecord;

class AssignmentRecord extends ActiveRecord {
    public static function tableName() {
        return '{{%netlogo_student_assignments}}';
    }
}
