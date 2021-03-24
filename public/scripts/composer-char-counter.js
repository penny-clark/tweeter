

$(document).ready(function() {
  // --- our code goes here ---


  $("#tweet-text").on('keyup', onKeyUp); 

});

//TO DO: access counter class with traversal instead of directly
const onKeyUp = function () {
  let charLimitCount;
  const charLength = $(this).val().length;
  const maxChar = 140
  charLimitCount = maxChar - charLength;
  if (charLimitCount < 0) {
    $('.counter').addClass('overcount');
  }
  if (charLimitCount > 0) {
    $('.counter').removeClass('overcount');
  }
  $('.counter').text(charLimitCount);
};

