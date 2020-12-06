function splash(param) {
	var time = param;
	setTimeout(function () {
	  $('#splashscreen').fadeOut(time);
	  var ab = document.getElementById("about");
	  var w = document.getElementById("work");
	  var ar = document.getElementById("art");
	  var h = document.getElementById("history");
	  var b = document.getElementById("blog");
	  var m = document.getElementById("more");
	  ab.style.display = "block";
	  w.style.display = "block";
	  ar.style.display = "block";
	  h.style.display = "block";
	  b.style.display = "block";
	  m.style.display = "block";
	}, time);
}

$(function () {
	'use strict'
	$("[data-trigger]").on("click", function(){
    var trigger_id =  $(this).attr('data-trigger');
    $(trigger_id).toggleClass("show");
    $('body').toggleClass("offcanvas-active");
    var name = document.getElementById("landing-name-container");
    name.style.visibility = "hidden";
   });

    // close if press ESC button 
  $(document).on('keydown', function(event) {
    if(event.keyCode === 27) {
      $(".navbar-collapse").removeClass("show");
      $("body").removeClass("overlay-active");
      var name = document.getElementById("landing-name-container");
    	name.style.visibility = "visible";
    }
  });

    // close button 
  $(".btn-close").click(function(e){
    $(".navbar-collapse").removeClass("show");
    $("body").removeClass("offcanvas-active");
    var name = document.getElementById("landing-name-container");
    name.style.visibility = "visible";
  });

  $(".nav-link").click(function(e){
  	$(".navbar-collapse").removeClass("show");
    $("body").removeClass("offcanvas-active");
    var name = document.getElementById("landing-name-container");
    name.style.visibility = "visible";
  });
})