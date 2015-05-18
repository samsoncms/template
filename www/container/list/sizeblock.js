/**
 * Created by onysko on 18.05.2015.
 */

s('.sizeSelect').pageInit(function (select) {
    select.change(function() {
        var href = select.a('data-href') + select.val();
        var loader = new Loader(s('.table2'));
        loader.show('', true);
        s.ajax(href, function(response) {
            response = JSON.parse(response);
            if (response.collection_html) s('#content').html(response.collection_html);
            if (response.collection_pager) s('.table-pager').html(response.collection_pager);
            templateList(s('.table2'), s('.table-pager'), function() {
                SamsonCMS_Input.update(s('body'));
            });
            loader.hide();
        });
    });
});
