 // construct the url with parameter values
 var apikey = "3tj9bdaekybzr2s3yqv7h2d9";
 var baseUrl = "http://data.tmsapi.com/v1.1";
 var showtimesUrl = baseUrl + '/movies/showings';
 var zipCode = "28078";
 var d = new Date();
 var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();

 $(document).ready(function(response) {

   // send off the query
   $.ajax({
     url: showtimesUrl,
        data: {    startDate: today,
             zip: zipCode,
             jsonp: "dataHandler",
             api_key: apikey
           },            
     dataType: "jsonp",
   });
 });
 $.ajax({
   url: showtimesUrl,
   method: "GET",
  }).then(function(response) {
    console.log((JSON.stringify(response)));
    console.log(response);
  });
 // callback to handle the results
 function dataHandler(data) {
  $(document.body).append('<p>Found ' + data.length + ' movies showing within 5 miles of ' + zipCode+':</p>');
  var movies = data.hits;
  $.each(data, function(index, movie) {
    var movieData = '<div class="tile"><img src="http://developer.tmsimg.com/' + movie.preferredImage.uri + '?api_key=3tj9bdaekybzr2s3yqv7h2d9"</b>';
     movieData += movie.title;
     if (movie.ratings) { movieData += ' (' + movie.ratings[0].code + ') </div>' };
     $(document.body).append(movieData);
      
  });
  console.log(data)
};

var firebaseConfig = {
    apiKey: "AIzaSyCek-1-W6uDo5ZDEZhKMHsPTKoYzna7RLI",
    authDomain: "movie-app-project-77d4b.firebaseapp.com",
    databaseURL: "https://movie-app-project-77d4b.firebaseio.com",
    projectId: "movie-app-project-77d4b",
    storageBucket: "",
    messagingSenderId: "561592848479",
    appId: "1:561592848479:web:f9a394663f009ed7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  $("#button").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var Name = $("#employee-name-input").val().trim();
    var  = $("#role-input").val().trim();
    var  = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var empRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newEmp = {
      name: empName,
      role: empRole,
      start: empStart,
      rate: empRate
    };
  
    // Uploads employee data to the database
    database.ref().push(newEmp);
  