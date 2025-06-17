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
use fablevision\netlogo\jobs\Export;
use fablevision\netlogo\jobs\Import;

use Craft;
use craft\web\Controller;

/**
 * @author    Chris Spence
 * @package   Netlogo
 * @since     0.0.5
 */
class ManagementController extends Controller
{

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = [];

    public function actionGetTeachers() {
    	return json_encode(Netlogo::$plugin->management->getTeachers());
    }

    public function actionGetStudentNumbers() {
        $this->requirePostRequest();
        $teacherId = $this->getRequiredParam("teacherId");
        return json_encode(Netlogo::$plugin->management->getStudentNumbers($teacherId));
    }

    public function actionEnableTeachers() {
        $this->requirePostRequest();
        $teachers = $this->getRequiredParam("teachers");
        return json_encode(Netlogo::$plugin->management->enableTeachers($teachers));
    }

    public function actionDisableTeachers() {
        $this->requirePostRequest();
        $teachers = $this->getRequiredParam("teachers");
        return json_encode(Netlogo::$plugin->management->disableTeachers($teachers));
    }

    public function actionCreateTeachers() {
        $this->requirePostRequest();
        $teachers = $this->getRequiredParam("teachers");
        return json_encode(Netlogo::$plugin->management->createTeachers($teachers));
    }

    public function actionGetClassrooms() {
        return json_encode(Netlogo::$plugin->management->getClassrooms());
    }

    public function actionGetStudents() {
        $this->requirePostRequest();
        $classId = $this->getRequiredParam("classId");
        return json_encode(Netlogo::$plugin->management->getStudents($classId));
    }

    public function actionCreateClassrooms() {
        $this->requirePostRequest();
        $classrooms = $this->getRequiredParam("classrooms");
        return json_encode(Netlogo::$plugin->management->createClassrooms($classrooms));
    }

    public function actionEnableStudents() {
        $this->requirePostRequest();
        $classId = $this->getRequiredParam("classId");
        $students = $this->getRequiredParam("students");
        return json_encode(Netlogo::$plugin->management->enableStudents($students, $classId));
    }

    public function actionDisableStudents() {
        $this->requirePostRequest();
        $classId = $this->getRequiredParam("classId");
        $students = $this->getRequiredParam("students");
        return json_encode(Netlogo::$plugin->management->disableStudents($students, $classId));
    }

    public function actionCreateStudents() {
        $this->requirePostRequest();
        $classId = $this->getRequiredParam("classId");
        $teacherId = $this->getRequiredParam("teacherId");
        $students = $this->getRequiredParam("students");
        return json_encode(Netlogo::$plugin->management->createStudents($students, $classId, $teacherId));
    }

    public function actionAutoCreateStudents() {
        $this->requirePostRequest();
        $classId = $this->getRequiredParam("classId");
        $teacherId = $this->getRequiredParam("teacherId");
        $numStudents = $this->getRequiredParam("numStudents");
        return json_encode(Netlogo::$plugin->management->autoCreateStudents($numStudents, $classId, $teacherId, true));
    }

    private function getRequiredParam($param) {
        return Craft::$app->getRequest()->getRequiredParam($param);
    }

    private function getOptionalParam($param, $nullVal = null) {
        if(Craft::$app->getRequest()->getParam($param) === false) return false;

        return empty(Craft::$app->getRequest()->getParam($param)) ? $nullVal : Craft::$app->getRequest()->getParam($param);
    }
}
