<?php
/**
 * Created by PhpStorm.
 * User: egorov
 * Date: 08.04.2015
 * Time: 13:22
 */
namespace samsoncms\template;

use samson\core\CompressableExternalModule;
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
    public $menuLogo = 'www/menu/img/logo_w.png';


    /** @var string Module identifier */
    protected $id = 'template';

    /** Subscribed to e404 */
    public function init(array $params = array())
    {
        Event::subscribe('core.e404', array($this, '__e404'));
    }

    /**
     * Universal controller action, this is SamsonCMS main page
     * rendering.
     */
    public function __handler()
    {
        // HTML main #template-container
        $html = '';

        Event::fire('template.main.started', array(&$html));
        Event::fire('template.main.rendered', array(&$html));

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

        $html .= $this->view('menu/item')
                ->set('icon', 'home')
                ->set('name', t('Главная', true))
                ->set('class', 'homeLink')
                ->set('active', url()->module == '' ? 'active' : '')
                ->output();

        $html .= $this->view('menu/item')
            ->set('icon', 'globe')
            ->set('id', '../')
            ->set('name', t('На сайт', true))
            ->set('target', '_blank')
            ->output();

        Event::fire('template.menu.started', array(&$html, &$submenu));

        $html .= $this->view('menu/item')
            ->set('icon', 'sign-out')
            ->set('class', 'sign-out')
            ->set('id', 'signin/logout')
            ->set('name', t('Выход', true))
            ->output();

        Event::fire('template.menu.rendered', array(&$html, &$submenu));

        // Prepare view
        $this->view('menu/index')
            // TODO: Remove samson\core\Core dependency
            ->set('module', url()->module)
            ->set('logo', $this->menuLogo)

            ->set('template-menu', $html)
            ->set('submenu', $submenu);
    }

    /** E404 controller action */
    function __e404()
    {
        // HTML main #template-container
        $html = '';

        $this->system->active($this);

        Event::fire('template.e404.started', array(&$html));
        Event::fire('template.e404.rendered', array(&$html));

        // Render template e404 into local module
        m('local')->html(
            $this->view('e404')
            ->set('template-container', $html)
            ->output()
        )->title(t('Страница не найдена', true));

        header("HTTP/1.0 404 Not Found");
    }
}
