<template>
  <div>
    <Header
      v-if="counter !== null"
      :empty="onEmpty"
      :counter="counter"
    />
    <main>
      <Word 
        v-if="word"
        :image="word.image"
        :word="word.phrase"
        :speak="speak"
      />
      <button 
        class="start-button"
        v-if="counter === null"
        @click="startExercise"
      >Start oefening</button>
      <RecordButton
        v-else
        :isRecording="isRecording"
        :startSpeech="startSpeech"
      />
    </main>
    <footer>
      <ProgressBar
        v-if="counter !== null"
        :progressValue="progressValue"
      />
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recognition: null,
      speech: null,
      word: '',
      prapla: [
        {
          phrase: 'de hond',
          image: 'hond.svg'
        },
        {
          phrase: 'de kat',
          image: 'kat.svg'
        },
        {
          phrase: 'de vogel',
          image: 'vogel.svg'
        },
        {
          phrase: 'de vis',
          image: 'vis.svg'
        }
      ],
      counter: null,
      isRecording: false,
      audio: null,
      progressValue: null,
      voices: []
    }
  },
  mounted() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance
    const speechSynthesis = window.speechSynthesis || window.webkitspeechSynthesis

    this.recognition = new SpeechRecognition()
    this.recognition.lang = 'nl-NL'
    this.recognition.continuous = false
    this.recognition.interimResults = false
    this.recognition.maxAlternatives = 2

    this.speech = new SpeechSynthesisUtterance()
    this.voices = speechSynthesis.getVoices()

    this.recognition.addEventListener('result', this.onResult)
    this.recognition.addEventListener('speechend', this.onSpeechEnd)

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        this.voices = speechSynthesis.getVoices()
      })
    }
  },
  methods: {
    startExercise() {
      this.counter = 0
      this.word = this.prapla[this.counter]
      this.textToSpeech()
    },

    startSpeech() {
      this.isRecording = true
      this.word = this.prapla[this.counter]
      this.recognition.start()
    },
    onResult(event) {
      this.recognition.stop()
      this.isRecording = false
      const speechResult = event.results[0][0].transcript.toLowerCase()

      if (speechResult === this.word.phrase) {
        this.audio = new Audio('/sounds/feedback_positive.mp3')
        document.body.style.background = '#C3E6CF'
      } else {
        document.body.style.background = '#FFD2D2'
        this.audio = new Audio('/sounds/feedback_negative.mp3')
        setTimeout(() => {
          this.giveFeedback(speechResult)
        }, 1000)
      }

      //TODO If every word is completed, play different sound
      if (false) {
        this.audio = new Audio('/sounds/feedback_completed.mp3')
      }

      this.audio.play()

      console.log(speechResult)
      console.log('Confidence: ' + event.results[0][0].confidence)
    },
    onSpeechEnd() {
      this.recognition.stop()
      this.isRecording = false
    },
    textToSpeech() {
      if (this.speech) {
        this.speak('Zeg mij maar na:')
      }
    },
    changeWord(change) {
      this.counter += change
      this.word = this.prapla[this.counter]
      this.progressValue = (this.counter / this.prapla.length) * 100

      document.body.style.background = '#F8F8FF'
    },
    speak(phrase) {
      this.speech.voice = this.voices.filter(voice => voice.name === 'Xander')[0]
      this.speech.lang = 'nl-NL'
      this.speech.rate = .8
      this.speech.text = phrase
      speechSynthesis.speak(this.speech)
    },
    giveFeedback(result) {
      this.speak(`Helaas hoorde ik: ${result}`)
      this.speak(`Ik wíl graag horen: ${this.word.phrase}`)
    },
    onEmpty() {
      this.counter = null
      this.word = null
    }
  }
}
</script>

<style lang="css" scoped>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 85vh;
    justify-content: space-evenly;
    text-align: center;
  }

  footer {
    height: 5vh;
    position: relative;
  }

  button {
    appearance: none;
    border: none;
    color: white;
    background-color: #9E99EE;
    padding: 1rem 2rem;
    border-radius: 30px;
    font-weight: bold;
  }

  .start-button {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
</style>
