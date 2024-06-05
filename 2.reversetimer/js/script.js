$(document).ready(function() {
  var timer;
  var timeRemaining;

  function startTimer() {
      timer = setInterval(function() {
          timeRemaining--;
          displayTime(timeRemaining);
          if (timeRemaining <= 0) {
              clearInterval(timer);
              alert("Time's up!");
          }
      }, 1000);
  }

  function displayTime(seconds) {
      var hours = Math.floor(seconds / 3600);
      var minutes = Math.floor((seconds % 3600) / 60);
      var secs = seconds % 60;
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (secs < 10) secs = "0" + secs;
      $('#timer').text(hours + ":" + minutes + ":" + secs);
  }

  $('#startButton').click(function() {
      clearInterval(timer); // Clear any existing timers

      // Get user input
      var hours = parseInt($('#hours').val()) || 0;
      var minutes = parseInt($('#minutes').val()) || 0;
      var seconds = parseInt($('#seconds').val()) || 0;

      // Calculate total duration in seconds
      timeRemaining = (hours * 3600) + (minutes * 60) + seconds;

      displayTime(timeRemaining); // Display the initial time
      startTimer(); // Start the timer
  });

  $('#clearButton').click(function() {
      clearInterval(timer); // Clear any existing timers
      $('#hours').val(''); // Clear hours input field
      $('#minutes').val(''); // Clear minutes input field
      $('#seconds').val(''); // Clear seconds input field
      $('#timer').text('00:00:00'); // Reset timer display
  });
});
