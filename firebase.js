var firebaseConfig = {
  apiKey: "AIzaSyCIoIdsgDawxLNp_XSPyhyr_XqMqD5w3EI",
  authDomain: "jozdien-com.firebaseapp.com",
  projectId: "jozdien-com",
  storageBucket: "jozdien-com.appspot.com",
  messagingSenderId: "624356074669",
  appId: "1:624356074669:web:dbc26addd4ab5a80d49224"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var firebaseAbout = database.ref('about-description');
firebaseAbout.once('value').then((snapshot) => {
	document.getElementById("about-description").innerHTML = snapshot.val();
});

var firebaseWork = database.ref('Work');
firebaseWork.once('value').then((snapshot) => {
	snapshot.forEach(function(item) {
		item.forEach(function(property) {
			var name = property.key;
			if(name != 'work-1-background' && name != 'work-2-background' && name != 'work-3-background' && name != 'work-4-background' && name != 'work-5-background' && name != 'work-6-background')
			{
				var items = document.querySelectorAll("#"+name);
				items.forEach(item => {
					item.innerHTML = property.val();
				});
			}
			else
			{
				document.getElementById(name).style.background = "linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8)), url("+property.val()+")";
				document.getElementById(name).style.backgroundPosition = "center";
				document.getElementById(name).style.backgroundRepeat = "no-repeat";
				document.getElementById(name).style.backgroundSize = "cover";
			}
		})
	})
});

var firebaseHistory = database.ref('History');
firebaseHistory.once('value').then((snapshot) => {
	snapshot.forEach(function(section) {
		section.forEach(function(item) {
			item.forEach(function(property) {
				var name = property.key;
				var items = document.querySelectorAll("#"+name);
				items.forEach(item => {
					item.innerHTML = property.val();
				})
			})
		})
	})
});

var firebaseArt = database.ref('Art');
firebaseArt.once('value').then((snapshot) => {
	snapshot.forEach(function(property) {
		var div = document.querySelector("#art-items");
		var str = "<div class=\"col-lg-2 col-md-3 col-sm-4 col-6 art-item-container art-anim\"><div onclick=\"window.open('" + property.val() + "','mywindow');\" class=\"art-item-image\" style=\"background: url('" + property.val() + 
							"'); background-position: center; background-repeat: no-repeat; background-size: cover;\"></div></div>"
		div.innerHTML += str;
	})
});

var firebaseBlog = database.ref('Blog');
firebaseBlog.once('value').then((snapshot) => {
	snapshot.forEach(function(section) {
		if(section.key == "recommended") {
			var div = document.querySelector('.blog-recommended-items')
			section.forEach(function(item) {
				var title = "";
				var image = "";
				var url = "";
				item.forEach(function(property) {
					if(property.key == "title")	{
						title = property.val();
					}
					else if (property.key == "image") {
						image = property.val();
					}
					else {
						url = property.val();
					}
				})
				var str = "<a href=\"" + url + 
									"\" class=\"blog-recommended-item-container blog-anim\"><div class=\"blog-item-image-container\"><div class=\"blog-item-image\" style=\"background: url('" + image + 
									"'); background-position: center; background-repeat: no-repeat; background-size: cover;\"></div></div><div class=\"blog-recommended-item-text\">" + title + 
									"</div></a>"
				div.innerHTML += str;
			})
		}
		else if(section.key == "posts") {
			var div = document.querySelector('.blog-post-items')
			section.forEach(function(item) {
				var title = "";
				var date = "";
				var words = "";
				var url = "";
				item.forEach(function(property) {
					if(property.key == "title")	{
						title = property.val();
					}
					else if (property.key == "date") {
						date = property.val();
					}
					else if (property.key == "words") {
						words = property.val();
					}
					else {
						url = property.val();
					}
				})
				var str = "<div class=\"blog-item-container blog-anim\"><a href=\"" + url + 
									"\" class=\"blog-item-text\">" + title + 
									"</a><div class=\"blog-item-details\">" + date + 
									" &#183; Words: " + words + 
									"</div></div><div class=\"blog-divider blog-anim\"></div>";
				div.innerHTML += str;
			})
		}
		else if(section.key == "fiction") {
			var div = document.querySelector('.blog-fiction-items')
			section.forEach(function(item) {
				var title = "";
				var date = "";
				var words = "";
				var url = "";
				item.forEach(function(property) {
					if(property.key == "title")	{
						title = property.val();
					}
					else if (property.key == "date") {
						date = property.val();
					}
					else if (property.key == "words") {
						words = property.val();
					}
					else {
						url = property.val();
					}
				})
				var str = "<div class=\"blog-item-container blog-anim\"><a href=\"" + url + 
									"\" class=\"blog-item-text\">" + title + 
									"</a><div class=\"blog-item-details\">" + date + 
									" &#183; Words: " + words + 
									"</div></div><div class=\"blog-divider blog-anim\"></div>";
				div.innerHTML += str;
			})
		}
	})
});