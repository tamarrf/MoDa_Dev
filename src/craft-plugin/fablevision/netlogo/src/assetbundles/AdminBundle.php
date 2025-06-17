<?php
namespace fablevision\netlogo\assetbundles;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class AdminBundle extends AssetBundle
{
    public function init()
    {
        $this->sourcePath = '@fablevision/netlogo/admin-application';
        $this->js = [
            'runtime.js',
            'polyfills.js',
            'main.js'
        ];

        $this->css = [ 
            "styles.css",
        ];

        parent::init();
    }
}
