const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const textDisplayElement = document.getElementById('textDisplay')
const textInputElement = document.getElementById('textInput')
const timerElement = document.getElementById('timer')


textInputElement.addEventListener('input', () => {
    /*console.log('textTyped')*/
    const arrayText = textDisplayElement.querySelectorAll('span')
    const arrayValue = textInputElement.value.split('')
    
    let correct = true
    arrayText.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) renderNewQuote()

})

/*Function for fetching the API */
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}
/*
async function getNextQuote() {
    const quote = await getRandomQuote()
    console.log(quote)
getNextQuote()

}*/
async function renderNewQuote() {
    const quote = await getRandomQuote()
    console.log(quote)
    textDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        textDisplayElement.appendChild(characterSpan)
    })
    textInputElement.value = null

    startTimer()

}

let startTime
function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
      timer.innerText = getTimerTime()

    }, 1000)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000)
}
renderNewQuote()

