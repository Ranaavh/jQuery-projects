

// script.js
$(window).on('load', function() {
    $('#loader').fadeOut(2000, function() {
        $('#content').fadeIn(1500);
    });
});
