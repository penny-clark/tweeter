

$(document).ready(function() {
  // --- our code goes here ---


  $("#tweet-text").on('input', function () {
    const charLength = $(this).val().length;
    const maxChar = 140
    console.log(maxChar-charLength);
  })

});

// const countingChars = function() {
//   const charLength = $(this).val().length;
//   const maxChar = 140
//   console.log(maxChar-charLength);
// }