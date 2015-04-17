/**
 * Created by egorov on 17.04.2015.
 */
// TODO: Try to remove this when CSS will support it
s('.template-form-input').pageInit(function(blocks){
    var inputs = s('.template-form-input-field', blocks);
    // Bind blur event
    inputs.blur(function(input){
        var parent = input.parent();
        // If input is empty - add special class
        if(input.val().length == 0) {
            parent.removeClass('filled');
        } else { // Otherwise remove it
            parent.addClass('filled');
        }
    });
});