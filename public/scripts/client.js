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
    console.log(tweets)
    $('.tweet-container').empty();
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  }

const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweets) {
    renderTweets(tweets);
  })};
  loadTweets();

 
    $('form').submit(function (event) {
      event.preventDefault()
      let tweetText = $(this).serialize();
      console.log(tweetText.length, "tweet text length")
      console.log(tweetText)
      if (tweetText.length > 145) return alert("too long");
      if (tweetText.length < 6) return alert("too short");
      $.ajax( "/tweets", {data: tweetText, method: 'POST'})
      .then(function (tweetText) {
        console.log('Success: ', tweetText);
        loadTweets()
        $('form')[0].reset();
        $('.counter').text('140');
      });
    });
});