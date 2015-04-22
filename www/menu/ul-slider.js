/**
 * Created by onysko on 22.04.2015.
 */

s('.template-menu-list').pageInit(function(menuList) {
    templateMenuSliderInit(menuList);
});

function templateMenuSliderInit(list)
{
    var topArrow = s('.arrow-top', list);
    var bottomArrow = s('.arrow-bottom', list);

    // Find item height. Each item has 20px margin
    var itemHeight = s('li.text', list).height() + 20;

    // Find items list height
    var listHeight = list.height() * 0.9;

    // 2 items is arrows
    var visibleCount = Math.floor(listHeight/itemHeight) - 2;

    // List items collection
    var items = [];

    // Create collection
    s('li.text', list).each(function(li) {
        if (!li.hasClass('sign-out')) {
            items.push(li);
        }
    });
    var itemsCount = items.length;

    // Hide arrow if it is not necessary
    if (visibleCount > itemsCount) {
        bottomArrow.hide();
    } else {
        bottomArrow.show();
        // Hide items that create list overflow
        for (var i = visibleCount; i < itemsCount; i ++) {
            items[i].hide();
        }
    }

    // Save pointer of first visible item
    var currentPointer = 0;

    // Save pointer of first invisible item
    var nextPointer = visibleCount;

    bottomArrow.click(function(arrow) {
        topArrow.show();
        items[currentPointer].hide();
        items[nextPointer].show();

        currentPointer++;
        nextPointer++;

        // Hide arrow if it was last item
        if (nextPointer == itemsCount) {
            arrow.hide();
        }
    });

    topArrow.click(function(arrow) {
        bottomArrow.show();
        items[currentPointer-1].show();
        items[nextPointer-1].hide();

        currentPointer--;
        nextPointer--;

        // Hide arrow if it was first item
        if (currentPointer == 0) {
            arrow.hide();
        }
    });
}
