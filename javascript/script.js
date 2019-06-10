// =========================================================
//                  Movie Web Application
// =========================================================

$(document).ready(function() {

    // Movie submit button function
    $("#submit_button").on("click", function(event){
        event.preventDefault();
        let movieSearch = $("#search_movies_input").val().trim();
        let movieLocation = $("#search_location_input").val().trim();
        let movieRating = $("#select_rating :selected").val();

        console.log(movieSearch);
        console.log(movieLocation);
        console.log(movieRating);

        getMovie(movieSearch);
    });
    
    // Function to pull movie from database
    function getMovie(movieSearch) {
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

            /*
            $.each(data.movies, function(i, val) {
                var movieTitle = val.title;
                console.log(movieTitle);
                
                if (movieSearch = movieTitle) {
                    $("#movie_title").text(movieTitle);
                } else { 
                    $("#movie_title").text("Movie not found");
                } 
                
                var movieIMG = val.poster_image_thumbnail;
                console.log(movieIMG);
            })
            */
        
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
        })
        .always(function() {
            /* ... */
        });
    };
    


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