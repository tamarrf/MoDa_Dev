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
class ExportController extends Controller
{

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = [];

    public function actionImport() {
        $this->requirePostRequest();
        $path = $this->getRequiredParam("path");
        $queue = Craft::$app->getQueue();
        $jobId = $queue->push(new Import(null, $path));
        return $this->redirect(Craft::$app->getRequest()->referrer);
    }

    public function actionExport() {
        $this->requirePostRequest();
        $package = $this->getRequiredParam("package") === "true" ? true : false;
        $upload = $this->getRequiredParam("upload") === "true" ? true : false;
        $queue = Craft::$app->getQueue();
        $jobId = $queue->push(new Export(null, $package, $upload));
        return $this->redirect(Craft::$app->getRequest()->referrer);
    }

    private function getRequiredParam($param) {
        return Craft::$app->getRequest()->getRequiredParam($param);
    }

    private function getOptionalParam($param, $nullVal = null) {
        if(Craft::$app->getRequest()->getParam($param) === false) return false;

        return empty(Craft::$app->getRequest()->getParam($param)) ? $nullVal : Craft::$app->getRequest()->getParam($param);
    }
}
