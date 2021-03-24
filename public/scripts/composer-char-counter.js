

$(document).ready(function() {
  // --- our code goes here ---


  $("#tweet-text").on('keyup', onKeyUp); 

});

const onKeyUp = function () {
  const charLength = $(this).val().length;
  const maxChar = 140
  console.log(maxChar-charLength); 
};

const countingChars = function() {
  const charLength = $(this).length;
  const maxChar = 140
  console.log(maxChar-charLength);
}