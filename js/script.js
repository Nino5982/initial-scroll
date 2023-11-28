const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes= [];
// show new quote

// show loading
function loading()
{
    loader.hidden= false;
    quoteContainer.hidden= true;
}
// hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function newQuote() {
    loading();
// Pick a random quote from apiQuotes array
const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
// check if author field is blanck and replace it with ' 
if (!quote.author){
    authorText.textContent='Unknown'
}else {
    authorText.textContent= quote.author;
}
// check Quote length to determine styling
if (quote.text.length>120){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
    // set quote, hide loader 
    quoteText.textContent= quote.text;
complete();
}

// get quotes from API
async function getQuotes(){
    loading();
    const apiUrl="https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
        const response=await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        // Catch Error Here
    }
}


// // ///get quotes from local file

// function newQuote() {
// const quote = localQuotes[Math.floor(Math.random()*localQuotes.length)];
// console.log(quote);
// authorText.textContent= quote.author;
// quoteText.textContent= quote.text;
// }
// newQuote();
// \
// 


// tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

