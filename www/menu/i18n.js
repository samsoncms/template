s('.i18n-current').pageInit(function (current) {

    current.click(function(elem){
        elem.toggleClass('open');
    });

    // Add touch on menu
    //var el = document.getElementsByClassName('i18n-current');
    //el[0].addEventListener('touchend', function(e){
    //    e.preventDefault();
    //    s('.i18n-current').toggleClass('open');
    //}, false);
});

