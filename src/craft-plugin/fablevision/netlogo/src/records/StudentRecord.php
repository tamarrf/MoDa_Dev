<?php
namespace fablevision\netlogo\records;

use Craft;
use craft\db\ActiveRecord;

class StudentRecord extends ActiveRecord {

    public $firstName;
    public $lastName;
    public $pending;
    public $suspended;
    
    public static function tableName() {
        return '{{%netlogo_students}}';
    }
}
