<?php
/**
 * Created by PhpStorm.
 * User: egorov
 * Date: 08.04.2015
 * Time: 13:22
 */
namespace samsoncms\template;

use samson\core\CompressableExternalModule;
use samson\cms\App;
use samsonphp\event\Event;

/**
 * Base SamsonCMS template controller
 * @package samsoncms\template
 */
class Template extends CompressableExternalModule
{
    /** Event when main page rendering has started */
    const E_MAIN_STARTED = 'template.main.started';

    /** Event when main page rendering has finished */
    const E_MAIN_RENDERED= 'template.main.rendered';

    /** Event when #template-menu rendering has started */
    const E_MENU_STARTED = 'template.menu.started';

    /** Event when #template-menu rendering has finished */
    const E_MENU_RENDERED = 'template.menu.rendered';

    /** Event when #template-container rendering has started */
    const E_CONTAINER_STARTED = 'template.container.started';

    /** Event when #template-container rendering has finished */
    const E_CONTAINER_RENDERED = 'template.container.rendered';


    /** @var string Module identifier */
    protected $id = 'template';

    /**
     * Template main page rendering
     * @param string $html #template-container content for rendering
     */
    public function mainPage(&$html)
    {
        // HTML main #template-container
        $html = '';

        Event::fire(self::E_MAIN_STARTED, array(&$html));

        $html .= $this->oldMain();

        Event::fire(self::E_MAIN_RENDERED, array(&$html));
    }

    /**
     * Universal controller action, this is SamsonCMS main page
     * rendering.
     */
    public function __handler()
    {
        // Subscribe for rendering #template-container
        Event::subscribe(self::E_CONTAINER_STARTED, array($this, 'mainPage'));

        // Prepare view
        $this->view('index')->title(t('Главная', true));
    }

    /** #template-container rendering controller action */
    public function __container()
    {
        // HTML main #template-container
        $html = '';

        Event::fire(self::E_CONTAINER_STARTED, array(&$html));

        Event::fire(self::E_CONTAINER_RENDERED, array(&$html));

        // Prepare view
        $this->view('container')->set('template-container', $html);
    }

    /** #template-menu rendering controller action */
    public function __menu()
    {
        // HTML main #template-menu
        $html = '';

        $menu = $this->oldMenu();

        Event::fire(self::E_MENU_STARTED, array(&$html));

        $html = array_shift($menu);

        Event::fire(self::E_MENU_RENDERED, array(&$html));

        // Prepare view
        $this->view('menu/index')
            ->set('mainPageActive', $_SERVER['REQUEST_URI'] == '/' ? 'active' : '')
            ->set('template-menu', $html)
            ->set('submenu', array_shift($menu));
    }

    /** E404 controller action */
    function __e404()
    {
        $this->view('e404')->title(t('Страница не найдена', true));
    }

    /**
     * @deprecated
     * @returns CompressableExternalModule[] Get loaded SamsonCMS applications
     */
    protected function applications()
    {
        $apps = array();

        // Render application main page block
        foreach (App::loaded() as $app) {
            // Show only visible apps
            if ($app->hide == false) {
                $apps[] = $app;
            }
        }

        return $apps;
    }

    /**
     * @deprecated All application should draw main page block via events
     */
    protected function oldMain()
    {
        $html = '';

        // Render application main page block
        foreach ($this->applications() as $app) {
            $html .= $app->main();
        }

        return $html;
    }

    /**
     * @deprecated All application should draw menu block via events
     */
    protected function oldMenu()
    {
        $html = '';

        // Iterate loaded samson\cms\application
        foreach ($this->applications() as $app) {
            // Render application menu item
            $html .= m()
                ->view('menu/item')
                ->active(url()->module == $app->id() ? 'active' : '')
                ->app($app)
                ->name(isset($app->name{0}) ? $app->name : (isset($app->app_name{0})?$app->app_name:''))
                ->output();
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

        return array($html, $subMenu);
    }
}
