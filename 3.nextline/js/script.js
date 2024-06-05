$(document).ready(function() {
    function moveToNextInput(currentInput, nextInput) {
        $(currentInput).keypress(function(event) {
            if (event.which === 13) { // Enter key pressed
                event.preventDefault(); // Prevent form submission
                $(nextInput).focus(); // Move focus to next input field
            }
        });
    }

    moveToNextInput('#subject1', '#subject2');
    moveToNextInput('#subject2', '#subject3');
    moveToNextInput('#subject3', '#submitButton');


$('#submitButton').click(function() {
    if(!$('#subject1').val() || !$('#subject2').val() || !$('#subject3').val()){
        alert("Please fill all the fields");
    }else{
            alert("submitted");
        }
   
    $('#subject1').val('');
    $('#subject2').val('');
    $('#subject3').val('');
    $('#subject1').focus();
});


});