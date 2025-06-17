<?php
/**
 * Site URL Rules
 *
 * You can define custom site URL rules here, which Craft will check in addition
 * to any routes you’ve defined in Settings → Routes.
 *
 * See http://www.yiiframework.com/doc-2.0/guide-runtime-routing.html for more
 * info about URL rules.
 *
 * In addition to Yii’s supported syntaxes, Craft supports a shortcut syntax for
 * defining template routes:
 *
 *     'blog/archive/<year:\d{4}>' => ['template' => 'blog/_archive'],
 *
 * That example would match URIs such as `/blog/archive/2012`, and pass the
 * request along to the `blog/_archive` template, providing it a `year` variable
 * set to the value `2012`.
 */
use craft\helpers\App;

return [
    "/" => ['template' => App::env("PLUGIN_SLUG") . '/index.twig'],
    //"/about" => ['template' => App::env("PLUGIN_SLUG") . '/about.twig'],
    //"/team" => ['template' => App::env("PLUGIN_SLUG") . '/team.twig'],
    "/research" => ['template' => App::env("PLUGIN_SLUG") . '/menu-page.twig'],
    "/resources" => ['template' => App::env("PLUGIN_SLUG") . '/menu-page.twig'],
    "/copyright" => ['template' => App::env("PLUGIN_SLUG") . '/menu-page.twig'],
    "/contact" => ['template' => App::env("PLUGIN_SLUG") . '/menu-page.twig'],
    "/dashboard" => ['template' => App::env("PLUGIN_SLUG") . '/dashboard.twig'],
    "/dashboard/classes" => ['template' => App::env("PLUGIN_SLUG") . '/dashboard.twig'],
    "/dashboard/curriculum" => ['template' => App::env("PLUGIN_SLUG") . '/dashboard.twig'],
    "/dashboard/examples" => ['template' => App::env("PLUGIN_SLUG") . '/examples.twig'],
    "/dashboard/projects" => ['template' => App::env("PLUGIN_SLUG") . '/projects.twig'],
];
