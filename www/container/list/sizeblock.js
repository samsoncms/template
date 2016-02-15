/**
 * Created by onysko on 18.05.2015.
 */

s('.sizeSelect').pageInit(function (select) {
    select.change(function() {
        var href = select.a('data-href') + select.val();

        //Field with text search
        var searchField = s('input#search').val();

        //Check field search quantity the input characters
        if (searchField.length > 2) {
            //Send string search in controller
            href += '&search='+searchField;
        }

        var loader = new Loader(s('.table2'));
        loader.show('', true);
        s.ajax(href, function(response) {
            response = JSON.parse(response);
            templateList(s('.table2'), s('.table-pager'), s('.sizeSelect'), function() {
                SamsonCMS_Input.update(s('body'));
            }, undefined, response);
            loader.hide();
        });
    });
});
