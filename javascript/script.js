$(document).ready(function () {

    // Array of topics: Sports
    var topics = ["basketball", "baseball", "football", "soccer", "badminton", "bowling", "tennis", "golf"]

    // Create buttons and display to page
    var btnGroup = $(".btn-group");
    var btn;

    function createButtons() {
        btnGroup.empty();
        for(var i = 0 ; i < topics.length; i++) {
            btn = $("<button type='button'>");
            btn.addClass("btn btn-outline-primary mr-2 giphy-btn");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            btnGroup.append(btn);
        }

         // When button is pressed, pull static gif from API and display to page
        var btnClick = $(".giphy-btn");
        btnClick.on("click", function() {
            gifs.empty();
            $(this).addClass("active");
    
            // Grab value from clicked button
            var sport = $(this).attr("data-name"); 
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=co7e2mX0LyH2efA0LWUovJqJsMJYTQtA&limit=5";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                    
                    var results = response.data;
                    
                    for (var i = 0; i < results.length; i++) {
                        var imageDiv = $("<Div class='image-div'>");
                        // Display rating for every gif
                        var p = $("<p>").text("Rating: " + results[i].rating);
                        // Point to image location
                        var image = $("<input type='image'>").attr("src", results[i].images.original_still.url);
                        image.attr("data-still", results[i].images.original_still.url);
                        image.attr("data-animate", results[i].images.original.url);
                        image.attr("data-state", "still");
                        image.addClass("gif");
                        imageDiv.append(p);
                        imageDiv.append(image);
                        gifs.prepend(imageDiv);
                    };
            }); 
        });
    };

    createButtons();

    var gifs = $("#gifs-container");
    

    // When gif is pressed, animate
    // When gif is pressed again, stop animation
    function changeState(){
        var state = $(this).attr("data-state");
        var animateImg = $(this).attr("data-animate");
        var stillImg = $(this).attr("data-still");

        // If button state === "still", change to animate
        if (state === "still") {
            $(this).attr("src", animateImg);
            $(this).attr("data-state", "animate");
        }

        // If button state ==== "animate", change to still
        else if (state === "animate") {
            $(this).attr("src", stillImg);
            $(this).attr("data-state", "still");

        }
    };

    $(document).on("click", ".gif", changeState);


    // Add form that takes user input and adds to "topics" array
    $("#add-sport").on("click", function(event) {
        event.preventDefault();
        var newSport = $("#sport-input").val().trim();
        topics.push(newSport);
        createButtons();
    });
});