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

    /** Event when #e404 rendering has started */
    const E_E404_STARTED = 'template.e404.started';

    /** Event when #e404 rendering has finished */
    const E_E404_RENDERED = 'template.e404.rendered';


    /** @var bool Flag to show SamsonCMS logo in menu */
    public $showMenuLogo = true;


    /** @var string Module identifier */
    protected $id = 'template';

    /**
     * Universal controller action, this is SamsonCMS main page
     * rendering.
     */
    public function __handler()
    {
        // HTML main #template-container
        $html = '';

        Event::fire(self::E_MAIN_STARTED, array(&$html));
        Event::fire(self::E_MAIN_RENDERED, array(&$html));

        // Prepare view
        $this->view('container')
            ->title(t('Главная', true))
            ->set('template-container', $html);
    }

    /** #template-menu rendering controller action */
    public function __menu()
    {
        // HTML main #template-menu
        $html = '';
        $submenu = '';

        Event::fire(self::E_MENU_STARTED, array(&$html, &$submenu));
        Event::fire(self::E_MENU_RENDERED, array(&$html, &$submenu));

        // Prepare view
        $this->view('menu/new/index')
            // TODO: Remove samson\core\Core dependency
            ->set('module', url()->module)
            ->set('logo', $this->showMenuLogo)
            ->set('template-menu', $html)
            ->set('submenu', $submenu);
    }

    /** E404 controller action */
    function __e404()
    {
        // HTML main #template-container
        $html = '';

        Event::fire(self::E_E404_STARTED, array(&$html));
        Event::fire(self::E_E404_RENDERED, array(&$html));

        $this->view('e404')
            ->title(t('Страница не найдена', true))
            ->set('template-container', $html);
    }
}
