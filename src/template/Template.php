<?php
/**
 * Created by PhpStorm.
 * User: egorov
 * Date: 08.04.2015
 * Time: 13:22
 */
namespace samsoncms\template;

use samsonphp\event\Event;

/**
 * Base SamsonCMS template controller
 * @package samsoncms\template
 */
class Template extends \samson\core\CompressableExternalModule
{
    /** Event when main page is started rendering */
    const E_MAIN_STARTED = 'template.main.started';

    /**
     * Universal controller action, this is SamsonCMS main page
     * rendering entry point for #template-container block.
     */
    public function __handler()
    {
        // HTML main #template-container
        $html = '';

        Event::fire(self::E_MAIN_STARTED, array(&$html));

        // TODO: This should be removed in near future
        // Render application main page block
        foreach (App::loaded() as $app) {
            // Show only visible apps
            if ($app->hide == false) {
                $html .= $app->main();
            }
        }

        // Render view
        m()	->view('index')
            ->title(t('Главная', true))
            ->set('mainPageActive', 'active')
            ->set('template-container', $html)
        ;
    }

    /** E404 controller action */
    function __e404()
    {
        $this->view('e404')->title(t('Страница не найдена', true));
    }

    /* Menu controller action */
    function __menu()
    {
        $result = '';
        // Iterate loaded samson\cms\application
        foreach (App::loaded() as $app/*@var $app App*/) {
            // If application is not hidden
            if ($app->hide == false) {
                // Render application menu item
                $result .= m()
                    ->view('menu/item')
                    ->active( url()->module == $app->id() ? 'active' : '' )
                    ->app( $app )
                    ->name( isset($app->name{0}) ? $app->name : (isset($app->app_name{0})?$app->app_name:''))
                    ->output();
            }
        }

        $subMenu = '';

        // Find current SamsonCMS application
        if (App::find(url()->module, $app/*@var $app App*/)) {
            // Render main-menu application sub-menu
            $subMenu = $app->submenu();

            // If module has sub_menu view - render it
            if ($app->findView('sub_menu')) {
                $subMenu .= $app->view('sub_menu')->output();
            }
        }

        // Render menu view
        m()
            ->view('menu/index')
            ->submenu($subMenu)
            ->items( $result);
    }
}
