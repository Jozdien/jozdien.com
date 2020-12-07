var firebaseConfig = {
  apiKey: "AIzaSyCIoIdsgDawxLNp_XSPyhyr_XqMqD5w3EI",
  authDomain: "jozdien-com.firebaseapp.com",
  projectId: "jozdien-com",
  storageBucket: "jozdien-com.appspot.com",
  messagingSenderId: "624356074669",
  appId: "1:624356074669:web:dbc26addd4ab5a80d49224"
};

firebase.initializeApp(firebaseConfig);

var firebaseAbout = firebase.database().ref('about-description');
firebaseAbout.once('value').then((snapshot) => {
	document.getElementById("about-description").innerHTML = snapshot.val().replaceAll("_n", "<br><br>");
});