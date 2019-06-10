// =========================================================
//                  Movie Web Application
// =========================================================

$(document).ready(function() {

    // SHOWTIMES MOVIE DATABASE:
    let showtimesURL = "https://api.internationalshowtimes.com/v4"

    $.ajax({
        url: showtimesURL + "/movies/",
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
        console.log(data.movies);
    });



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
        getShowtimes(movieLocation);
    });
    


    // Function to pull movie data from OMDB API
    function getMovie(movieSearch) {
        let movieURL = "https://www.omdbapi.com/?t=" + movieSearch + "&apikey=trilogy";
        
        $.ajax({
            url: movieURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);

            let movieTitle = response.Title;
            let moviePlot = response.Plot;
            let movieIMG = response.Poster;
            let movieRuntime = response.Runtime;
            let movieRated = response.Rated;

            $("#movie-poster").empty().html(`<img src=` + movieIMG + `alt="movie_poster" class="img-thumbnail mb-4">`);
            $("#movie-title").empty().text(movieTitle);
            $("#movie-plot").empty().text(moviePlot);
            $("#movie-rated").empty().html(`
                <strong>Rating: ` + movieRated + `</strong><br>Runtime: ` + movieRuntime + `
            `)
          });
    };



    // Function to pull cinema data from INTERNATIONAL SHOWTIMES API
    function getShowtimes(movieLocation) {
        
        // GET cinema name
        $.ajax({
            url: showtimesURL + "/cinemas?search_query=" + movieLocation + "&search_field=zipcode",
            type: "GET",
            async: false,
            headers: {
                "X-API-Key": "KBvReF0P6MlqDF9zeORmnpIrGRictjlU",
            },
        })
        .done(function(data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            console.log(data);
            let cinema = data.cinemas;
            let output = "";
            $.each(cinema, function(index, val){
                console.log(val.name);
                console.log(val.id);
                output += `
                <div class="card mb-5 mt-5">
                    <div class="card-header">
                        ` + val.name + `
                    </div>
                    <div class="card-body" id="movie-times">
                        <h5 class="card-title">Select a movie time to buy Standard Showtimes</h5>
                        <p class="card-text">Select a movie time to buy Standard Showtimes</p>
                    </div>
                </div>
                `
                $("#cinema-display").empty();
                $("#cinema-display").prepend(output);
            }) 
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
        })

        // GET cinema showtime
        $.ajax({
            url: showtimesURL + "/showtimes?cinema_id=46940&movie_id=46097",
            type: "GET",
            async: false,
            headers: {
                "X-API-Key": "KBvReF0P6MlqDF9zeORmnpIrGRictjlU",
            },
        })
        .done(function(data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            console.log(data.showtimes);
            let showtimes = data.showtimes;
            let output = "";
            $.each(showtimes, function(index, val){
                console.log(val.start_at);
                output += `
                    <a href="#" class="btn btn-primary">` + val.start_at + `</a>
                `
                $("#movie-times").append(output);
            })
        });
    };


// Display seating chart with available seating
// user can select a seat by clicking on one that is available

// Toggle purchase form
    $("#seating-submit").on("click", function() {
        var paymentForm = $("#payment_form");
        if (paymentForm.style.display === "none") {
            paymentForm.style.display = "block";
        } else {
            paymentForm.style.display = "none";
        }
    });

// On submit button press, display thank you screen

});