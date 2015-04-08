# SamsonCMS generic template module
This module is responsible for rendering base HTML template,
its styles, icons and images. 

All styles is created with LESS, using all of its features:
* mixins
* variables

This module should define HTML structure of SamsonCMS, its building blocks
and entities which should be used in all other SamsonCMS modules and applications.

This template is basic and included in a SamsonCMS bootstrap, but can be easily changed 
by custom or modified once, the only limitation that must be met is template structure and
its events, as all SamsonCMS ecosystem is based on this structure and entities.

## Structure
This base SamsonCMS template structure can be defined as next:
* left menu block (#template-left-menu)
* main container block (#template-container)

## Events
All structure blocks have Events(http://github.com/samsonphp/event), and all
their filling and rendering should be done via this events.

### Left menu events
#### Menu created event - ```template.menu.created```
This event fires before generic menu rendering process has started.

#### Menu rendered event - ```template.menu.rendered```
This event fires when all menu inner items has been rendered into main container.

### Container events
#### Container created event - ```template.container.created```
This event fires before container rendering process has started.

#### Container rendered event - ```template.container.rendered```
This event fires when container has been rendered into main container.


