$(document).ready(function() {
    function changeImage() {
        var imageSrc = $(this).attr('src');
        $('#enlarged-image').attr('src', imageSrc);
    }

    $('.thumbnail').on('click', changeImage);
    $('.thumbnail').on('mouseenter', changeImage);
});
