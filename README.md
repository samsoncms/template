# SamsonCMS generic template module

[![Latest Stable Version](https://poser.pugx.org/samsoncms/template/v/stable.svg)](https://packagist.org/packages/samsoncms/template)
[![Build Status](https://scrutinizer-ci.com/g/samsoncms/template/badges/build.png?b=master)](https://scrutinizer-ci.com/g/samsoncms/template/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/samsoncms/template/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/samsoncms/template/?branch=master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/samsoncms/template/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/samsoncms/template/?branch=master) 
[![Total Downloads](https://poser.pugx.org/samsoncms/template/downloads.svg)](https://packagist.org/packages/samsoncms/template)
[![Stories in Ready](https://badge.waffle.io/samsoncms/template.png?label=ready&title=Ready)](https://waffle.io/samsoncms/template)

This module is responsible for rendering base HTML template,
its styles, icons and images. 

All template styles is created with LESS, every entity has it ```vars.less```.

This module should define HTML structure of SamsonCMS, its building blocks
and entities which should be used in all other SamsonCMS modules and applications.

This template is basic and included in a SamsonCMS bootstrap, but can be easily changed 
by custom or modified once, the only limitation that must be met is template structure and
its events, as all SamsonCMS ecosystem is based on this structure and entities.

Template is using [Font-Awesome](http://fortawesome.github.io/Font-Awesome/) for all icons.

## Events
All structure blocks have Events(http://github.com/samsonphp/event), and all
their filling and rendering should be done via this events.

## Template structure
This base SamsonCMS template structure can be defined as next:
* Menu section ```.template-menu```
* Sub-menu section ```.template-sub-menu```
* Container section ```.template-container```

### Template menu structure
Index view is located ```www/menu/index.vphp```, menu item view is located ```www/menu/item.vphp```
* ```<section>.template-menu```
    * ```<ul>.template-menu-list```
        * ```<li>.text``` Added ```.active``` if item is active
            * ```<a>.item``` or ```<div>.item``` (for .active element as it cannot be clicked)
            * ```<i>``` For icons (do not use it if no icon is needed)
            * ```<span>``` For item text (do not use it if no text is needed)
            
### Template sub-menu structure
Index view is located ```www/menu/index.vphp```, menu item view is located ```www/menu/item.vphp```
* ```<section>.template-sub-menu```
    * ```<ul>.template-sub-menu-list```
        * ```<li>.collapser``` For showing/hiding sub-menu
        * ```<li>```  You can use any inner item structure
    
### Menu events
#### Menu created event - ```template.menu.started: &$html, &$submenu``` 
This event fires before generic menu rendering process has started. Before menu started default
template menu item would be automatically added:
* Main page item
* Go to site item
So in your event you will already receive not an empty menu ```$html```, this gives you ability to remove 
this default items or change them.

For rendering sub-menu section you need to fill ```$submenu``` in your event handler.

#### Menu rendered event - ```template.menu.rendered: &$html, &$submenu```
This event fires when all menu inner items has been rendered into main container.

#### Menu event handler example
This is a modified old approach menu & sub-menu render integrated via new menu events
```php 
function oldMenuRenderer(&$html, &$subMenu)
{
    // Iterate loaded samson\cms\application
    foreach (\samson\cms\App::loaded() as $app) {
        // Show only visible apps
        if ($app->hide == false) {
            // Render application menu item
            $html .= m('template')
                ->view('menu/item')
                ->active(url()->module == $app->id() ? 'active' : '')
                ->app($app)
                ->icon($app->icon)
                ->name(isset($app->name{0}) ? $app->name : (isset($app->app_name{0}) ? $app->app_name : ''))
                ->output();
        }
    }

    $subMenu = '';

    // Find current SamsonCMS application
    if (\samson\cms\App::find(url()->module, $app/*@var $app App*/)) {
        // Render main-menu application sub-menu
        $subMenu = $app->submenu();

        // If module has sub_menu view - render it
        if ($app->findView('sub_menu')) {
            $subMenu .= $app->view('sub_menu')->output();
        }
    }
}
```

### Template container structure
All elements inside container must be inside ```.template-block```
* ```<section>.template-container```
    * ```<div>.template-block``` 
    
#### Template container form structure
* ```<*>.template-form``` Should be used for all forms
    * ```<div>.template-form-group``` - Form row
        * ```<div>.template-form-input``` - Form input field
            * ```<input,select,textarea>.template-form-input-field```
            * ```<label>.template-form-input-placeholder``` Used instead of standard placeholder
        
### Container events
#### Main page created event - ```template.main.created```
This event fires before main page rendering process has started.

#### Main page rendered event - ```template.main.rendered```
This event fires when main page has been rendered into main container.


