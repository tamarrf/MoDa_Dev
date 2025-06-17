<?php
/**
 * netlogo plugin for Craft CMS 3.x
 *
 * Craft plugin to support Blockly and Netlogo integration 
 *
 * @link      fablevision.com
 * @copyright Copyright (c) 2021 Chris Spence
 */

namespace fablevision\netlogo;

use fablevision\netlogo\services\ExportService;
use fablevision\netlogo\services\NetlogoService;
use fablevision\netlogo\services\ManagementService;
use fablevision\netlogo\variables\NetlogoVariable;

use Craft;
use craft\base\Plugin;
use craft\services\Plugins;
use craft\events\PluginEvent;
use craft\web\UrlManager;
use craft\web\View;
use craft\web\twig\variables\CraftVariable;
use craft\web\twig\variables\Cp;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterTemplateRootsEvent;
use craft\events\RegisterCpNavItemsEvent;

use yii\base\Event;

/**
 * Class Netlogo
 *
 * @author    Chris Spence
 * @package   Netlogo
 * @since     0.0.5
 *
 * @property  NetlogoServiceService $netlogoService
 */
class Netlogo extends Plugin
{
    // Static Properties
    // =========================================================================

    /**
     * @var Netlogo
     */
    public static $plugin;

    // Public Properties
    // =========================================================================

    /**
     * @var string
     */
    public $schemaVersion = '0.0.15';

    /**
     * @var bool
     */
    public $hasCpSettings = false;

    /**
     * @var bool
     */
    public $hasCpSection = true;

    public $service;
    public $exporter;
    public $management;

    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
        self::$plugin = $this;
        $this->name = "Netlogo Administrator";

        $this->service = new NetlogoService();
        $this->exporter = new ExportService();
        $this->management = new ManagementService();

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['siteActionTrigger1'] = 'netlogo/default';
            }
        );

        Event::on(
            View::class,
            View::EVENT_REGISTER_SITE_TEMPLATE_ROOTS,
            function(RegisterTemplateRootsEvent $event) {
                $event->roots['netlogo'] = __DIR__ . '/web-application';
                $event->roots['netlogo-migrations'] = __DIR__ . '/migrations-json';
            }
        );

        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                /** @var CraftVariable $variable */
                $variable = $event->sender;
                $variable->set('netlogo', NetlogoVariable::class);
            }
        );

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['cpActionTrigger1'] = 'export';
                $event->rules['netlogo/export'] = 'export';
                $event->rules['netlogo/management'] = 'management';
            }
        );

        Event::on(
            Plugins::class,
            Plugins::EVENT_AFTER_INSTALL_PLUGIN,
            function (PluginEvent $event) {
                if ($event->plugin === $this) {
                }
            }
        );

        Event::on(
            View::class,
            View::EVENT_REGISTER_CP_TEMPLATE_ROOTS,
            function(RegisterTemplateRootsEvent $event) {
                $event->roots['content-management'] = __DIR__ . '/admin-application/twigs';
            }
        );

        Event::on(
            Cp::class,
            Cp::EVENT_REGISTER_CP_NAV_ITEMS,
            function(RegisterCpNavItemsEvent $event) {

                $pos = 1;
                $nav = [
                    'url' => 'content-management',
                    'label' => 'Classroom Admin',
                    'icon' => __DIR__ . '/icon.svg',
                ];

                array_splice($event->navItems, $pos + 1, 0, [ $nav ]);
            }
        );

        Craft::info(
            Craft::t(
                'netlogo',
                '{name} plugin loaded',
                ['name' => $this->name]
            ),
            __METHOD__
        );
    }

    // Protected Methods
    // =========================================================================

}
