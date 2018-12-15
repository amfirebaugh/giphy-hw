$(document).ready(function() {

    var topics = ["awe", "awkward", "bored", "confused", "disappointed", "disgust", "envy", "excited", "fear", "frustrated", "joy", "nostaglia", "sassy", "tired", "triumph"];
    
    for (var i = 0; i < topics.length; i++) {
        $("#button-row").append(`
        <button type="button" class="btn allieBtn" data-cat="${topics[i]}">${topics[i]}</button>
        `);
    }

    $("button").on("click", function() {
        var emotion = $(this).attr("data-cat");
        console.log(this); // working, it logs whichever button I click

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&limit=10&api_key=zwfvqM9uxcXhfw5oi3ErBI9OGNYb9OmZ";

        // API key :: zwfvqM9uxcXhfw5oi3ErBI9OGNYb9OmZ

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            console.log(response.data); // the objects, good.
            console.log(response.data.length); // 10, good.

            // Below these clear the previous gifs and their ratings when a new button is clicked.
            $("img").remove();
            $("p").remove();

            // populates gifs on page in a "gif-div", with a p tag giving the rating, and the gifs are inside img tags with several data attributes
            for (var i = 0; i < results.length; i++) {
                var emotionDiv = $(`<div id="gif-div">`);
                var p = $(`<p>`).text("Rating: " + results[i].rating);

                // Below emotionImg creates the gifs so that they have data attributes I can call later so when the user clicks them they can start and stop playing accoridnginly.
                var emotionImg = $(`
                <img src="${results[i].images.fixed_height_still.url}" data-state="still" data-still="${results[i].images.fixed_height_still.url}" data-animate="${results[i].images.fixed_height.url}" class="gif">
                `);
                
                emotionDiv.append(p);
                emotionDiv.append(emotionImg);
                $("#gif-row").prepend(emotionDiv);
            }

            $("#submit").on("click", function() {
                var gifSearch = $("input[name=searchBar").val().trim();
                topics.push(gifSearch);
                console.log(topics);
                console.log(topics.length);
                $("#button-row").empty();
                for (var i = 0; i < topics.length; i++) {
                    $("#button-row").append(`
                    <button type="button" class="btn allieBtn" data-cat="${topics[i]}">${topics[i]}</button>
                    `);
                }
            });

        });
    });

    

    

    // Note to self: NEEDED to pass "gif-row" because it was hard-coded into the HTML, and it the code wasn't finding my gif class because it wasn't generated yet.
    $("#gif-row").on("click", ".gif", function() {

        var state = $(this).attr("data-state");
        console.log(this); // working

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});