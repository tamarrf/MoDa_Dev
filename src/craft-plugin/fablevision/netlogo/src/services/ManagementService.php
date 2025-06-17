<?php
/**
 * netlogo plugin for Craft CMS 3.x
 *
 * Craft plugin to support Blockly and Netlogo integration 
 *
 * @link      fablevision.com
 * @copyright Copyright (c) 2021 Chris Spence
 */

namespace fablevision\netlogo\services;

use fablevision\netlogo\Netlogo;
use fablevision\netlogo\records\ProgressRecord;
use fablevision\netlogo\records\ClassroomRecord;
use fablevision\netlogo\records\StudentRecord;

use Craft;
use craft\base\Component;
use craft\base\Element;
use craft\elements\User;
use craft\elements\Asset;
use craft\elements\Category;
use craft\elements\Entry;
use craft\elements\GlobalSet;
use craft\elements\MatrixBlock;
use craft\helpers\Json;
use craft\helpers\UrlHelper;
use craft\helpers\FileHelper;

use yii\db\Query;
use PDO;

/**
 * @author    Chris Spence
 * @package   Netlogo
 * @since     0.0.5
 */
class ManagementService extends Component {

    public function getTeachers() {
        $role = $this->getUserRole();
        
        if($role === "admin") {
            $users = User::find()->group("teachers")->anyStatus()->all();
        } else {
            $users = [ Craft::$app->getUser()->getIdentity() ];
        }
        
        $output = array();

        

        foreach($users as $user) {
            $output[] = (object) array(
                "Id" => $user->id,
                "Teacher Number" => $user->getFieldValue("teachernumber"),
                "First Name" => $user->firstName,
                "Last Name" => $user->lastName,
                "Email" => $user->email,
                "Status" => $user->status);
        }
        return $output;
    }

    public function getStudentNumbers($teacherId) {
        $records = StudentRecord::find()
                        ->where([ "teacherId" => $teacherId ])
                        ->all();

        $output = array();

        foreach($records as $record) {
            $output[] = $record->studentNumber;
        }

        return $output;
    }

    public function disableTeachers($uids) {
        $role = $this->getUserRole();
        if($role !== "admin") return array();

        foreach($uids as $uid) {
            $user = Craft::$app->users->getUserById($uid);
            if(empty($user)) continue;
            Craft::$app->users->suspendUser($user);
        }

        return $this->getTeachers();
    }

    public function enableTeachers($uids) {
        $role = $this->getUserRole();
        if($role !== "admin") return array();

        foreach($uids as $uid) {
            $user = Craft::$app->users->getUserById($uid);
            if(empty($user)) continue;
            Craft::$app->users->unsuspendUser($user);
        }

        return $this->getTeachers();
    }

    public function createTeachers($users) {
        $role = $this->getUserRole();
        if($role !== "admin") return array();
        $group = Craft::$app->getUserGroups()->getGroupByHandle("teachers");

        foreach($users as $teacher) {
            $exists = Craft::$app->getUsers()->getUserByUsernameOrEmail($teacher["Email"]);
            if(!empty($exists)) continue;
            $user = new User();
            $user->pending = true;
            $user->passwordResetRequired = true;
            $user->username = $teacher["Email"];
            $user->email = $teacher["Email"];
            $user->unverifiedEmail = $teacher["Email"];
            $user->firstName = $teacher["First Name"];
            $user->lastName = $teacher["Last Name"];
            $user->setFieldValue("teachernumber", $teacher["Teacher Number"]);

            $user->setScenario(Element::SCENARIO_LIVE);

            if(!$user->validate(null, false) || !Craft::$app->getElements()->saveElement($user, false)) {
                error_log("error creating user");

                if (!$user->hasErrors('email')) {
                    $user->addErrors(['email' => $user->getErrors('unverifiedEmail')]);
                }

                error_log(print_r($user->getErrors(), true));

                return (object) array("status" => "failure", "message" => "could not validate and save user", "errors" => $user->getErrors());
            }

            Craft::$app->users->assignUserToGroups($user->id, [ $group->id]);
        }

        return $this->getTeachers();
    }

    public function getClassrooms() {
        $role = $this->getUserRole();
        $user = Craft::$app->getUser()->getIdentity();

        if($role === "admin") {
            $records = ClassroomRecord::find()->all();
        } else {
            $records = ClassroomRecord::find()
                            ->where(["teacherId" => $user->id])
                            ->all();
        } 
        
        $classrooms = array();

        foreach($records as $record) {
            $classrooms[] = (object) array("Id" => $record->id,
                                        "Name" => $record->name,
                                        "Teacher" => $record->teacherId);
        }

        return $classrooms;
    }

    public function createClassrooms($classrooms) {
        $transaction = Craft::$app->db->beginTransaction();

        foreach($classrooms as $classroom) {
            $id = empty($classroom["Id"]) ? null : $classroom["Id"];
            $name = $classroom["Name"];
            $teacherId = $classroom["Teacher"];
            $numStudents = empty($classroom["NumStudents"]) ? 0 : (int) $classroom["NumStudents"];
            $record = ClassroomRecord::find()
                        ->where(["id" => $id])
                        ->one();
            if(empty($record)) $record = new ClassroomRecord();
            $record->setAttribute("name",$name);
            $record->setAttribute("teacherId",$teacherId);
            $record->save();

            $this->autoCreateStudents($numStudents, $record->id, $teacherId);
        }

        $transaction->commit();
        return $this->getClassrooms();
    }

    public function getStudents($classId) {
        $students = StudentRecord::find()
                    ->select("u.id, u.firstName, u.lastName, studentNumber, teacherId, classId, u.pending, u.suspended")
                    ->leftJoin("users `u`","userId = u.id")
                    ->where(["classId" => $classId])
                    ->all();
        
        $output = array();

        foreach($students as $student) {
            $status = "active";
            if($student->pending === "1") $status = "pending";
            if($student->suspended === "1") $status = "disabled";

            $output[] = (object) array(
                "Id" => $student->id,
                "First Name" => $student->firstName,
                "Last Name" => $student->lastName,
                "Student Number" => $student->studentNumber,
                "Status" => $status,
                "teacherId" => $student->teacherId,
                "classId" => $student->classId,
                "enabled" => true
            );
        }

        return $output;
    }

    public function disableStudents($uids, $classId) {
        foreach($uids as $uid) {
            error_log("searching for $uid");
            $user = Craft::$app->users->getUserById($uid);
            if(empty($user)) continue;
            error_log("suspendUser");
            Craft::$app->users->suspendUser($user);
        }

        return $this->getStudents($classId);
    }

    public function enableStudents($uids, $classId) {
        foreach($uids as $uid) {
            $user = Craft::$app->users->getUserById($uid);
            if(empty($user)) continue;
            Craft::$app->users->unsuspendUser($user);
        }

        return $this->getStudents($classId);
    }

    public function autoCreateStudents($numStudents, $classId, $teacherId, $return = false) {
        $query = "SELECT COALESCE(MAX(studentNumber) + 1,1) `studentNumber` 
                    FROM netlogo_students WHERE teacherId = :teacherId;";
        $raw = Craft::$app->db->createCommand($query);
        $raw->bindParam(":teacherId", $teacherId, PDO::PARAM_INT);
        $results = $raw->queryAll();

        $studentNumber = (int) $results[0]["studentNumber"];
        $teacher = Craft::$app->users->getUserById($teacherId);
        $teacherNumber = $teacher->getFieldValue("teachernumber");
        $group = Craft::$app->getUserGroups()->getGroupByHandle("students");
        $transaction = Craft::$app->db->beginTransaction();

        for($i = $studentNumber; $i < $studentNumber + $numStudents; $i++) {
            $email = "student-$teacherNumber-$i@moda.education";
            $user = new User();
            $user->pending = false;
            $user->username = $email;
            $user->email = $email;
            $user->passwordResetRequired = false;
            $user->newPassword = "123456"; 

            $user->firstName = "Student";
            $user->lastName = "User";

            Craft::$app->getElements()->saveElement($user, false);
            Craft::$app->users->assignUserToGroups($user->id, [$group->id]);
            Craft::$app->users->activateUser($user);
            
            $student = new StudentRecord();
            $student->setAttribute("userId", $user->id);
            $student->setAttribute("studentNumber", $i);
            $student->setAttribute("teacherId", $teacherId);
            $student->setAttribute("classId", $classId);
            $student->save();
        }

        $transaction->commit();
        if($return) {
            return $this->getStudents($classId);
        }
    }

    public function createStudents($students, $classId, $teacherId) {
        
        $teacher = Craft::$app->users->getUserById($teacherId);
        $teacherNumber = $teacher->getFieldValue("teachernumber");
        $group = Craft::$app->getUserGroups()->getGroupByHandle("students");
        $transaction = Craft::$app->db->beginTransaction();

        foreach($students as $student) {
            if(isset($student["Id"])) {
                $user = Craft::$app->users->getUserById($student["Id"]);
            } else {
                $studentNumber = $student["Student Number"];
                $email = "student-$teacherNumber-$studentNumber@moda.education";
                $user = new User();
                $user->pending = false;
                $user->username = $email;
                $user->email = $email;
                $user->passwordResetRequired = false;
                $user->newPassword = "123456"; 
            }
            
            $user->firstName = empty($student["First Name"]) ? "Student" : $student["First Name"];
            $user->lastName = empty($student["Last Name"]) ? "Student" : $student["Last Name"];

            Craft::$app->getElements()->saveElement($user, false);
            
            if(empty($student["Id"])) {
                Craft::$app->users->assignUserToGroups($user->id, [$group->id]);
                Craft::$app->users->activateUser($user);
                $studentr = new StudentRecord();
            } else {
                $studentr = StudentRecord::find()
                                    ->where(["userId" => $student["Id"]])
                                    ->one();
            }

            $studentr->setAttribute("userId", $user->id);
            $studentr->setAttribute("studentNumber", $student["Student Number"]);
            $studentr->setAttribute("teacherId", $teacherId);
            $studentr->setAttribute("classId", $classId);
            $studentr->save();
        }

        $transaction->commit();
        return $this->getStudents($classId);
    }

    private function getUserRole() {
        $user = Craft::$app->getUser()->getIdentity();
        $admin = $user->admin;
        $teacher = Craft::$app->getUserGroups()->getGroupByHandle("teachers");
        $student = Craft::$app->getUserGroups()->getGroupByHandle("students");

        if($admin) return "admin";
        if($user->isInGroup($teacher)) return "teacher";
        if($user->isInGroup($student)) return "student";
        return "none";
    }
}
