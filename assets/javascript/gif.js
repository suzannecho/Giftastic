$(document).ready(function() {

    var topics = ["Amur Leopard", "Gorilla", "Sea Turtle", "Orangutan", "Sumatran Elephant", "Saola", "Vaquita", "Tiger", "Rhinos", "Pangolin"]

    var results;
    //var giphyURL = "https://api.giphy.com/v1/gifs/trending?api_key=VQZnL2w6oOxgMOSk5jKvBT8awdLj1wv4";
    
  // MAKE BUTTONS	AND ADD ONCLICK FUNCTION
    
  function makeButtons() {
    
    $("#species-buttons").empty();

    for (i = 0; i < topics.length; i++) {
        
        var b = $("<button>");

        b.addClass("species-btn");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);

        $("#species-buttons").append(b);
    };
};

$("#add-items").on("click", function(event) {

    event.preventDefault();

    var character = $("#species-input").val().trim();

    topics.push(character);
    $("#species-input").val("");

    makeButtons();

    console.log(topics);
});

makeButtons();

//FUNCTION FOR GRABBING GIPHY API CONTENT

  function displayGifs() {

     var itemName = $(this).attr("data-name");
     var item = itemName.split(" ").join("+");
     var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=VQZnL2w6oOxgMOSk5jKvBT8awdLj1wv4&limit=10";
  
     $.ajax({
    url: giphyURL,
    method: "GET"
  }).done(function(response) {
    
    console.log(giphyURL);
    console.log(response);

    results = response.data;

    $("#gifs").empty();
    for (var i = 0; i < results.length; i++) {
        
        var itemDiv = $("<div>");
        var para = $("<p class='rating'>").text("Rating: " + results[i].rating);
        var itemImage = $("<img>");

        para.addClass("rating-text")
        
      itemImage.addClass("image-gifs")
        itemImage.attr("src", results[i].images.fixed_height_still.url);
        itemImage.attr("data-state", "still");
      itemImage.attr("data-position", i);

        itemDiv.append(para);
      itemDiv.append(itemImage);
      itemDiv.addClass("individual-gifs")

      $("#gifs").prepend(itemDiv);

    }; //ENDS FOR LOOP
  }); // ENDS AJAX FUNCTION

};

// Use document on click function to apply function for elements AFTER the page has loaded

$(document).on("click", ".species-btn", displayGifs);

// ANIMATE GIFS

function gifAnimation() {
  var state = $(this).attr("data-state");
  var position = $(this).attr("data-position"); //will return a string
  position = parseInt(position); //string to integer

  console.log(results[position].images.fixed_height.url);
  console.log(position);

  if (state === "still") {
    console.log("we're here");
    $(this).attr("src", results[position].images.fixed_height.url);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", results[position].images.fixed_height_still.url);
    $(this).attr("data-state", "still");
  }
};

$(document).on("click", ".image-gifs", gifAnimation);

}); //document.ready