// =========================================================
//                  Movie Web Application
// =========================================================

$(document).ready(function() {

    // BANNER
    var bannerStatus = 1;
    var bannerTimer = 6000;

    function bannerLoop() {
        if (bannerStatus === 1) {
            $("#imgban2").css("opacity", "0");
            setTimeout(function() {
                $("#imgban1").css({"right": "0px", "zindex": "1000"});
                $("#imgban2").css({"right": "-2400px", "zindex": "1500"});
                $("#imgban3").css({"right": "2400px", "zindex": "500"});   
            }, 500);
            setTimeout(function() {
            $("#imgban2").css("opacity", "1");
            }, 1000);
            bannerStatus = 2;
        }
        else if (bannerStatus === 2) {
            $("#imgban3").css("opacity", "0");
            setTimeout(function() {
                $("#imgban2").css({"right": "0px", "zindex": "1000"});
                $("#imgban3").css({"right": "-2400px", "zindex": "1500"});
                $("#imgban1").css({"right": "2400px", "zindex": "500"});   
            }, 500);
            setTimeout(function() {
            $("#imgban3").css("opacity", "1");
            }, 1000);
            bannerStatus = 3;
        }
        else if (bannerStatus === 3) {
            $("#imgban1").css("opacity", "0");
            setTimeout(function() {
                $("#imgban3").css({"right": "0px", "zindex": "1000"});
                $("#imgban1").css({"right": "-2400px", "zindex": "1500"});
                $("#imgban2").css({"right": "2400px", "zindex": "500"});   
            }, 500);
            setTimeout(function() {
            $("#imgban1").css("opacity", "1");
            }, 1000);
            bannerStatus = 1;
        }
    }

    bannerLoop();

    var startBannerLoop = setInterval(function() {
        bannerLoop();
    }, bannerTimer);


    // SHOWTIMES MOVIE DATABASE:
    var showtimesURL = "https://api.internationalshowtimes.com/v4";
    var settings = {
        "url": "https://api.internationalshowtimes.com/v4/movies",
        "method": "GET",
        "headers": {
          "X-API-Key": "KBvReF0P6MlqDF9zeORmnpIrGRictjlU"
        }
      }
      

      var allMovies;
      var availableTags = [];

      // Load all movies on page load
      $.ajax(settings).done(function (response) {
          allMovies = response.movies;
          console.log(allMovies);
          // Allow text input
          $("#fieldset").attr("disabled", false);
      });


      // Autocomplete widget
      $(function() {
        $("#search_movies_input").autocomplete({
          source: availableTags,
          delay: 500
        });
      });
      
      
      // Keypress event listener to 
      $("#search_movies_input").on('keyup', function() {
          var value = $(this).val();
          var movies = filterMovies(value);
          console.log(movies);

          // function to evaluate titles in array to keep from repeating
          function evaluateArray() {
            if (availableTags.includes(movies[0].title)) {
               return false; 
            } else {
                availableTags.push(movies[0].title);
            }
          }
          evaluateArray();
          
      });
      
      
      function filterMovies(movieTitle) {
          var movies = allMovies.filter(function(movie) {
              var title = movie.title || "";
              return title.toLowerCase().startsWith(movieTitle);
          });
      
          return movies;
      }


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
        getCinema(movieLocation);
    });
    
    /*
    function getMovie2() {
        $.ajax({
            url: "https://data.tmsapi.com/v1.1/movies/showings?startDate=2019-06-13&zip=28078&api_key=5s58ed6xnp59p2n5e4arr26c",
            method: "GET"
          }).then(function(response) {
            console.log(response); 
          });
    };
    */


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

            $("#movie-poster").empty().html(`<img src=${movieIMG}alt="movie_poster" class="img-thumbnail mb-4">`);
            $("#movie-title").empty().text(movieTitle);
            $("#movie-plot").empty().text(moviePlot);
            $("#movie-rated").empty().html(`
                <strong>Rating: ${movieRated}</strong><br>Runtime: ${movieRuntime}
            `)
          });
    };


    // Function to pull cinema data from INTERNATIONAL SHOWTIMES API
    let cinemaId = [];
    function getCinema(movieLocation) {
        
        // GET cinema name and id
        $.ajax({
            url: showtimesURL + "/cinemas?search_query=" + movieLocation + "&search_field=zipcode&distance=100",
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
                cinemaId.push(val.id);
                output += `
                <div class="card mb-5 mt-5">
                    <div class="card-header">
                        ${val.name}
                    </div>
                    <div class="card-body" id="movie-times">
                        <h5 class="card-title">${val.location.address.display_text}</h5>
                        <p class="card-text">Select a movie time to buy Standard Showtimes</p>
                    </div>
                </div>
                `

                $("#cinema-display").empty().prepend(output);
                getShowtimes(cinemaId);
            }) 
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
        })
    };


    // Function to pull cinema showtimes from INTERNATIONAL SHOWTIMES API
    function getShowtimes(cinemaId) {
        console.log(cinemaId);
        // GET cinema showtime
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var end = new Date();
        // end.setDate(today.getDate() + 1);
        end.setHours(23,59,59,999);
        console.log("beginning of day", today);
        console.log("EOD", end);
        $.ajax({
            url: showtimesURL + "/showtimes?cinema_id=" + cinemaId + "&movie_id=46097" + "&time_from=" + today.toISOString() + "&time_to=" + end.toISOString(),
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
            $.each(showtimes, function(index, val){
                console.log(val.start_at);
                let startTime = val.start_at;
                let convertedTime = moment(startTime);
                console.log(convertedTime.format("h:mm a"));
                $("#movie-times").append(`
                    <a href="#" class="btn btn-primary">${convertedTime.format("h:mm a")}</a>
                `);
            })
        });
    };


// Display seating chart with available seating
// user can select a seat by clicking on one that is available

    $('.btn-secondary1').click(function() {
        $('.btn-secondary1').not(this).removeClass('buttonactive');
        $(this).toggleClass('btn-thirdly');
    });

    // Toggle purchase form
    $("#seating-submit").on("click", function() {
        $("#payment-form").show();
        $("#seating-form").hide();
    });

    // On submit button press, display thank you message
    $("#payment-submit").on("click", function() {
        $("#payment-form").empty().html(
            `<h3><center>Thank you for your payment!</center></h3>
            <br>
            <center><img src='assets/images/movie-ticket.jpg' height='200px' width='250px'></center>`
            );
    });


});
