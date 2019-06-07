// =========================================================
//                  Movie Web Application
// =========================================================

$( document ).ready(function() {
    alert("Yo! Testing the JavaScript");


// Pull current movies from database and display to HTML
//

// Grab values from "movie search text-box"
var movieSearch = $("#search_movies_input").val().trim();

// Grab values from "location text-box"
var movieLocation = $("#search_location_input").val().trim();
// Grab values from "ratings text-box"
// Display movies based on above parameters
$("#submit_button").on("click", function(){
    console.log(movieSearch, movieLocation);
    $("#main_content").text(movieSearch, movieLocation);
});

/* when user selects a movie, display movie data:
    - Film poster
    - MPAA film rating
    - Brief description
    - Runtime
    - User ratings and reviews
*/


// Display seating chart with available seating
// user can select a seat by clicking on one that is available

/* After seat selection, display purchase form:
    - Name
    - eMail
    - Payment info

    Submit button
*/

// On submit button press, display thank you screen

});