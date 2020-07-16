$(document).ready(function () {

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  const createTweetElement = function(data) {
    const string = 
    `<article class="article-article">
      <header class="article-header">
        <div class="article-div-header">
          <img class="article-image" src="${data.user.avatars}"> 
          <p class="article-name">${data.user.name} </p>
        </div>
        <p class="article-username">${data.user.handle} </p> 
      </header>
        <p class="article-body">
        ${data.content.text} 
        </p>        
      <footer class="article-footer">
        <div class="article-div-footer">
          <p> ${data.created_at} </p>
          <div class="article-div-footer-icons">
            <p class ="article-flag"> Flag </p> 
            <p class ="article-retweet"> Retweet </p> 
            <p class="article-heart"> Heart </p>
          </div>
        </div>  
      </footer>
  </article>`

  return $(string);
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet); 
    }
  }
  renderTweets(tweetData);
    
  
  $('#tweet-form').submit(function(event){
    event.preventDefault();
    $.ajax({
      url: '/tweets/',
      method: "POST",
      data: $(this).serialize()
    })
    .then(function(respose){
      console.log('done');
      loadTweets(respose);
    })
  });
  
  const loadTweets = function () {
    $.ajax({
      url: '/tweets/',
      method: 'GET'
    })
    .then(function(response){
      $("#tweets-container").empty();
      renderTweets(response)
    })
    .catch((err) => {
      console.log('ERROR')
    })
  };


});
