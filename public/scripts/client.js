/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  const createTweetElement = function(tweetObject) {
    let $tweet = `<article class="tweet">
    <header class="tweet-header"> 
    <div class="tweet-header-left"> 
    <img class="tweet-icon" src="${tweetObject.user.avatars}" alt="profile pic">
    <p class="user-name">${tweetObject.user.name}</p>
    </div>
    <p class="tweeter-handle">${tweetObject.user.handle}</p>
    </header>
    <div class="tweet-content">
    <p>${tweetObject.content.text}</p>
    </div>
    <footer class="tweet-footer">
    <output name="date-posted" class="date-posted">${tweetObject.created_at}</output>
    <img src="images/social-buttons-temp.png" alt="social-buttons">
    </footer>
    </article>`;
    return $tweet;
  }

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  }

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (result) {
    console.log("these are tweets that were got", result)
    renderTweets(result);
})};

loadTweets();

$('form').submit(function (event) {
  event.preventDefault()
  console.log("hi");
  let result = $(this).serialize()
  console.log(result, "this is the result")
  $.ajax("/tweets", result, { method: 'POST', dataType: "json"})
  .then(function () {
  console.log('Success: ', result);
  //form reset solutions from https://stackoverflow.com/questions/10633605/clear-form-values-after-submission-ajax
  $('form')[0].reset();
  //counter reset solution from https://stackoverflow.com/questions/20891451/resetting-a-jquery-input-field-character-countdown-after-the-form-has-been-submi/20891555
  $('.counter').text('140');
  });
});

});