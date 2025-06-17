<?php

namespace fablevision\netlogo\jobs;
use fablevision\netlogo\Netlogo;

use Craft;
use ZipArchive;
use craft\helpers\Json;
use craft\queue\BaseJob;

class Import extends BaseJob {

    private $path = false;

    public function __construct($config = [], $path = null) {
        parent::__construct($config);
        $this->path = $path;
    }

    public function execute($queue) {
    	Netlogo::$plugin->exporter->import($this->path);
    }

    protected function defaultDescription(): string {
        return Craft::t('netlogo', 'Executing content import');
    }
}
