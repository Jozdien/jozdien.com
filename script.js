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


let options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

function aboutAnim(entries, observer)
{
  entries.forEach(entry => {
    if(entry.intersectionRatio > 0) {
    	entry.target.style.animation = 'about 0.5s ease-in-out 0.3s forwards';
    }
  });
}

function titleLineAnim(entries, observer)
{
  entries.forEach(entry => {
    if(entry.intersectionRatio > 0) {
    	entry.target.style.animation = 'title-line 1s ease-in-out 1s forwards';
    }
  });
}

function titleHeadAnim(entries, observer)
{
  entries.forEach(entry => {
    if(entry.intersectionRatio > 0) {
    	entry.target.style.animation = 'title-head 1s ease-in-out 0.3s forwards';
    }
  });
}

function titleUnderlineAnim(entries, observer)
{
  entries.forEach(entry => {
    if(entry.intersectionRatio > 0) {
    	entry.target.style.animation = 'title-underline 1s ease-in-out 0.3s forwards';
    }
  });
}

function workAnim(entries, observer)
{
  entries.forEach(entry => {
    if(entry.intersectionRatio > 0) {
    	entry.target.style.animation = 'work 0.5s ease-in-out forwards';
    }
  });
}

function historyAnim(entries, observer)
{
  entries.forEach(entry => {
    if(entry.intersectionRatio > 0) {
    	entry.target.style.animation = 'history 0.5s ease-in-out forwards';
    }
  });
}

let observerAbout = new IntersectionObserver(aboutAnim, options);
let observerTitleLine = new IntersectionObserver(titleLineAnim, options);
let observerTitleHead = new IntersectionObserver(titleHeadAnim, options);
let observerTitleUnderline = new IntersectionObserver(titleUnderlineAnim, options);
let observerWork = new IntersectionObserver(workAnim, options);
let observerHistory = new IntersectionObserver(historyAnim, options);

const abouts = document.querySelectorAll('.about-anim');
abouts.forEach(about => observerAbout.observe(about));

const titleLines = document.querySelectorAll('.title-line-anim');
titleLines.forEach(line => observerTitleLine.observe(line));

const titleHeads = document.querySelectorAll('.title-head-anim');
titleHeads.forEach(head => observerTitleHead.observe(head));

const titleUnderlines = document.querySelectorAll('.title-underline-anim');
titleUnderlines.forEach(line => observerTitleUnderline.observe(line));

const works = document.querySelectorAll('.work-anim');
works.forEach(work => observerWork.observe(work));

const histories = document.querySelectorAll('.history-anim');
histories.forEach(history => observerHistory.observe(history));