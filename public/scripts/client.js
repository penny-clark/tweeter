/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

//HELPER FUNCTIONS

//This function escapes unsafe characters before posting the tweet
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//sets "days passed" text for createTweetElement

  const daysPassed = function(timeCreated) {
    const dateCreated = new Date(timeCreated);
    const currentDay = new Date();
    const timePassedInDays = Math.floor(((currentDay - dateCreated) / 86400000));
    if (timePassedInDays < 1) {
      return `Today`;
    }
    if (timePassedInDays === 1) {
      return `1 day ago`;
    }
    return `${timePassedInDays} days ago`;
  };

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
      <p>${escape(tweetObject.content.text)}</p>
    </div>
    <footer class="tweet-footer">
    <output name="date-posted" class="date-posted">${daysPassed(tweetObject.created_at)}</output>
    <img class="social-buttons" src="images/social-buttons-temp.png" alt="social-buttons">
    </footer>
    </article>`;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    $('.tweet-container').empty();
    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    })
  };
  
  loadTweets();

  $('form').submit(function(event) {
    event.preventDefault();
    let tweetText = $(this).serialize();
    let textLength = $('#tweet-text').val().length
      if (textLength > 140) {
        //help with getting the animation to work: https://stackoverflow.com/questions/24969024/jquery-slidedown-on-newly-appended-div
        return $('.error-container').empty().append("Error: Your tweet is over the character limit").hide().addClass('error-visible').slideDown()
      }
      if (textLength < 1) {
        return $('.error-container').empty().append("Error: Please enter some text").hide().addClass('error-visible').slideDown();
      }
      $.ajax( "/tweets", {data: tweetText, method: 'POST'})
      .then(function(tweetText) {
        $('.error-container').removeClass('error-visible').empty();
        console.log('Success: ', tweetText);
        loadTweets()
        //form reset solutions from https://stackoverflow.com/questions/10633605/clear-form-values-after-submission-ajax
        $('form')[0].reset();
        //counter reset solution from https://stackoverflow.com/questions/20891451/resetting-a-jquery-input-field-character-countdown-after-the-form-has-been-submi/20891555
        $('.counter').text('140');
    });
  });
});