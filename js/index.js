var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continuous = false
recognition.lang = 'nl-NL'
recognition.interimResults = false
recognition.maxAlternatives = 1

let counter = 0
const startBtn = document.querySelector('button')
const targetWord = document.querySelector('.word')
const resultPara = document.querySelector('.result')
const spokenWord = document.querySelector('.output')
const words = [
    'vogel',
    'hond',
    'kat',
    'vis'
]

function startSpeech() {
    startBtn.disabled = true
    startBtn.textContent = 'Test bezig'

    if (counter > words.length - 1) {
        counter = 0
    }

    let activeWord = words[counter]
    activeWord = activeWord.toLowerCase()
    counter += 1

    targetWord.textContent = activeWord
    resultPara.textContent = 'Goed of Fout?'
    resultPara.style.background = 'rgba(0,0,0,0.2)'
    spokenWord.textContent = '...diagnostic messages'

    recognition.start()

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript.toLowerCase()
        spokenWord.textContent = 'Gesproken woord: ' + speechResult
    
        if (speechResult === activeWord) {
            resultPara.textContent = 'Dat is correct!'
            resultPara.style.background = 'lime'
        } else {
            resultPara.textContent = 'Nah gappie'
            resultPara.style.background = 'red'
        }
    
        console.log(event)
        console.log('Confidence: ' + event.results[0][0].confidence)
    }
}

recognition.onspeechend = function() {
    recognition.stop()
    startBtn.disabled = false
    startBtn.textContent = 'Start'
}

recognition.onerror = function(event) {
    startBtn.disabled = false
    startBtn.textContent = 'Start'
    diagnosticPara.textContent = 'Error: ' + event.error
}

startBtn.addEventListener('click', startSpeech)