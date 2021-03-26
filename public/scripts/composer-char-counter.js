//onKeyUp is the callback function
const onKeyUp = function () {
  const charLength = $(this).val().length;
  const maxChar = 140;
  let charLimitCount = maxChar - charLength;
  const counter = $(this).closest(".new-tweet").find(".counter");
  if (charLimitCount < 0) {
    $(counter).addClass('overcount');
  }
  if (charLimitCount > 0) {
    $(counter).removeClass('overcount');
  }
  $(counter).text(charLimitCount);
};

$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('keyup', onKeyUp);
});