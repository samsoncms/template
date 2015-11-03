/**
 * Created by egorov on 10.04.2015.
 */
s('.template-menu').pageInit(function(menu){

   /* var container = s('#template-container');

    // Bind menu collapser
    var collapserBtn = s('.template-menu-collapse, .text.active', menu).click(function(collapserBtn){
        menu.toggleClass('expanded');
        setTimeout(function(){
            menu.toggleClass('finished');
        },300);
    });*/

    var collapse2 = s('.collapser').click(function(clicked){
        s('.template-sub-menu').toggleClass('collapsed');
        s('.active', '.template-menu-list').toggleClass('collapsedActive');
    });
});
