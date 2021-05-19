var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

const recognition = new SpeechRecognition()
const speechRecognitionList = new SpeechGrammarList()

let counter = 0
let phrase
let image
const words = [
  {
    word: 'hond',
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.348 104.389"><path d="M107.869,16.168H93.95l-1.557-3.112a6.959,6.959,0,0,0-6.224-3.847H74.508L68.575,3.276a3.48,3.48,0,0,0-5.941,2.46V38.323L90.47,48.264V40.526H97.43a13.917,13.917,0,0,0,13.919-13.919V19.648A3.479,3.479,0,0,0,107.869,16.168ZM83.511,26.607a3.48,3.48,0,1,1,3.48-3.48A3.479,3.479,0,0,1,83.511,26.607Zm-62.633,17.4a6.969,6.969,0,0,1-6.959-6.959A6.959,6.959,0,0,0,0,37.046,20.842,20.842,0,0,0,13.919,56.641v46.518a3.479,3.479,0,0,0,3.48,3.48H31.317a3.479,3.479,0,0,0,3.48-3.48V78.8h34.8v24.357a3.479,3.479,0,0,0,3.48,3.48H86.991a3.479,3.479,0,0,0,3.48-3.48V55.651L57.86,44.005Z" transform="translate(0 -2.25)"/></svg>`
  }, {
    word: 'vogel',
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.925 74.736"><path d="M-4.738,65.931q2.245.219,4.484.222a37.073,37.073,0,0,0,23.467-8.068,18.173,18.173,0,0,1-10.984-3.741A18.378,18.378,0,0,1,5.576,45a17.771,17.771,0,0,0,3.513.3A18.471,18.471,0,0,0,14.1,44.63,18.183,18.183,0,0,1,3.221,38.167a18.275,18.275,0,0,1-4.3-12v-.226a17.692,17.692,0,0,0,8.593,2.317A18.7,18.7,0,0,1-.926,12.57,18.319,18.319,0,0,1,1.689,3.077a52.433,52.433,0,0,0,17.154,13.94,53.086,53.086,0,0,0,21.711,5.792,21.206,21.206,0,0,1-.525-4.335,18.136,18.136,0,0,1,5.53-13.3,18.226,18.226,0,0,1,13.38-5.53A18.119,18.119,0,0,1,72.688,5.621,37.946,37.946,0,0,0,84.646.988a17.975,17.975,0,0,1-8.221,10.463A38.505,38.505,0,0,0,87.187,8.461a36.184,36.184,0,0,1-9.344,9.788v2.47a54.194,54.194,0,0,1-8.931,29.635,57.737,57.737,0,0,1-10.8,12.29A47.868,47.868,0,0,1,43.054,71.2a55.034,55.034,0,0,1-18.873,3.173A52.947,52.947,0,0,1-4.738,65.931Z" transform="translate(4.738 0.359)"/></svg>`
  }, {
    word: 'kat',
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.348 104.389"><path d="M63.2,37.046c-4.389,0-23.231.431-35.359,18.692V37.046A20.9,20.9,0,0,0,6.959,16.168a6.959,6.959,0,1,0,0,13.918,6.968,6.968,0,0,1,6.959,6.959V92.72a13.931,13.931,0,0,0,13.918,13.918H66.113a3.479,3.479,0,0,0,3.48-3.48v-3.48a6.96,6.96,0,0,0-6.959-6.959H55.674L83.511,71.842v31.317a3.479,3.479,0,0,0,3.48,3.48H93.95a3.479,3.479,0,0,0,3.48-3.48V58.328a27.56,27.56,0,0,1-6.959.987A27.882,27.882,0,0,1,63.2,37.046ZM97.429,16.168H83.511L69.592,2.25V31.479a20.878,20.878,0,0,0,41.755,0V2.25Zm-15.658,17.4a3.48,3.48,0,1,1,3.48-3.48A3.479,3.479,0,0,1,81.771,33.567Zm17.4,0a3.48,3.48,0,1,1,3.48-3.48A3.479,3.479,0,0,1,99.169,33.567Z" transform="translate(0 -2.25)"/></svg>`
  }, {
    word: 'vis',
    image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 111.348 61.86"><path d="M63.232,6.75C45.84,6.75,30.652,17.338,22.2,26.4L5.316,13.628C2.971,11.853-.53,13.744.07,16.462L4.744,37.68.068,58.9c-.6,2.718,2.9,4.607,5.246,2.834L22.2,48.965C30.65,58.022,45.84,68.61,63.232,68.61c26.573,0,48.115-24.744,48.115-30.93S89.805,6.75,63.232,6.75Zm16.9,35.569a4.639,4.639,0,1,1,4.639-4.639A4.641,4.641,0,0,1,80.134,42.319Z" transform="translate(0 -6.75)"/></svg>`
  }
]

const startBtn = document.querySelector('button')
const targetWord = document.querySelector('.word')
const targetImage = document.querySelector('figure')
const section = document.querySelector('section')

const audioWaves = `
  <div>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
`
const microphone = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" />
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
`

function deleteInnerContent(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild)
  }
}

function startSpeech() {
  startBtn.disabled = true
  deleteInnerContent(startBtn)
  startBtn.insertAdjacentHTML('beforeend', audioWaves)
  document.body.style.background = 'white'

  if (counter > words.length - 1) {
    counter = 0
  }

  phrase = words[counter].word.toLowerCase()
  image = words[counter].image

  targetWord.textContent = phrase
  deleteInnerContent(targetImage)
  targetImage.insertAdjacentHTML('beforeend', image)
  speechRecognitionList.addFromString(
    `#JSGF V1.0; grammar phrase; public <phrase> = ${phrase};`,
    1
  )

  recognition.grammars = speechRecognitionList
  recognition.continuous = false
  recognition.lang = 'nl-NL'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.start()

  recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript.toLowerCase()

    if (speechResult === phrase) {
      counter++
      targetWord.innerText = 'Goedzo!'
      document.body.style.background = 'lime'
    } else {
      targetWord.innerText = 'Ah, jammer!'
      document.body.style.background = '#ffc16f'
    }

    console.log(event)
    console.log(speechResult)
    console.log('Confidence: ' + event.results[0][0].confidence)
  }
}

recognition.onspeechend = function() {
  recognition.stop()
  startBtn.disabled = false
  deleteInnerContent(startBtn)
  startBtn.insertAdjacentHTML('beforeend', microphone)
}

recognition.onerror = function() {
  startBtn.disabled = false
  deleteInnerContent(startBtn)
  startBtn.insertAdjacentHTML('beforeend', microphone)
}

startBtn.addEventListener('click', startSpeech)