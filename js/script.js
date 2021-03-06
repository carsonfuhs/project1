const apiURL = "https://finnhub.io/api/v1/"
const apiKey = "&token=c0ta3b748v6r4maenot0" //includes token value - attached to end of each API hit

$("#submitButton").on("click", function(event) {
    event.preventDefault();

    //clears page if there's other stock details
    $(".stock-price").remove() 
    $(".stock-news-title").remove()
    $(".stock-news-list").remove()
    $(".ticker-error").remove()
    $(".company-profile").remove()
    $(".analyst-recommendation-title").remove()
    $(".analyst-recommendation-list").remove()
    $(".company-profile").remove()
    $(".company-website").remove()

    //grabs user input, makes it uppercase
    let userTickerInput = $("#tickerInput").val();
    userTickerInput = userTickerInput.toUpperCase();
    $("#tickerInput").val("");

    //gets today's date and the date 21 days ago. Probably not the most elegent way to do this but, well, it works.
    let today = new Date().toISOString().slice(0,10)
    let threeWeeksAgo = new Date(today)
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21)
    threeWeeksAgo = threeWeeksAgo.toISOString().slice(0,10)

    //hitting multiple API's and getting information
    $.when(
        $.ajax({url: apiURL + "quote?symbol=" + userTickerInput + apiKey}),
        $.ajax({url: apiURL + "company-news?symbol=" + userTickerInput + "&from=2021-01-25&to=2021-03-03" + apiKey}),
        $.ajax({url: apiURL + "stock/profile2?symbol=" + userTickerInput + apiKey}),
        $.ajax({url: apiURL + "stock/recommendation?symbol=" + userTickerInput + apiKey}),
    ).then(
        (quote, companyNews, companyProfile, analystRecommendations) => {

            //behavior of the API is all 0's when an invalid ticker is sent. This catches it.
            //not the best solution but will update in the future.
            if (quote[0].l === 0 & quote[0].h === 0 & quote[0].c === 0) {
                let $tickerError = $("<h2>").addClass("ticker-error");
                $("body").append($tickerError);
                $(".ticker-error").html("Sorry, we couldn't find that ticker.")
            } else {

            //company information
                const companyName = companyProfile[0].name;
                const companyWebsite = companyProfile[0].weburl;
                let $companyProfile = $("<h1>").addClass("company-profile");
                let $companyWebsite = $("<h4>").addClass("company-website");
                
                $("form").after($companyProfile);
                $companyProfile.after($companyWebsite);
                $(".company-profile").html(companyName)
                $(".company-website").html("<a href=" + companyWebsite + " target=_blank>" + companyWebsite)

            //shows last stock price
                const lastPrice = quote[0].c;
                let $stock = $("<h3>").addClass("stock-price");
                $companyWebsite.after($stock);
                $(".stock-price").html('Last share price:  $' + lastPrice)

            //creates items on DOM
                $newsTitle = $("<h2>").addClass("stock-news-title");
                $newsList = $("<ul>").addClass("stock-news-list");

                $(".news").append($newsTitle);
                $(".news").append($newsList);
                $(".stock-news-title").html('Related News Headlines:')

                //loops through news array, takes most recent 5, adds as unordered list, links open in new tab
                for (let i = 0; i < 10; i++) {
                    $(".stock-news-list").append("<li><a href=" + companyNews[0][i].url + " target=_blank>" + companyNews[0][i].headline + "</li>")
                }
            
            //gets analyst recommendations
                const ar = analystRecommendations;
                $analystRecommendation = $("<h2>").addClass("analyst-recommendation-title");
                $analystRecommendationList = $("<ul>").addClass("analyst-recommendation-list");
                $(".recs").append($analystRecommendation);
                $(".recs").append($analystRecommendationList);
                $(".analyst-recommendation-title").html('Analyst Recommendations as of ' + ar[0][0].period) //period is time period for recs
                
                //adds analyst recs to page
                $(".analyst-recommendation-list").append("<li>Strong Buy: " + ar[0][0].strongBuy+ "</li>")
                $(".analyst-recommendation-list").append("<li>Buy: " + ar[0][0].buy + "</li>")
                $(".analyst-recommendation-list").append("<li>Hold: " + ar[0][0].hold + "</li>")
                $(".analyst-recommendation-list").append("<li>Sell: " + ar[0][0].sell + "</li>")
                $(".analyst-recommendation-list").append("<li>Strong Sell: " + ar[0][0].strongSell+ "</li>")
                

            }

        },

        (error1) => {
            console.log("error")

        }

    )
    
});



