<?php
namespace fablevision\netlogo\assetbundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class SimulationBundle extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = '@fablevision/netlogo/assetbundles/simulation';
        $this->js = [
        	"js/jquery.min.js",
            "js/underscore-min.js",
        	"js/script.js",
        ];

        parent::init();
    }
}