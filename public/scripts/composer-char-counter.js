$(document).ready(function() {
  
  $('#tweet-text').on('keypress',function() {
    let numberOfPresses = $(this).val(); 
    let num = 0;
    num = 140 - numberOfPresses.length
   
    const $counter = 
    $(this).closest('form').find('.counter');

    $counter.val(num)

    if (num <0) {
      $counter.css('color','red')
    } else if (num >0) {
      $counter.css('color','black')
    }

  });

});