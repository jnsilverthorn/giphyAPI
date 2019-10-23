var initialBtns = [
    "cat",
    "dog",
    "pig",
    "cow",
    "fish",
    "bird",
    "monkey",
    "goat",
    "elephant",
    "fox"
];
var limit = 10;

var startButtons = function() {
    for(i = 0; i < initialBtns.length; i++){
        $("#btn-container").append("<button class='gifBtn' value='" + initialBtns[i] + "'>" + initialBtns[i] + "</button>");
    }
};

$("#submit").on("click", function(event) {
    if($("#userInput").val() !== ""){    
        event.preventDefault();
        $("#btn-container").append("<button class='gifBtn' value='" + $("#userInput").val() + "'>" + $("#userInput").val() + "</button>");
        $("#userInput").val("");
    };
});

$(document).ready(function(){
    $(document).on("click", ".gifBtn", function(event2){
        $("#gifs-go-here").text("");
        var btnValue = event2.currentTarget.attributes.value.value;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnValue + "&api_key=eFWU79IQle0aHvF1b7t8ZgxO5s6G1C9s" + "&limit=" + limit;
        console.log(btnValue);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var results = response.data
            for(i = 0; i < results.length; i++){
                $("#gifs-go-here").prepend(
                    "<div class='gifDiv'>" +
                    "<img class='image' src=" + results[i].images.fixed_height.url + ">" +
                    "<p class='rating'>Rating: " + results[i].rating + "</p>" +
                    "</div>"
                );
            };        
        });
    });
});


startButtons();