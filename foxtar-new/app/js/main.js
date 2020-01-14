$(function(){
 $('.menu__btn').click(function(){
  $('.menu ul').slideToggle();
});
 
 $(".js-range-slider").ionRangeSlider({
  type: "double",
  min: 0,
  max: 1000,
  from: 0,
  to: 600,
  prefix: "$",
  skin: "round"
});

 $('input, select').styler();

 var mixer = mixitup('.mixitup__items');

 $('.mixitup__pagination__item').click(function(a){
  a.preventDefault()
});

});