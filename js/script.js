

//API url: https://finnhub.io/api/v1/quote?symbol=AAPL&token=c0ta3b748v6r4maenot0
//https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-04-30&to=2020-05-01&token=c0ta3b748v6r4maenot0
//company-news?symbol=AAPL&from=2020-04-30&to=2020-05-01
//c0ta3b748v6r4maenot0

const apiURL = "https://finnhub.io/api/v1/"
const apiKey = "&token=c0ta3b748v6r4maenot0" //includes token value - attached to end of each API hit

$("#submitButton").on("click", function(event) {
    event.preventDefault(); //prevents page refresh

    //clears page if there's other stock details
    $(".stock-price").remove() 
    $(".stock-news-title").remove()
    $(".stock-news-list").remove()
    $(".ticker-error").remove()
    $(".company-profile").remove()

    //grabs user input, makes it uppercase
    let userTickerInput = $("#tickerInput").val();
    userTickerInput = userTickerInput.toUpperCase()

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
    ).then(
        (quote, companyNews, companyProfile) => {

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
                let $companyProfile = $("<h2>").addClass("company-profile");
                let $companyWebsite = $("<h2>").addClass("company-website");
                $("body").append($companyProfile);
                $("body").append($companyWebsite);
                $(".company-profile").html("Company: " + companyName)
                $(".company-website").html("<a href=" + companyWebsite + " target=_blank>" + companyWebsite)

            //shows last stock price
                const lastPrice = quote[0].c;
                let $stock = $("<h2>").addClass("stock-price");
                $("body").append($stock);
                $(".stock-price").html('Last share price:  $' + lastPrice)

            //creates items on DOM
                $newsTitle = $("<h2>").addClass("stock-news-title");
                $newsList = $("<ul>").addClass("stock-news-list");
                $("body").append($newsTitle);
                $("body").append($newsList);
                $(".stock-news-title").html('Related News Headlines:')

                //loops through news array, takes most recent 5, adds as unordered list, links open in new tab
                for (let i = 0; i < 10; i++) {
                    console.log(companyNews[0][i])
                    $(".stock-news-list").append("<li><a href=" + companyNews[0][i].url + " target=_blank>" + companyNews[0][i].headline + "</li>")
                }

            }

        },

        (error1) => {
            console.log("error")

        }

    )
    
});



