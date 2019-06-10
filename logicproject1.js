 // construct the url with parameter values
 var apikey = "3tj9bdaekybzr2s3yqv7h2d9";
 var baseUrl = "http://data.tmsapi.com/v1.1";
 var showtimesUrl = baseUrl + '/movies/showings';
 var zipCode = "28078";
 var d = new Date();
 var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();

 /* $(document).ready(function(response) {

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
    var movieData = '<div class="tile"></b>';
     movieData += movie.title;
     if (movie.ratings) { movieData += ' (' + movie.ratings[0].code + ') </div>' };
     $(document.body).append(movieData);
      
  });
  console.log(data)
}; */

