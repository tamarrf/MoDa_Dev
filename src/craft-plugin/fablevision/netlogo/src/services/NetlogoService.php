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
use fablevision\netlogo\records\ProgressEvent;
use fablevision\netlogo\records\ChartData;
use fablevision\netlogo\records\StudentRecord;
use fablevision\netlogo\records\AssignmentRecord;
use fablevision\netlogo\records\FavoriteRecord;
use fablevision\netlogo\records\LogRecord;
use fablevision\netlogo\records\GraphRecord;

use yii\db\Query;
use Craft;
use craft\base\Component;
use craft\base\Element;
use craft\elements\Entry;
use craft\elements\User;
use craft\helpers\StringHelper;
use craft\helpers\UrlHelper;

use PDO;

/**
 * @author    Chris Spence
 * @package   Netlogo
 * @since     0.0.5
 */
class NetlogoService extends Component {

    public function getGraphs($userId, $taskId) {
        $graphs = array();
        $records = GraphRecord::find()
                    ->where(["userId" => $userId, "taskId" => $taskId])
                    ->all();
        foreach ($records as $record) { 
            $graphs[] = (object) array(
                "id" => $record->id,
                "userId" => $userId,
                "taskId" => $taskId,
                "csv" => $record->csv
            );
        }

        return json_encode($graphs);
    }

    public function saveGraph($userId, $taskId, $csv) {
        $record = new GraphRecord();
        $record->setAttribute("userId", $userId);
        $record->setAttribute("taskId", $taskId);
        $record->setAttribute("csv", $csv);
        $record->save();

        return json_encode((object) array("status" => 200, "id" => $record->id ));
    }

    public function deleteGraph($userId, $id) {
        $record = GraphRecord::find()
                    ->where(["id" => $id])
                    ->one();

        if(!empty($record)) {
            $record->delete();
        }

        return json_encode((object) array("status" => 200));
    }

    public function getDefaultSettings() {
        $entries = (object) array();

        $ggbSettings = Entry::find()
                        ->section("ggbSettings")
                        ->one();

        $graphSettings = Entry::find()
                        ->section("graphSettings")
                        ->one();


        $ggbSettingsBlock = $ggbSettings->ggbSettings->one();

        $entries->ggbSettings = (object) array(
            "sensor1" => $ggbSettingsBlock->sensor1->value,
            "sensor2" => $ggbSettingsBlock->sensor2->value,
            "dataSamplingFrequency" => $ggbSettingsBlock->dataSamplingFrequency,
            "units" => $ggbSettingsBlock->units->value
        );


        $entries->graphSettings = (object) array();
        $graphSettingsGeneral = $graphSettings->graphSettingsGeneral->one();
        $graphSettingsModel = $graphSettings->graphSettingsModel->one();
        $graphSettingsReal = $graphSettings->graphSettingsReal->one();

        $entries->graphSettings->general = (object) array(
            "plotStyle" => $graphSettingsGeneral->plotsStyle->value
        );

        $entries->graphSettings->model = (object) array(
            "xAxis" => $graphSettingsModel->xAxis->value,
            "yAxis" => $graphSettingsModel->yAxis->value,
            "graphType" => $graphSettingsModel->graphType->value
        );

        $entries->graphSettings->realWorld = (object) array(
            "xAxis" => $graphSettingsReal->xAxis->value,
            "yAxis" => $graphSettingsReal->yAxis->value,
            "graphType" => $graphSettingsReal->graphType->value
        );

        return json_encode($entries);
    }

    public function log($userId, $message) {
        $record = new LogRecord();
        $record->setAttribute("userId", $userId);
        $record->setAttribute("message", $message);
        $record->save();

        return json_encode((object) array("status" => 200 ));
    }

    public function favorite($teacherId, $studentId, $taskId) {
        $record = FavoriteRecord::find()
                    ->where(["teacherId" => $teacherId ,"studentId" => $studentId, "taskId" => $taskId])
                    ->one();

        if(!empty($record)) {
            return json_encode((object) array("status" => 200 ));
        }

        $record = new FavoriteRecord();
        $record->setAttribute("teacherId", $teacherId);
        $record->setAttribute("studentId", $studentId);
        $record->setAttribute("taskId", $taskId);
        $record->save();
        
        return json_encode((object) array("status" => 200 ));
    }

    public function unfavorite($teacherId, $studentId, $taskId) {
        $record = FavoriteRecord::find()
                    ->where(["teacherId" => $teacherId ,"studentId" => $studentId, "taskId" => $taskId])
                    ->one();

        if(empty($record)) {
            return json_encode((object) array("status" => 200 ));
        }

        $record->delete();
        return json_encode((object) array("status" => 200 ));
    }

    public function createAssignment($studentId, $journeyId) {
        $record = AssignmentRecord::find()
                    ->where(["studentId" => $studentId, "journeyId" => $journeyId])
                    ->one();

        if(empty($record)) {
            $record = new AssignmentRecord();
            $record->setAttribute("studentId", $studentId);
            $record->setAttribute("journeyId", $journeyId);
            $record->save();
        }

        $output = (object) array("id" => $record->id);
        return json_encode($output);
    }

    public function getAssignments($studentId) {
        $records = AssignmentRecord::find()
                    ->where(["studentId" => $studentId])
                    ->all();

        $output = array();

        foreach($records as $record) {
            $output[] = (object) array(
                "id" => $record->id,
                "journeyId" => $record->getAttribute("journeyId"),
                "status" => $record->getAttribute("status"),
                "dateCreated" => $record->getAttribute("dateCreated"),
                "dateUpdated" => $record->getAttribute("dateUpdated"),
            );
        }

        // return json_encode($output);
        return $output;
    }

    public function updateAssignment($assignmentId, $status) {
        $record = AssignmentRecord::find()
                    ->where(["id" => $assignmentId ])
                    ->one();

        if(!empty($record)) {
            $record->setAttribute("status", $status);
            $record->save();
        }

        return json_encode((object) array("status" => 200 ));
    }

    public function deleteAssignment($assignmentId) {
        $record = AssignmentRecord::find()
                    ->where(["id" => $assignmentId ])
                    ->one();

        if(!empty($record)) {
            $record->delete();
        }

        return json_encode((object) array("status" => 200 ));
    }

    public function getStudentInfo($studentId, $journeyId, $taskId) {
        $params = ["userId" => $studentId];
        if(!empty($journeyId)) $params["journeyId"] = $journeyId;
        if(!empty($taskId)) $params["taskId"] = $taskId;
        $records = ProgressRecord::find()
                    ->where($params)
                    ->all();

        $output = array();

        foreach($records as $record) {
            $output[] = (object) array(
                "journeyId" => $record->getAttribute("journeyId"),
                "taskId" => $record->getAttribute("taskId"),
                "progress" => $record->getAttribute("progress"),
                "dateUpdated" => $record->getAttribute("dateUpdated"),
                "title" => $record->getAttribute("title"),
                "image" => $record->getAttribute("image"),
                "id" => $record->getAttribute("id")
            );
        }

        return json_encode($output);
    }

    public function getStudentsWithInfo($userId, $ids = null) {

        $url = UrlHelper::actionUrl('netlogo/default/');
        if(!empty($ids)) {
            $query = new Query();
            $query->select("u.id `userId`, u.firstName, u.lastName, ns.studentNumber,
                        np.id `progressId`, np.journeyId, np.taskId, np.progress, np.title, CONCAT('${url}/images&image=', np.id) `image`, np.dateUpdated")
                ->from("netlogo_students ns")
                ->join('LEFT JOIN', 'users u', 'ns.userId = u.id')
                ->join('LEFT JOIN', 'netlogo_progress np', 'ns.userId = np.userId')
                ->where(["in", "ns.userId", $ids]);
             $command = $query->createCommand();
             $results = $command->queryAll();
        } else {
            $query = "SELECT u.id `userId`, u.firstName, u.lastName, ns.studentNumber,
                        np.id `progressId`, np.journeyId, np.taskId, np.progress, np.title, CONCAT('${url}/images&image=', np.id) `image` , np.dateUpdated
                    FROM netlogo_students ns
                    LEFT JOIN users u ON ns.userId = u.id
                    LEFT JOIN netlogo_progress np ON ns.userId = np.userId
                    WHERE ns.teacherId = :userId;";
            $raw = Craft::$app->db->createCommand($query);
            $raw->bindParam(":userId", $userId, PDO::PARAM_INT);
            $results = $raw->queryAll();
        }
       
        return json_encode($results);
    }

    public function getStudentPages($userId) {
       $query = 'SELECT JSON_ARRAYAGG(JSON_OBJECT("studentId", r.studentId, "progressId", r.progressId)) `record`
                    FROM 
                    (SELECT ns.userId `studentId`, np.id `progressId`  
                    FROM netlogo_students ns
                    LEFT JOIN users u ON ns.userId = u.id
                    LEFT JOIN netlogo_progress np ON ns.userId = np.userId
                    WHERE ns.teacherId = :userId
                    ORDER BY ns.userId, np.id) r;';
            $raw = Craft::$app->db->createCommand($query);
            $raw->bindParam(":userId", $userId, PDO::PARAM_INT);
            $results = $raw->queryAll();
            return $results[0]["record"];
    }

    public function getStudentPage($userId, $records) {
        $output = array();

        foreach($records as $record) {
            if($record["progressId"]) {
                $condition = ["=", "np.id", $record["progressId"]];
                 
            } else {
                $condition = ["=", "ns.userId", $record["studentId"]];
            }

            $query = new Query();
            $query->select("u.id `userId`, u.firstName, u.lastName, ns.studentNumber,
                        np.id `progressId`, np.journeyId, np.taskId, np.progress, np.title, np.image, np.dateUpdated")
                ->from("netlogo_students ns")
                ->join('LEFT JOIN', 'users u', 'ns.userId = u.id')
                ->join('LEFT JOIN', 'netlogo_progress np', 'ns.userId = np.userId')
                ->where($condition);

            $command = $query->createCommand();
            $results = $command->queryAll();
            $output[] = $results[0];
        }

        return json_encode($output);
    }

    public function getImage($progressId) {
        $record = ProgressRecord::find()
                    ->where(["id" => $progressId])
                    ->one();

        if(empty($record->getAttribute("image"))) return "";
        $image = $record->getAttribute("image");
        $image = preg_replace("/^data:image\/png;base64,/", "", $image);
        return base64_decode($image);
    }

    public function getStudents($userId) {
        $students = StudentRecord::find()
                    ->select("u.id, u.firstName, u.lastName, studentNumber")
                    ->leftJoin("users `u`","userId = u.id")
                    ->where(["teacherId" => $userId])
                    ->all();
        
        $output = array();

        foreach($students as $student) {
            $output[] = (object) array(
                "id" => $student->id,
                "firstName" => $student->firstName,
                "lastName" => $student->lastName,
                "studentNumber" => $student->studentNumber
            );
        }

        return json_encode($output);

    }

    public function getFavorites($userId) {
        $favorites = FavoriteRecord::find()
                        ->where(["teacherId" => $userId])
                        ->all();

        $output = array();

        foreach($favorites as $favorite) {
            $output[] = (object) array(
                "teacherId" => $userId,
                "studentId" => $favorite->getAttribute("studentId"),
                "taskId" => $favorite->getAttribute("taskId")
            );
        }

        return json_encode($output);
    }

    public function loginStudent($studentNumber, $teacherNumber) {

        $query = new Query();

            /*
            SELECT ns.studentNumber, field_teachernumber 
    FROM netlogo_students ns
    LEFT JOIN content c ON ns.teacherId = c.elementId
            */
            $query->select("ns.userId, ns.studentNumber, c.field_teachernumber")
                ->from("netlogo_students ns")
                ->join('LEFT JOIN', 'content c', 'ns.teacherId = c.elementId')
                ->where(["ns.studentNumber" => $studentNumber, "c.field_teachernumber" => $teacherNumber ]);
             $command = $query->createCommand();
             $student = $command->queryOne();

        if(empty($student)) {
           Craft::$app->getUrlManager()->setRouteParams($this->getRegistationErrorInfo("We could not find a user with these credentials", $studentNumber));
           return null;
        } else {
            $studentId = $student["userId"];// $student->getAttribute("userId");
            return $this->loginStudentById($studentId);
        }
    }

    private function createStudent($studentNumber) {
        $group = Craft::$app->getUserGroups()->getGroupByHandle("students");
        $email = "student-$studentNumber@moda.education";
        $teacherNumber = (int)(preg_replace('/\\d{2}$/', "", (string)$studentNumber));

        $query = "SELECT u.id FROM users u 
                    LEFT JOIN content c ON u.id = c.elementId
                    WHERE c.field_teachernumber = :uid";


        $raw = Craft::$app->db->createCommand($query);
        $raw->bindParam(":uid", $teacherNumber, PDO::PARAM_INT);
        $result = $raw->queryOne();
        
        if(empty($result)) {
            Craft::$app->getUrlManager()->setRouteParams($this->getRegistationErrorInfo("We could not find a teacher for this student number", $studentNumber));
            return null;
        }
        $teacherId = $result["id"]; 

        $user = new User();
        $user->pending = false;
        $user->username = $email;
        $user->email = $email;
        $user->passwordResetRequired = false;
        $user->newPassword = "123456";
        $user->firstName = "Student";
        $user->lastName = "User";

        $user->setScenario(Element::SCENARIO_ESSENTIALS);

        if ($user->validate(null, true)) {
            Craft::$app->getElements()->saveElement($user, false);
            Craft::$app->users->assignUserToGroups($user->id, [$group->id]);
            Craft::$app->users->activateUser($user);
            Craft::$app->getUser()->loginByUserId($user->id);

            $student = new StudentRecord();
            $student->setAttribute("userId", $user->id);
            $student->setAttribute("studentNumber", $studentNumber);
            $student->setAttribute("teacherId", $teacherId);
            $student->save();

            $userSession = Craft::$app->getUser();
            $returnUrl = UrlHelper::url("./");
            Craft::$app->getView()->renderObjectTemplate($returnUrl, $userSession->getIdentity());
            Craft::$app->getResponse()->redirect($returnUrl, 302)->send();
            Craft::$app->end();

        } else {
            Craft::$app->getUrlManager()->setRouteParams($this->getRegistationErrorInfo(["We could not find a teacher for this student number", $studentNumber]));
            return null;
        }
    }

    private function loginStudentById($studentId) {
        Craft::$app->getUser()->loginByUserId($studentId);
        $userSession = Craft::$app->getUser();
        $returnUrl = UrlHelper::url("./");
        Craft::$app->getView()->renderObjectTemplate($returnUrl, $userSession->getIdentity());
        Craft::$app->getResponse()->redirect($returnUrl, 302)->send();
        Craft::$app->end();
    }

    public function saveProgress($id, $userId, $journeyId, $taskId, $progress, $title, $image, $ggb, $graph) {
        $record = ProgressRecord::find()
                    ->where(["id" => $id])
                    ->one();

        if(empty($record)) {
            $record = new ProgressRecord();
            $record->setAttribute("userId", $userId);
            $record->setAttribute("journeyId", $journeyId);
            $record->setAttribute("taskId", $taskId);
        }

        $record->setAttribute("title", $title);
        $record->setAttribute("progress", $progress);
        $record->setAttribute("image", $image);
        $record->setAttribute("ggbSettings", $ggb);
        $record->setAttribute("graphSettings", $graph);
        $record->save();

        return json_encode((object) array("status" => 200, "id" => $record->id));
    }


    public function loadProgress($userId, $journeyId, $taskId) {
        $records = ProgressRecord::find()
                    ->where(["userId" => $userId, "journeyId" => $journeyId, "taskId" => $taskId])
                    ->all();

        if(empty($records)) {
            return json_encode((object) array("status" => 200, "id" => null, "progress" => null));
        }

        $progress = array();

        foreach($records as $record) {
            $progress[] = (object) array( 
                        "id" => $record->id,
                        "title" => $record->getAttribute("title"),
                        "image" => $record->getAttribute("image"),
                        "progress" => $record->getAttribute("progress"),
                        "ggbSettings" => $record->getAttribute("ggbSettings"),
                        "graphSettings" => $record->getAttribute("graphSettings"));
        }

        return json_encode((object) array("status" => 200, "progress" => $progress ));
    }

    public function deleteModel($userId, $modelId) {
        $record = ProgressRecord::find()
                    ->where(["id" => $modelId, "userId" => $userId])
                    ->one();

        if(empty($record)) {
            return json_encode((object) array("status" => 404));
        }

        $record->delete();

        return json_encode((object) array("status" => 200 ));
    }

    public function saveEvent($userId, $journeyId, $taskId, $blockType, $actionType, $workspace) {
        $record = new ProgressEvent();
        $record->setAttribute("userId", $userId);
        $record->setAttribute("journeyId", $journeyId);
        $record->setAttribute("taskId", $taskId);
        $record->setAttribute("blockType", $blockType);
        $record->setAttribute("actionType", $actionType);
        $record->setAttribute("workspace", $workspace);
        $record->save();

        return json_encode((object) array("status" => 200));
    }

    public function saveChartData($userId, $journeyId, $taskId, $charts) {
        $submissionId = StringHelper::UUID();

        $transaction = Craft::$app->db->beginTransaction();

        foreach ($charts as $chart) {
            $chartId = $chart["id"];
            $data = $chart["data"];

            foreach($data as $point) {
                $x = $point["x"];
                $y = $point["y"];

                $record = new ChartData();
                $record->setAttribute("userId", $userId);
                $record->setAttribute("journeyId", $journeyId);
                $record->setAttribute("taskId", $taskId);
                $record->setAttribute("submissionId", $submissionId);
                $record->setAttribute("chartId", $chartId);
                $record->setAttribute("xValue", $x);
                $record->setAttribute("yValue", $y);
                $record->save();
            }
        }

        $transaction->commit();

        return json_encode((object) array("status" => 200));
    }

    private function getRegistationErrorInfo($error, $studentNumber) {
        return [
                "errorMessage" => $error,
                "studentNumber" => $studentNumber,
            ];
    }
    
}
