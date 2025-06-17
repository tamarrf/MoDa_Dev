<?php
/**
 * netlogo plugin for Craft CMS 3.x
 *
 * Craft plugin to support Blockly and Netlogo integration 
 *
 * @link      fablevision.com
 * @copyright Copyright (c) 2021 Chris Spence
 */

namespace fablevision\netlogo\controllers;

use fablevision\netlogo\Netlogo;

use Craft;
use craft\web\Controller;

/**
 * @author    Chris Spence
 * @package   Netlogo
 * @since     0.0.5
 */
class DefaultController extends Controller
{

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = ["student-login", "images"];


    public function actionStudentLogin() {
        $this->requirePostRequest();
        $teacherNumber = $this->getRequiredParam("loginTeacher");
        $studentNumber = $this->getRequiredParam("loginName");
        return Netlogo::$plugin->service->loginStudent($studentNumber, $teacherNumber);
    }

    public function actionSaveProgress() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $modelId = $this->getOptionalParam("id");
        $title = $this->getOptionalParam("title");
        $journeyId = $this->getRequiredParam("journeyId");
        $taskId = $this->getRequiredParam("taskId");
        $progress = $this->getRequiredParam("progress");
        $image = $this->getOptionalParam("image");
        $ggb = $this->getOptionalParam("ggbSettings");
        $graph = $this->getOptionalParam("graphSettings");
        return Netlogo::$plugin->service->saveProgress($modelId, $userId, $journeyId, $taskId, $progress, $title, $image, $ggb, $graph);
    }


    public function actionLoadProgress() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $journeyId = $this->getRequiredParam("journeyId");
        $taskId = $this->getRequiredParam("taskId");
        return Netlogo::$plugin->service->loadProgress($userId, $journeyId, $taskId);
    }

    public function actionSaveEvent() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $journeyId = $this->getRequiredParam("journeyId");
        $taskId = $this->getRequiredParam("taskId");
        $blockType = $this->getOptionalParam("blockType");
        $actionType = $this->getOptionalParam("actionType");
        $workspace = $this->getOptionalParam("workspace");
        return Netlogo::$plugin->service->saveEvent($userId, $journeyId, $taskId, $blockType, $actionType, $workspace);
    }

    public function actionSaveChartData() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $journeyId = $this->getRequiredParam("journeyId");
        $taskId = $this->getRequiredParam("taskId");
        $charts = $this->getRequiredParam("charts");
        return Netlogo::$plugin->service->saveChartData($userId, $journeyId, $taskId, $charts);
    }

    public function actionDeleteModel() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $modelId = $this->getRequiredParam("id");
        return Netlogo::$plugin->service->deleteModel($userId, $modelId);
    }

    public function actionGetStudents() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        return Netlogo::$plugin->service->getStudents($userId);
    }

    public function actionGetStudentInfo() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $studentId = $this->getRequiredParam("studentId");
        $journeyId = $this->getOptionalParam("journeyId");
        $taskId = $this->getOptionalParam("taskId");
        return Netlogo::$plugin->service->getStudentInfo($studentId, $journeyId, $taskId);
    }

    public function actionGetStudentIds() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        return Netlogo::$plugin->service->getStudentIds($userId);
    }

    public function actionGetStudentsWithInfo() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $ids = $this->getOptionalParam("studentIds");
        return Netlogo::$plugin->service->getStudentsWithInfo($userId, $ids);
    }

    public function actionCreateAssignment() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $studentId = $this->getRequiredParam("studentId");
        $journeyId = $this->getOptionalParam("journeyId");
        return Netlogo::$plugin->service->createAssignment($studentId, $journeyId);
    }

    public function actionGetAssignments() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $studentId = $this->getRequiredParam("studentId");
        return Netlogo::$plugin->service->getAssignments($studentId);
    }

    public function actionUpdateAssignment() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $assignmentId = $this->getRequiredParam("assignmentId");
        $status = $this->getRequiredParam("status");
        return Netlogo::$plugin->service->updateAssignment($assignmentId, $status);
    }

    public function actionDeleteAssignment() {
        $userId = $this->validateUserId();
        $assignmentId = $this->getRequiredParam("assignmentId");
        return Netlogo::$plugin->service->deleteAssignment($assignmentId);
    }

    public function actionFavorite() {
        $teacherId = $this->validateUserId();
        $studentId = $this->getRequiredParam("studentId");
        $taskId = $this->getRequiredParam("taskId");
        return Netlogo::$plugin->service->favorite($teacherId, $studentId, $taskId);
    }

    public function actionUnfavorite() {
        $teacherId = $this->validateUserId();
        $studentId = $this->getRequiredParam("studentId");
        $taskId = $this->getRequiredParam("taskId");
        return Netlogo::$plugin->service->unfavorite($teacherId, $studentId, $taskId);
    }

    public function actionGetFavorites() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        return Netlogo::$plugin->service->getFavorites($userId);
    }

    public function actionGetStudentPages() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        return Netlogo::$plugin->service->getStudentPages($userId);
    }

    public function actionGetStudentPage() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $page = $this->getRequiredParam("page");
        return Netlogo::$plugin->service->getStudentPage($userId, $page);
    }

    public function actionImages() {
        Craft::$app->response->format = \yii\web\Response::FORMAT_RAW;
        $progressId = $this->getQueryParameter("image");
        $response = Craft::$app->getResponse();
        $response->headers->set('Content-Type', 'image/png');
        $response->content = Netlogo::$plugin->service->getImage($progressId);
        return $response;
    }

    public function actionLog() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $message = $this->getRequiredParam("message");
        return Netlogo::$plugin->service->log($userId, $message);
    }

    public function actionGetDefaultSettings() {
        $this->requirePostRequest();
        return Netlogo::$plugin->service->getDefaultSettings();
    }

    public function actionSaveGraph() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $taskId = $this->getRequiredParam("taskId");
        $csv = $this->getRequiredParam("csv");
        return Netlogo::$plugin->service->saveGraph($userId, $taskId, $csv);
    }

    public function actionDeleteGraph() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $id = $this->getRequiredParam("id");
        return Netlogo::$plugin->service->deleteGraph($userId, $id);
    }

    public function actionGetGraphs() {
        $this->requirePostRequest();
        $userId = $this->validateUserId();
        $taskId = $this->getRequiredParam("taskId");
        return Netlogo::$plugin->service->getGraphs($userId, $taskId);
    }

    private function getRequiredParam($param) {
        return Craft::$app->getRequest()->getRequiredParam($param);
    }

    private function getOptionalParam($param, $nullVal = null) {
        if(Craft::$app->getRequest()->getParam($param) === false) return false;

        return empty(Craft::$app->getRequest()->getParam($param)) ? $nullVal : Craft::$app->getRequest()->getParam($param);
    }

    private function getQueryParameter($param) {
        if(empty(Craft::$app->request->getQueryParam($param))) return null;
        return Craft::$app->request->getQueryParam($param);
    }

    private function validateUserId() {
        
        $input = Craft::$app->getRequest()->getRequiredParam("userId");
        $user = Craft::$app->getUser();
        $sessionId = $user->id;

        //Block spoof attempts
        if((int)$sessionId !== (int)$input) {
            throw new \Exception('Invalid Form Request: Invalid User Id');
            die();
        }

        return $sessionId;
    }

}
