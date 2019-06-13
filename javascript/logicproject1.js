var firebaseConfig = {
   apiKey: "AIzaSyAW9puCi8ZzAJF33WPf1DvmqdUcnaN1cU4",
   authDomain: "movietimes-53a5e.firebaseapp.com",
   databaseURL: "https://movietimes-53a5e.firebaseio.com",
   projectId: "movietimes-53a5e",
   storageBucket: "movietimes-53a5e.appspot.com",
   messagingSenderId: "184157978060",
   appId: "1:184157978060:web:fdcb878790cb92f3"
 };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   
   var database = firebase.database();
  
   $("#payment-submit").on("click", function(event) {
    event.preventDefault();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var zipCode = $("#zipCode").val();
    var cardNumber = $("#cardNumber").val();
    var expirationDate = $("#expirationDate").val();
    var securityCode = $("#securityCode").val();
   
   var newCustomer = {
    firstName: firstName,
    lastName: lastName,
    zipCode: zipCode,
    cardNumber: cardNumber,
    expirationDate: expirationDate,
    securityCode: securityCode,
   };
   database.ref().push(newCustomer);
   console.log(newCustomer);

   $("#firstName").val("");
   $("#lastName").val("");
   $("#zipCode").val("");
   $("#cardNumber").val("");
   $("#expirationDate").val("");
   $("#securityCode").val("");
   });