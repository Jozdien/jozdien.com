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