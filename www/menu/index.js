/**
 * Created by egorov on 10.04.2015.
 */
s('.template-menu').pageInit(function (menu) {
    var collapse2 = s('.collapser').click(function (clicked) {
        s('.template-sub-menu').toggleClass('collapsed');
    });

    // added animation to left (big) menu
    var bigMenu = $('.template-menu');
    var smallMenu = s('.template-sub-menu');
    var rightBlock = s('#template-container');
    var bigMenuWidth = 150;
    var smallMenuWidth = 50;

    bigMenu.mouseleave(function () {
        bigMenu.addClass('minimized');
    });

    // Mobile menu
    s('#mobile-menu-button').click(function(btn){
        btn.toggleClass('open');
        s('.template-menu').toggleClass('open');
        s('body').toggleClass('mobile-open');
    });

    bigMenu.mouseenter(function () {
        bigMenu.removeClass('minimized');

        s('.text').css('display', 'block');
        templateMenuSliderInit(s('.template-menu-list'));
    });
    
    // if there is no submenu add class for current active item
    if (s('.template-sub-menu').length == 0) {
        s('.active', menu).addClass('active-without-submenu');
    }
});

s('body').pageInit(function(){
    tilesInit();
    window.onresize = function(event) {
        tilesInit();
    };
});

var initContentWidth = function() {
    var elem = s('#content');
    var table = s('.table2');
    if (elem.width() < table.elements[table.elements.length-1].width()) {
        s('.table-switcher').hide();
        table.elements[table.elements.length-1].removeClass('default');
        table.elements[table.elements.length-1].addClass('tiles');
    }
};

var tilesInit = function() {
    if (window.innerWidth < 768) {
        s('.table2').addClass('mobile-version');
    } else {
        s('.table2').removeClass('mobile-version');
        initContentWidth();
    }
};
