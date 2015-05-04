/**
 * Created by egorov on 10.04.2015.
 */

/**
 *
 * @param table DOM table element
 * @param pager
 * @param asyncCompleteHandler External handler after async table rendering
 * @constructor
 */
function templateList(table, pager, asyncCompleteHandler) {

    var completeHandler = asyncCompleteHandler !== undefined ? asyncCompleteHandler : false;

    /** Event: Publish/unpublish material */
    function publish(obj) {
        // ������� �������������
        if (confirm(obj.a('title'))) {
            // Perform ajax request and update JS on success
            s.ajax(s('a.publish_href', obj.parent()).a('href'), init, FormData, function() {
                loader.hide();
            }, function() {
                // Create generic loader
                var loader = new Loader(table);

                // Show loader with i18n text and black bg
                loader.show('', true);
                return true;
            });
        }
    }

    /** Event: Remove material */
    function remove(obj) {
        if (confirm(obj.a('title'))) {
            s.ajax(obj.a('href'), init, FormData, function() {
                loader.hide();
            }, function() {
                // Create generic loader
                var loader = new Loader(table);

                // Show loader with i18n text and black bg
                loader.show('', true);
                return true;
            });
        }
    }

    /** Event: Copy material */
    function copy(obj) {
        if (confirm(obj.a('title'))) s.ajax(obj.a('href'), init);
    }

    function init(serverResponse) {
        // If we have response from server
        if (serverResponse) try {
            // Parse JSON response
            serverResponse = JSON.parse(serverResponse);
        } catch (e) {

        }

        try {

            // TODO: Remove when material app will be updated
            if (serverResponse.table_html) table.html(serverResponse.table_html);
            if (serverResponse.table_pager) pager.html(serverResponse.table_pager);

            // If we have collection html - update it
            if (serverResponse.collection_html) table.html(serverResponse.collection_html);
            if (serverResponse.collection_pager) pager.html(serverResponse.collection_pager);
        } catch (e) {

        }

        if (completeHandler) {
            completeHandler(table, pager);
        }

        // If we have successful event response or no response at all(first init)
        if (!serverResponse || (serverResponse && serverResponse.status)) {
            // Add fixed header to materials table
            table.fixedHeader('.table2-header-row', '.table2-body');

            // Bind publish event
            s('input#published', table).click(publish, true, true);

            // Bind remove event
            s('a.delete', table).click(remove, true, true);

            s('a.edit', table).tinyboxAjax({
                html : 'html',
                renderedHandler : function(respTxt, tb) {
                    s('.cms_table_form').ajaxSubmit(function(response){
                        tb._close();
                        init(serverResponse);
                    })
                }
            });

            s('.collection-sort-link', table).each(function(link){
                var currentHREF = link.a('href');
                currentHREF += '?' + link.a('name-attr') + '=' + link.a('dest-attr');
                link.a('href', currentHREF);
                link.ajaxClick(function(response) {
                    loader.hide();
                    init(response);
                }, function(){
                    // Create generic loader
                    var loader = new Loader(table);

                    // Show loader with i18n text and black bg
                    loader.show('', true);
                    return true;
                });
            });

            s('a', pager).each(function(obj) {
                obj.ajaxClick(function(response) {
                    loader.hide();
                    init(response);
                }, function(){
                    // Create generic loader
                    var loader = new Loader(table);

                    // Show loader with i18n text and black bg
                    loader.show('', true);
                    return true;
                });
            });
        }
    }



    // Cache search field
    //var searchField = s();

    var cmsnav = '0'; //s('#cmsnav_id').val();
    if (s('#cmsnav_id').val().length) {
        cmsnav = s('#cmsnav_id').val();
    }

    // Init table live search
    s('input#search').search(new Array(cmsnav), function(){
        // Create generic loader
        var loader = new Loader(table);
        // Show loader with i18n text and black bg
        loader.show(s('.loader-text').val(), true);
    }, function(response){
        loader.hide();
        init(response);
    });


    // Table view switching
    var switchToTable = s('.icon2-table');
    var switchToBlocks = s('.icon2-th');
    switchToTable.click(function(){
        // Add fixed header to materials table
        table.fixedHeader('.table2-header-row', '.table2-body');
        switchToTable.hide();
        switchToBlocks.show();
        table.removeClass(switchToBlocks.a('tableclass'));
        table.addClass(switchToTable.a('tableclass'));
    });

    switchToBlocks.click(function(){
        s('.__fixedHeaderClone ').remove();
        switchToBlocks.hide();
        switchToTable.show();
        table.removeClass(switchToTable.a('tableclass'));
        table.addClass(switchToBlocks.a('tableclass'));
    });

    // Init table
    init();
}

// Bind list logic
s('.table2').pageInit(function(table){
    templateList(table, s('.table-pager'));
});
