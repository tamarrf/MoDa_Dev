<?php
/**
 * netlogo plugin for Craft CMS 3.x
 *
 * Craft plugin to support Blockly and Netlogo integration 
 *
 * @link      fablevision.com
 * @copyright Copyright (c) 2021 Chris Spence
 */

namespace fablevision\netlogo\variables;

use fablevision\netlogo\Netlogo;
use craft\elements\Entry;

use Craft;

/**
 * @author    Chris Spence
 * @package   Netlogo
 * @since     0.0.5
 */
class NetlogoVariable
{
    // Public Methods
    // =========================================================================

    /**
     * @param null $optional
     * @return string
     */
    public function getJourneyAndTask($journeyId, $taskId = null) {

        $output = (object) array();
        
        $journey = Entry::find()
                    ->section("journey")
                    ->id($journeyId)
                    ->one();

        $output->journey = (object) array();
        $output->journey->title = $journey->journeyTitle;
        $output->journey->description = $journey->journeyDescription->getParsedContent();

        if(!empty($taskId)) {
            $task = Entry::find()
                    ->section("journeyTask")
                    ->id($taskId)
                    ->one();

            $script = $task->taskScript->one();
            $output->task = (object) array();
            $output->task->title = $task->taskTitle;
            $output->task->stableReference = $task->stableReference;
            $output->task->blocklyLibrary = $task->blockLibrary;
            $components = [];
            foreach ($task->viewComponents as $option) {
                if($option->selected){
                    $components[] = $option->value;
                }
            }
            $output->task->viewComponents = $components;
            $output->task->worldWidth = $task->worldWidth;
            $output->task->chart = $task->taskChart;
            $output->task->widget = $task->taskWidget;
            $output->task->experiment = $task->taskExperiment;
            $output->task->script = $script->getUrl();
            $videos = $task->taskVideos->all();
            $output->task->videos = [];
            foreach($videos as $video) {
                $vidObj = (object) array();
                $vidObj->source = $video->source->one()->getUrl();
                $vidObj->title = $video->dropdownTitle;
                array_push($output->task->videos, $vidObj);
            }
        }

        return $output;
    }

    public function getAllContent() {
        $output = (object) array();
        $output->journeys = [];
        $journeys = Entry::find()
                    ->section("journey")
                    ->all();
        foreach ($journeys as $journey) {
            $journeyOutput = (object) array();
            $journeyOutput->title = $journey->journeyTitle;
            $journeyOutput->id = $journey->id;
            $journeyOutput->tasks = [];
            $tasks = $journey->journeyTasks;
            foreach ($tasks as $task){
                $taskOutput = (object) array();
                $taskOutput->title = $task->taskTitle;
                $taskOutput->id = $task->id;
                array_push($journeyOutput->tasks, $taskOutput);
            }
            array_push($output->journeys, $journeyOutput);
        }
        return $output;
    }

    public function getExampleContent($journeyId, $exampleId = null) {
        $output = (object) array();
        
        $journey = Entry::find()
                    ->section("journey")
                    ->id($journeyId)
                    ->one();

        $output->journey = (object) array();
        $output->journey->title = $journey->journeyTitle;
        $output->journey->description = $journey->journeyDescription->getParsedContent();
        $exampleObj = (object) array();
        if(!empty($exampleId)) {
            $example = $journey->journeyExamples->id($exampleId)->one();
            $exampleObj->title = $example->exampleTitle;
            $exampleObj->script = $example->exampleScript;
            $task = $example->exampleTask->one();
            $taskObj = (object) array();
            $taskObj->title = $task->taskTitle;
            $taskObj->script = $task->taskScript->one()->getUrl();
            $components = [];
            foreach ($task->viewComponents as $option) {
                if($option->selected){
                    $components[] = $option->value;
                }
            }
            $taskObj->viewComponents = $components;
            $taskObj->worldWidth = $task->worldWidth;
            $taskObj->chart = $task->taskChart;
            $taskObj->blocklyLibrary = $task->blockLibrary;
            $taskObj->widget = $task->taskWidget;
            $taskObj->experiment = $task->taskExperiment;
            $videos = $task->taskVideos->all();
            $taskObj->videos = [];
            foreach($videos as $video) {
                $vidObj = (object) array();
                $vidObj->source = $video->source->one()->getUrl();
                $vidObj->title = $video->dropdownTitle;
                array_push($taskObj->videos, $vidObj);
            }
            $exampleObj->task = (object) array();
            $exampleObj->task = $taskObj;
        }
        $output->journey->example = (object) array();
        $output->journey->example = $exampleObj;
        return $output;
    }

    public function getImports() {
        return Netlogo::$plugin->exporter->getImports();
    }

    public function getStudents($userId) {
        $students = json_decode(Netlogo::$plugin->service->getStudents($userId));
        return $students;
    }

    public function getStudentInfo($studentId, $journeyId, $taskId) {
        $info = json_decode(Netlogo::$plugin->service->getStudentInfo($studentId, $journeyId, $taskId));
        return $info;
    }

    public function getAssignments($studentId) {
        $assignments = Netlogo::$plugin->service->getAssignments($studentId);
        return $assignments;
    }

    public function getUserRole() {
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
