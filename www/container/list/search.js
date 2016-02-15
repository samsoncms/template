/**
 * Created by egorov on 23.04.2015.
 */

/**
 * Changed by myslyvyi 12.01.2016.
 * */

/**
 * Asynchronous material search
 * @param search Search query
 */
var sjsSearch = {

    search: function (params, beforeHandler, afterHandler, searchFrom) {

        // Page number
        var page = 1;
        // Variable to store timeout value
        var searchTimeout;
        // Stores current input
        var searchField = this;
        // Stores previous search string
        var prevKeywords = 0;
        // Limits search symbols
        var symbolsNumber = searchFrom === undefined ? 3 : searchFrom;
        // Previous search response
        var prevResponse = false;

        // If enter key was pressed ignore it
        searchField.keydown(function(obj, p, e){
            if (e.which == 13) {
                e.preventDefault();
            }
        });

        // Key up handler
        searchField.keyup(function (obj) {

            // Get search string
            var keywords = obj.val();

            // If last response return empty and current symbols length > previous symbols length (with success response) then not update result
            if (prevResponse && keywords.length >= prevKeywords.length) {
                return false;
            }

            // If we have not send any search request and search string differs from previous and there is enough letters
            if (
                prevKeywords !== keywords &&
                (keywords.length < symbolsNumber || keywords.length >= symbolsNumber)
            ) {

                // Reset timeout on key press
                if (searchTimeout != undefined) clearTimeout(searchTimeout);

                // Set delayed function
                searchTimeout = window.setTimeout(function () {

                    if (prevKeywords < symbolsNumber && keywords.length < symbolsNumber) {
                        return false;
                    }

                    //Set keywords empty if keywords length < minimal length symbols
                    if (keywords.length < symbolsNumber) {
                        keywords = '';
                    }

                    //Disable input
                    searchField.a('disabled', 'disabled');

                    var url = searchField.a('controller');
                    if (url[url.length - 1] !== '/') {
                        url += '/';
                    }
                    if (params) {
                        for (var i = 0; i < params.length; i++) {
                            url += params[i] + '/';
                        }
                    }
                    url += keywords + '/' + page;

                    if (beforeHandler) {
                        beforeHandler();
                    }

                    // Perform async request to server for rendering table
                    s.ajax(url, function (response) {

                        searchField.a('disabled', '');
                        searchField.focus();

                        // Store current search string as previous
                        prevKeywords = keywords;

                        // Call external handler
                        if (afterHandler) {
                            afterHandler(response);
                        }

                        var resp = JSON.parse(response);

                        // Check response by empty
                        if (resp["collection_html"].indexOf('notfound') == -1) {
                            //Write status last response
                            prevResponse = false;
                        } else {
                            //Write status last response
                            prevResponse = true;
                        }
                    });
                }, 1000);
            }
        });
    }
};

SamsonJS.extend(sjsSearch);