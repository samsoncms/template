/**
 * Created by onysko on 22.04.2015.
 */

var topArrow = s('.arrow-top ', list);
var bottomArrow = s('.arrow-bottom ', list);

var nextPointer, currentPointer, itemsCount = 0;

// List items collection
var items = [];

var templateMenuSliderInit = function (list) {
    // Show top arrow
    topArrow.show();

    // Show bottom arrow
    bottomArrow.show();

    // Find item height. Each item has 20px margin
    var itemHeight = s('li.text', list).height() + 20;

    // Find items list height
    var listHeight = list.height() * 0.9;

    // 2 items is arrows
    items = [];

    // Calculation of the displayed items
    var visibleCount = Math.floor(listHeight/itemHeight) - 2;

    // Create collection
    s('li.text', list).each(function(li) {
        if (!li.hasClass('sign-out')) {
            items.push(li);
        }
    });

    // Quantity all items
    itemsCount = items.length;

    // Hide arrow if it is not necessary
    if (visibleCount > itemsCount) {

        // hide bottom arrow
        bottomArrow.hide();
    } else {

        // Save pointer of current visible item
        currentPointer = 0;

        for (var i = 0; i < itemsCount; i++) {
            if (items[i].hasClass('active')) {

                // Set active current items
                currentPointer = i;
            }
        }

        //hide items
        if (itemsCount-visibleCount-1 < currentPointer) {
            bottomArrow.hide();
            topArrow.show();

            for (var i = 0; i<itemsCount-visibleCount; i++) {
                items[i].hide();
            }
            currentPointer = itemsCount - visibleCount;

        } else {

            for (var i = 0; i < itemsCount; i++) {
                if ((i < currentPointer) || (i+1 > (currentPointer + visibleCount))) {
                    items[i].hide();
                }
            }
        }
    }


    // Save pointer of first invisible item
    nextPointer = currentPointer+visibleCount;

    if (currentPointer == 0 || currentPointer == undefined) {
        topArrow.hide();
    }

    if (nextPointer == itemsCount) {
        bottomArrow.hide();
    }

};

s('.template-menu-list').pageInit(function(menuList) {
    templateMenuSliderInit(menuList);
    animateMenu();
});

s(window).resize(function(){
    for (var i = 0; i < itemsCount; i++) {
        items[i].show();
    }

    templateMenuSliderInit(s('.template-menu-list'));
});

animateMenu = function(){

    var mouseOverArrow = false, mouseClickArrow = false;

    // Time delay
    var timeDelay = 1000;

    AnimateBottom = function (arrow) {
        if (mouseOverArrow || mouseClickArrow) {
            topArrow.show();
            items[currentPointer].hide();
            items[nextPointer].show();

            currentPointer++;
            nextPointer++;

            // Hide arrow if it was last item
            if (nextPointer == itemsCount) {
                arrow.hide();
                mouseOverArrow = false;
            }

            if (!mouseClickArrow) {
                setTimeout(function () {
                    AnimateBottom(arrow);
                }, timeDelay);
            } else {
                mouseClickArrow = false;
            }
        }
    };

    bottomArrow.mouseover(function(arrow){
        if (!mouseOverArrow) {
            mouseOverArrow = true;
            setTimeout(function () {
                AnimateBottom(arrow);
            }, timeDelay);
        }
    });

    bottomArrow.click(function(arrow) {
        mouseOverArrow = false;
        mouseClickArrow = true;

        AnimateBottom(arrow);
    });

    bottomArrow.mouseout(function(){
        mouseOverArrow = false;
    });

    AnimateTop = function (arrow) {
        if (mouseOverArrow || mouseClickArrow) {
            bottomArrow.show();
            items[currentPointer-1].show();
            items[nextPointer-1].hide();

            currentPointer--;
            nextPointer--;

            // Hide arrow if it was first item
            if (currentPointer == 0) {
                arrow.hide();
                mouseOverArrow = false;
            }

            if (!mouseClickArrow) {
                setTimeout(function () {
                    AnimateTop(arrow);
                }, timeDelay);
            } else {
                mouseClickArrow = false;
            }
        }
    };

    topArrow.click(function(arrow) {
        mouseOverArrow = false;
        mouseClickArrow = true;
        AnimateTop(arrow);
    });

    topArrow.mouseover(function(arrow){
        if (!mouseOverArrow) {
            mouseOverArrow = true;
            setTimeout(function () {
                AnimateTop(arrow);
            }, timeDelay);
        }
    });

    topArrow.mouseout(function(){
        mouseOverArrow = false;
    });
};