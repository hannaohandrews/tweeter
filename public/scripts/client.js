// jQuery detects that the document is ready 
// codes will only run once the page Document Object Model (DDM) is ready for JS codes to execude 
$(document).ready(function () {

  const maxNumber = 140;

  const tweetData = [{
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  // To prevent from hackers to manipulate code
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  // inserts tweet with data input from users
  const createTweetElement = function (data) {
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
        ${escape(data.content.text)} 
        </p>        
      <footer class="article-footer">
        <div class="article-div-footer">
          <p> ${data.created_at} </p>
          <div class="article-div-footer-icons">
            <p class ="article-flag"> &#129412; </p> 
            <p class ="article-retweet"> &#128257; </p> 
            <p class="article-heart"> &#128155; </p>
          </div>
        </div>  
      </footer>
  </article>`

    return $(string);
  }

  // accessing objects inside the arrays 
  // prepend makes it insert the latest tweet
  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  }
  renderTweets(tweetData);

  // redAlert = too long 
  // blueAlert = too short
  $('#tweet-form').submit(function (event) {

    // prevents the event from happening until called
    event.preventDefault();

    // use # for id , use . for class
    if ($('#tweet-text').val().length > maxNumber) {
      $('.redAlert').slideDown(1000);
      $('.blueAlert').slideUp(1000);
    } else if ($('#tweet-text').val().length === 0) {
      $('.blueAlert').slideDown(1000);
      $('.redAlert').slideUp(1000);
    } else {
      // ajax = asynchronous HTTP requests 
      $.ajax({
          url: '/tweets/',
          method: "POST",
          data: $(this).serialize()
        })

        .then(function (respose) {
          $('.redAlert').slideUp(1000);
          $('.blueAlert').slideUp(1000);
          loadTweets(respose);
        })

    }

    $('#tweet-text').val('');
    $('.counter').val(maxNumber);

  });

  // load the tweets once it is ready
  const loadTweets = function () {
    $.ajax({
        url: '/tweets/',
        method: 'GET'
      })
      .then(function (response) {
        $("#tweets-container").empty();
        renderTweets(response)
      })
      .catch((err) => {
        alert('ERROR. Please try again')
      })
  };


  $('#tweet-text').val('');
  $('.counter').val(maxNumber);

});