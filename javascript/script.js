// =========================================================
//                  Movie Web Application
// =========================================================

$( document ).ready(function() {
    alert("Yo! Testing the JavaScript");


    // Grab values from "movie search text-box"
    var movieSearch = $("#search_movies_input");

    // Grab values from "location text-box"
    var movieLocation = $("#search_location_input");
    
    // Grab values from "ratings dropdown-box"

    // Movie submit button function
    $("#submit_button").on("click", function(){
        var movieValue = movieSearch.val().trim();
        var locationValue = movieLocation.val().trim();
        console.log(movieValue);
        console.log(locationValue);
    });

    // Pull current movies from database
    jQuery.ajax({
        url: "https://api.internationalshowtimes.com/v4/movies/",
        type: "GET",
        data: {
            "countries": "US",
        },
        headers: {
            "X-API-Key": "KBvReF0P6MlqDF9zeORmnpIrGRictjlU",
        },
    })
    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        console.log(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed");
    })
    .always(function() {
        /* ... */
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

// Toggle purchase form
    $("#seating_submit").on("click", function() {
        var paymentForm = $("#payment_form");
        if (paymentForm.style.display === "none") {
            paymentForm.style.display = "block";
        } else {
            paymentForm.style.display = "none";
        }
    });

// On submit button press, display thank you screen

});