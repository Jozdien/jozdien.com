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
	document.getElementById("about-description").innerHTML = snapshot.val().replaceAll("_n", "<br><br>");
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
				document.getElementById(name).style.background = "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url("+property.val()+")";
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
				var items=document.querySelectorAll("#"+name);
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
		var name = property.key;
		var items=document.querySelectorAll("#"+name);
		items.forEach(item => {
			item.innerHTML = property.val();
		})
	})
});