$(document).ready(function() {
    $("#sumForm").submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        var num1 = parseFloat($("#num1").val());
        var num2 = parseFloat($("#num2").val());
        var sum = num1 + num2;
        $("#result").val(sum);
    });
});