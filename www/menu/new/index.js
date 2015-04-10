/**
 * Created by egorov on 10.04.2015.
 */
s('.template-menu').pageInit(function(menu){

    var container = s('#template-container');

    // Bind menu collapser
    var collapserBtn = s('.template-menu-collapse', menu).click(function(collapserBtn){
        menu.toggleClass('expanded');
        collapserBtn.toggleClass('fa-times');
        collapserBtn.toggleClass('fa-bars');
        container.toggleClass('collapsed');
    });
});