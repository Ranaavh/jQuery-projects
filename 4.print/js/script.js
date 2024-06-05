$('#printButton').click(function() {
    var printContent = $('#section').html(); // Select the element with class 'printable'
    var originalContent = $('body').html(); // Save the original content of the body
    $('body').html(printContent); // Replace the body content with the content of the printable div
    window.print(); // Print the page
    $('body').html(originalContent); // Restore the original content
});
