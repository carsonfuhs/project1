

//API url: https://finnhub.io/api/v1/
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
    //console.log(event);
    
    const userTickerInput = $("#tickerInput").val();

    //gets a stock quote
    $.ajax({
        url: apiURL + "quote?symbol=" + userTickerInput + apiKey
    }).then(
        (data) => {
            console.log(data)
        },
        (error) => {
            console.log("error")
        }
    )
    
    
    //console.log(userTickerInput)
});



// //console.log(userInput)