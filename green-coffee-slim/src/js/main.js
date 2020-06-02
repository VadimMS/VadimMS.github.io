function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id[0]);
  var clock2 = document.getElementById(id[1]);
  var daysSpan = clock.querySelector('#days');
  var daysSpan2 = clock2.querySelector('#days2');
  var hoursSpan = clock.querySelector('#hours');
  var hoursSpan2 = clock2.querySelector('#hours2');
  var minutesSpan = clock.querySelector('#minutes');
  var minutesSpan2 = clock2.querySelector('#minutes2');
  var secondsSpan = clock.querySelector('#seconds');
  var secondsSpan2 = clock2.querySelector('#seconds2');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    daysSpan2.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    hoursSpan2.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    minutesSpan2.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    secondsSpan2.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = Math.floor(new Date());

if (localStorage.getItem('deadtime') < deadline || localStorage.getItem('clock_end_time') === null) {

  var clock_end_time = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  localStorage.setItem('deadtime', (deadline + (15 * 24 * 60 * 60 * 1000)));
  localStorage.setItem('clock_end_time', clock_end_time);
  initializeClock(['countdown', 'countdown2'], clock_end_time);

} else initializeClock(['countdown', 'countdown2'], localStorage.getItem('clock_end_time'));


$(function () {
  $(".slider-services__buy, .diet__wrapper").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 1500);
  });

  $('.slider-services__wrapper').slick({
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    	responsive: [
    	{
    	breakpoint: 1025,
    	settings: {
        infinite: true,
        draggable: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      }
       },
       {
        breakpoint: 768,
        settings: {
          vertical: true,
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          verticalSwiping: true,
        }
       }
     ]
  });
})

$('.slider-customer__inner').slick({
  prevArrow:  '<button type="button" class="slick-btn slick-prev"></button>',
  nextArrow:  '<button type="button" class="slick-btn slick-next"></button>',
  arrows: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  responsive: [
    {
    breakpoint: 1025,
    settings: {
      arrows: true,
      dots: true,
      infinite: true,
      draggable: true,
      slidesToShow: 1,
    }
     },
     {
      breakpoint: 768,
      settings: {
        arrows: false,
        infinite: true,
        draggable: true,
        slidesToShow: 1,
      }
       }
   ]
});



AOS.init();


$(document).mouseleave(function(e){
  if (e.clientY < 0) {
      $(".exitblock").fadeIn("fast");
  }    
});
$(document).click(function(e) {
  if (($(".exitblock").is(':visible')) && (!$(e.target).closest(".exitblock .modaltext").length)) {
      $(".exitblock").remove();
  }
});
$('.closeblock').on('click', function() {
  $(".exitblock").remove();
})