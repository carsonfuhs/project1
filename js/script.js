

//API url: https://finnhub.io/api/v1/quote?symbol=AAPL&token=c0ta3b748v6r4maenot0
//https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-04-30&to=2020-05-01&token=c0ta3b748v6r4maenot0
//company-news?symbol=AAPL&from=2020-04-30&to=2020-05-01
//c0ta3b748v6r4maenot0

const apiURL = "https://finnhub.io/api/v1/"
const apiKey = "&token=c0ta3b748v6r4maenot0" //includes token value - attached to end of each API hit



// $.ajax({
//     url: apiURL + 
// })

//console.log(apiURL + "quote?symbol=AAPL" + apiKey)
// hello

//const submitButton = $("#submitButton")

// const submitButton = document.querySelector("#submitButton");
// //let userTickerInput, testVar;

// submitButton.addEventListener("click", (event) => {
//     console.log(event);
//     console.log("success");
//     const userTickerInput = document.getElementById("tickerInput").value;
//     console.log(userTickerInput);
//     let testVar = 4;
//     console.log(testVar)
// });
// let user;

///let userTickerInput;

// function getTicker() {
//     userTickerInput = $("tickerInput").val();
// }

$("#submitButton").on("click", function(event) {
    event.preventDefault(); //prevents page refresh
    $(".stock-price").remove() //clears page if there's other stock details
    $(".stock-news-headline").remove()

    const userTickerInput = $("#tickerInput").val();

    $.when(
        $.ajax({url: apiURL + "quote?symbol=" + userTickerInput + apiKey}),
        $.ajax({url: apiURL + "company-news?symbol=" + userTickerInput + "&from=2021-01-01&to=2021-03-03" + apiKey}),
    ).then(
        (data1, data2) => {
            //behavior of the API is all 0's when an invalid ticker is sent. This catches it.
            if (data1[0].l === 0 & data1[0].h === 0 & data1[0].c === 0) {
                console.log("that ticker doesn't exist")
            } else {
            //shows last stock price
                const lastPrice = data1[0].c;
                let $stock = $("<h2>").addClass("stock-price");
                $("body").append($stock);
                $(".stock-price").html('Price: ' + lastPrice)

            //shows latest news headline
                //let newsHeadline = data2[0][0].headline;
                //console.log(newsHeadline)
                $newsTitle = $("<h2>").addClass("stock-news-title");
                $newsList = $("<ul>").addClass("stock-news-list");
                $newsItem = $("<li>")
                $("body").append($newsTitle);
                $("body").append($newsList);
                $(".stock-news-title").html('Related News Headlines:')

                for (let i = 0; i < 5; i++) {
                    console.log(data2[0][i].headline)
                    $(".stock-news-list").append("<li><a href=" + data2[0][i].headline + "</li>")
                }
            }
        },
        (error1) => {
            console.log("error")
        }
    )




    // //gets the stock price
    // $.ajax({
    //     url: apiURL + "quote?symbol=" + userTickerInput + apiKey
    // }).then(
    //     (data) => {
    //         console.log(data)
    //         //behavior of the API is all 0's when an invalid ticker is sent. This catches it.
    //         if (data.l === 0 & data.h === 0 & data.l === 0) {
    //             console.log("that ticker doesn't exist")
    //         } else {
    //             const lastPrice = data.l;
    //             let $stock = $("<h2>").addClass("stock-price");
    //             $("body").append($stock);
    //             $(".stock-price").html('Price: ' + lastPrice)
    //         }
    //     },
    //     (error) => {
    //         console.log("error")
    //     }
    // )
    
    // $.ajax({
    //     url: apiURL + "company-news?symbol=" + userTickerInput + "&from=2021-01-01&to=2021-03-03" + apiKey
    // }).then(
    //     (data2) => {
    //         //console.log(data2)
    //         let newsHeadline = data2[0].headline;
    //         console.log(newsHeadline)
    //         let $newsHeadline = $("<h2>").addClass("stock-news-headline");
    //         $("body").append($newsHeadline);
    //         $(".stock-news-headline").html('Latest Headline: ' + newsHeadline)
    //     },

    //     (error) => {
    //         console.log("error")
    //     }

    // )
    
});



