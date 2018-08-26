var foods = ["Chinese Food", "Mexican Food", "Italian food", "Grilled Cheese", "Pizza", "Salad", "Soup", "Thia Food", "Indian Food", "Donuts", "Sushi", "Steak", "Mash Potatoes", "Creme brule", "Ice cream", "Pie"];

        function displayFood() {

            var food = $(this).attr("q");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=aMMPDZRblXD8cVc1NwacTSWD74n66Z6D&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET",
                rating: "data.rating",
            }).then(function (response) {
                console.log(response);

                $(".food").empty();
               
                var rating = response.rating;
                var results = response.data;
                
                for (var i = 0; i < results.length; i++) {

                    
                    var foodDiv = $("<div class='food'>");
                    var foodRating = $("<h3>").text("Rating: " + results[i].rating);
                    var image = $("<img>");

                    image.attr("src", results[i].images.fixed_height_still.url);
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    image.attr("data-animate", results[i].images.fixed_height.url);
                    image.attr("data-state", "still");
                    image.attr("class","gif");

                    foodDiv.append(foodRating);

                    foodDiv.append(image);
                    $("#gif-holder").append(foodDiv);
                }
            });

           
        }

        function renderButtons() {

            $("#foodBtns").empty();
            for (var i = 0; i < foods.length; i++) {

                var a = $("<button class= 'btn btn-info btn-lg'>")
                a.addClass("foodBtns");
                a.attr("q", foods[i]);
                a.text(foods[i]);

                $("#foodBtns").append(a);
            }
        }
        function foodAnimate() {
            var state = $(this).attr("data-state");
            var animate = $(this).attr("data-animate");
            var still = $(this).attr("data-still");

            if (state === "still") {
                $(this).attr("src", animate);
                $(this).attr("data-state", "animate");
            } else if (state == "animate") {
                $(this).attr("src", still);
                $(this).attr("data-state", "still");
            }
        }
        $("#addFood").on("click", function (event) {
            event.preventDefault();
            console.log("click");
            var newFood = $("#foodInput").val().trim();
            foods.push(newFood);

            renderButtons();

        });

        renderButtons();

        $(document).on("click", ".foodBtns", displayFood);

        $(document).on("click", ".gif", foodAnimate);
