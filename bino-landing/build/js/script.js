$(document).ready(function () {

	$('.recent__links').on('click', 'a', function(e){
    	e.preventDefault()
    });

	var mixer = mixitup('.recent__block');

	$('.slider .owl-carousel').owlCarousel({
		loop: true,
		margin: 0,
		nav: true,
		dots: false,
		navText: [],
		responsive: {
		0: {
			items: 1,
			dots: true,
			nav: false
		},
		561: {
			items:1
			}
		}
	})

	$('.service .owl-carousel').owlCarousel({
		loop: true,
		items:1,
		margin: 20,
		nav: false,
		dots: true,
		navText: [],
	  })

	$('.ideas .owl-carousel').owlCarousel({
		loop: true,
		items:1,
		margin: 20,
		nav: false,
		dots: true,
		navText: [],
	})

	$(".menu, .arrow-up, .section-wrap__icon").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),
		//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		 //анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});

  })