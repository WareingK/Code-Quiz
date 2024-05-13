// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
document.addEventListener('DOMContentLoader', function () {
  const timeBlocks = document.querySelectorAll('.time-block');
  timeBlocks.forEach(function (block){
    const hour = pareseInt(block.id.split('-')[1]);
    const currentHour = new Date().getHours();


    // Getting time to adjust for background
    if (hour < currentHour) {
      block.classList.add('past');
    } else if (hour === currentHour) {
      block.classList.add('present');
    } else {
      block.classList.add('future');
    }
  });
});
$(function () {
  // Add listener for click events on the save button
  $('.saveBtn').on('click', function () {
    // Get the id of the parent time-block
    var timeBlockId = $(this).closest('.time-block').attr('id');
    // Get the user input from the textarea
    var userInput = $(this).siblings('.description').val();
    // Save the user input in local storage using the time-block id as a key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using Day.js
  var currentHour = dayjs().hour();

  // Loop through each time-block
  $('.time-block').each(function () {
    // Get the id of the time-block
    var timeBlockId = $(this).attr('id');
    // Parse the hour from the time-block id (e.g., "hour-9" => 9)
    var blockHour = parseInt(timeBlockId.split('-')[1]);
    // Add or remove classes based on the current hour
    if (blockHour < currentHour) {
      $(this).addClass('past');
    } else if (blockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  });

  // Get any user input saved in localStorage and set the values of corresponding textarea elements
  $('.time-block').each(function () {
    var timeBlockId = $(this).attr('id');
    var userInput = localStorage.getItem(timeBlockId);
    $(this).find('.description').val(userInput);
  });

  // Display the current date in the header of the page
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));
});
