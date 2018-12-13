$(document).ready(function() {

    var topics = ["bored", "confused", "disappointed", "excited", "frustrated", "mind+blown", "sassy", "tired"];

    for (var i = 0; i < topics.length; i++) {
        $("#button-row").append(`
        <button type="button" class="btn" id="allieBtn" data-cat="${topics[i]}">${topics[i]}</button>
        `);
    }

    $("button").on("click", function() {
        var emotion = $(this).attr("data-cat");
        console.log(this); // working, it logs whichever button I click
        console.log(emotion); // working

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&limit=10&api_key=zwfvqM9uxcXhfw5oi3ErBI9OGNYb9OmZ";

        // API key :: zwfvqM9uxcXhfw5oi3ErBI9OGNYb9OmZ

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            console.log(response.data); // the objects, good.
            console.log(response.data.length); // 10, good.

            for (var i = 0; i < results.length; i++) {
                var emotionDiv = $(`<div id="gif-div">`);
                var p = $("<p>").text("Rating: " + results[i].rating);
                var emotionImg = $("<img>");
                emotionImg.attr("src", results[i].images.fixed_height_still.url);


// NEXT STEP IS TO CODE IN SO THAT WHEN THE USER CLICKS ON THE GIF THE IMAGE CHANGES FROM THE STILL STATUS TO AN ACTIVE STATUS...REFERENCE THE JSON.


                emotionDiv.append(p);
                emotionDiv.append(emotionImg);
                $("#gif-row").prepend(emotionDiv);

                console.log(emotionDiv);
                console.log(emotionImg);
                console.log(p);
            }
        });



    });

// AFTER THAT CODE IN THE SECTION TO HAVE THE USER INPUT FORM TO INCORPORATE ADDITIONAL BUTTONS THAT CAN ADD GIFS TO THE PAGE

});