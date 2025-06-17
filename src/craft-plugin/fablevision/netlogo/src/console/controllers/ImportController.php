<?php

namespace fablevision\netlogo\console\controllers;


use Craft;
use fablevision\netlogo\Netlogo;
use fablevision\netlogo\jobs\Import;

use craft\helpers\Console;
use yii\console\Controller;
use yii\console\ExitCode;

class ImportController extends Controller
{
    public function actionIndex($migration = null): int {
        $this->stdout("importing netlogo migration" . PHP_EOL, Console::FG_GREEN);
        $imports = Netlogo::$plugin->exporter->getImports();
        $request = end($imports);

        if(!empty($migration)) {
        	$request = $this->findImportWithKey($migration, $imports);
        }

        if(empty($request)) {
        	$this->stdout('Could not find the migration to process for: ' . $migration . PHP_EOL, Console::FG_GREEN);
        } else {
        	$this->stdout('Migration found...' . PHP_EOL, Console::FG_GREEN);
            $queue = Craft::$app->getQueue();
            $queue->push(new Import(null, $request->key));
            $queue->run();
        }

        return ExitCode::OK;
    }

    protected function findImportWithKey($key, $list) {
    	foreach ($list as $item) {
    		if(preg_match("/".$key."/", $item->key)) return $item;
    	}
    	return null;
    }
}
