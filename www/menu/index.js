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

    bigMenu.mouseenter(function () {
        bigMenu.removeClass('minimized');

        s('.text').css('display', 'block');
        templateMenuSliderInit(s('.template-menu-list'));
    });
});
