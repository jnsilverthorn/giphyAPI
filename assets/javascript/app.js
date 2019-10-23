var initialBtns = [
    "Cat",
    "Dog",
    "Borderlands",
    "Clash Royale",
    "American Dad",
    "South Park",
    "Gears of War",
    "Ice Cream",
    "Fantastic Mr. Fox",
    "Fox"
];
var limit = 10;
var offset = 0;
var src;

var startButtons = function() {
    for(i = 0; i < initialBtns.length; i++){
        $("#btn-container").append("<button class='gifBtn' value='" + initialBtns[i] + "'>" + initialBtns[i] + "</button>");
    }
};

$("#submit").on("click", function(event) {
    event.preventDefault();
    if($("#userInput").val() !== ""){    
        event.preventDefault();
        $("#btn-container").append("<button class='gifBtn' value='" + $("#userInput").val() + "'>" + $("#userInput").val() + "</button>");
        $("#userInput").val("");
    };
});

$(document).ready(function(){
    $(document).on("click", ".gifBtn", function(event2){
        $("#gifs-go-here").text("");
        offset = 0;
        var btnValue = event2.currentTarget.attributes.value.value;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnValue + "&api_key=eFWU79IQle0aHvF1b7t8ZgxO5s6G1C9s" + "&limit=" + limit;
        localStorage.setItem('gifBtnValue', btnValue);
        console.log(btnValue);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var results = response.data
            for(i = 0; i < results.length; i++){
                var srcStill = results[i].images.fixed_height_still.url;
                var srcActive = results[i].images.fixed_height.url;
                //stores the active url in object we can access later on
                $("#gifs-go-here").append(
                    "<div class='gifDiv'>" +
                    "<img dataBtn='" + btnValue + "' data-gif='" + srcActive + "'" + " class='image' src=" + srcStill + ">" +
                    "<p class='rating'>Title: " + results[i].title + "</p>" +
                    "<p class='rating'>Rating: " + results[i].rating + "</p>" +
                    "</div>"
                );
            };        
        });
    });
});

$(document).on("click", ".image", function(){
    $(this).attr("src", $(this)[0].attributes[1].value);
    console.log(this)
});

$(".addTen").on("click", function(event){
    event.preventDefault();
    if($("#gifs-go-here").text() !== ""){
        var btnValue = localStorage.getItem('gifBtnValue');
        var offsetInc = offset += 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnValue + "&api_key=eFWU79IQle0aHvF1b7t8ZgxO5s6G1C9s" + "&limit=" + limit + "&offset=" + offsetInc;
        console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var results = response.data
            for(i = 0; i < results.length; i++){
                var srcStill = results[i].images.fixed_height_still.url;
                var srcActive = results[i].images.fixed_height.url;
                //stores the active url in object we can access later on
                $("#gifs-go-here").append(
                    "<div class='gifDiv'>" +
                    "<img dataBtn='" + btnValue + "' data-gif='" + srcActive + "'" + " class='image' src=" + srcStill + ">" +
                    "<p class='rating'>Title: " + results[i].title + "</p>" +
                    "<p class='rating'>Rating: " + results[i].rating + "</p>" +
                    "</div>"
                );
            };        
        });
    };
});

startButtons();