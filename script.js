// PULLING OUR TAGS INTO OUR JS TO USE IN FUNCTIONS
const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")

let apiQuotes = [];

// SHOW NEW QUOTE
function newQuote() {

    //PICK RANDOM QUOTE OUT OF ARRAY
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //CHECK IT AUTHOR FIELD IS BLANK AND REPLACE IT WITH UNKNOWN
    if (!quote.author){
        authorText.textContent = "unknown";
    } else{
        authorText.textContent = quote.author
    }

    // CHECK QUOTE LENGTH TO DETERMINE THE STYLING
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote')
    } else{
        quoteText.classList.remove('long-quote')
    }

    // PULL QUOTE TEXT FROM OBJECT PULLED
    quoteText.textContent = quote.text
}

// ASYNC FUNCTION TO GRAB THE LIST OF QUOTES FROM THE API WITH A TRY AND CATCH ERROR METHOD
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){

    }
}

// TWEET QUOTE
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// EVENT LISTENERS
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// ONLOAD
getQuotes();