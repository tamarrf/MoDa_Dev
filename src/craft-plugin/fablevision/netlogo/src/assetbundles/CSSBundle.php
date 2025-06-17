<?php
namespace fablevision\netlogo\assetbundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class CSSBundle extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = '@fablevision/netlogo/assetbundles/';
        $this->css = [ 
        	"css/main.css",
        ];

        parent::init();
    }
}