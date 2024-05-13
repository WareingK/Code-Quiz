$(function () {
  // Function to create time blocks
  const createTimeBlock = (hour) => {
    // Using the AM PM format :c
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const timeLabel = `${displayHour}${ampm}`;

    const timeBlock = $('<div>').addClass('row time-block').attr('id', `hour-${hour}`);
    const hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(`${timeLabel}`);
    const textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
    const button = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html('<i class="fas fa-save" aria-hidden="true"></i>');

    timeBlock.append(hourDiv, textarea, button);
    return timeBlock;
  };

  // Function to generate time blocks
  const generateTimeBlocks = () => {
    for (let hour = 9; hour <= 17; hour++) {
      const timeBlock = createTimeBlock(hour);
      $('#time-blocks-container').append(timeBlock);
    }
  };

  // Function to set time block colors
  const setTimeBlockColors = () => {
    var currentHour = dayjs().hour();
    $('.time-block').each(function () {
      var timeBlockId = $(this).attr('id');
      var blockHour = parseInt(timeBlockId.split('-')[1]);
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  };

  // Function to save user input in local storage
  $(document).on('click', '.saveBtn', function () {
    var timeBlockId = $(this).closest('.time-block').attr('id');
    var userInput = $(this).siblings('.description').val();
    console.log(timeBlockId);
    localStorage.setItem(timeBlockId, userInput);
  });

  // Initialize the scheduler
  const initializeScheduler = () => {
    generateTimeBlocks();
    setTimeBlockColors();
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));
  };

  // Call the initializeScheduler function when the DOM content is loaded
  initializeScheduler();
});

$(document).ready(function () {
  $('.time-block').each(function () {
    const hour = parseInt($(this).attr('id').split('-')[1]);
    const currentHour = new Date().getHours();
    if (hour < currentHour) {
      $(this).addClass('past');
    } else if (hour === currentHour) {
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

