

$(document).ready(function() {
  // --- our code goes here ---


  $("#tweet-text").on('keyup', onKeyUp); 

});

const onKeyUp = function () {
  let charLimitCount;
  const charLength = $(this).val().length;
  const maxChar = 140
  charLimitCount = maxChar - charLength;
  const counter = $(this).closest(".new-tweet").find(".counter")
  if (charLimitCount < 0) {
    $(counter).addClass('overcount');
  }
  if (charLimitCount > 0) {
    $(counter).removeClass('overcount');
  }
  $(counter).text(charLimitCount);
};

