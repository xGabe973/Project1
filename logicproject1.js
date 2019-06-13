var settings = {
  "url": "https://api.internationalshowtimes.com/v4/movies",
  "method": "GET",
  "headers": {
    "X-API-Key": "KBvReF0P6MlqDF9zeORmnpIrGRictjlU"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
