// =========================================================
//                  Movie Web Application
// =========================================================

$( document ).ready(function() {

    // Movie submit button function
    $("#submit_button").on("click", function(){
        var movieSearch = $("#search_movies_input").val().trim();
        var movieLocation = $("#search_location_input").val().trim();
        var movieRating = $("#select_rating :selected").val();
        console.log(movieSearch);
        console.log(movieLocation);
        console.log(movieRating);
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