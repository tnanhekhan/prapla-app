<template>
  <main>
    <Header />
    <ProgressBar 
      v-if="counter !== null"
    />
    <Word
      :image="word.image"
      :word="word.phrase"
    />
    <button
      v-if="counter === null"
      @click="startExercise"
    >Start oefening</button>
    <RecordButton
      v-else
      :isRecording="isRecording"
      :startSpeech="startSpeech" 
    />
    <button
      v-if="this.counter > 0"
      class="navigate"
      id="prev"
      @click="changeWord(-1)"
    >Vorige</button>
    <button
      v-if="this.counter !== null && this.counter < this.prapla.length - 1"
      class="navigate"
      id="next"
      @click="changeWord(+1)"
    >Volgende</button>
  </main>
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
      audio: null
    }
  },
  mounted() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance

    this.recognition = new SpeechRecognition()
    this.recognition.lang = 'nl-NL'
    this.recognition.continuous = false
    this.recognition.interimResults = this.isIOSDevice()
    this.recognition.maxAlternatives = 1

    this.speech = new SpeechSynthesisUtterance()
    this.speech.lang = 'nl-NL'
    this.speech.rate = .8

    this.recognition.addEventListener('result', this.onResult)
    this.recognition.addEventListener('speechend', this.onSpeechEnd)
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
        document.body.style.background = '#89ec71'
      } else {
        document.body.style.background = '#ffc16f'
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
        this.speech.text = 'Zeg mij maar na:'
        speechSynthesis.speak(this.speech)
      }
    },
    changeWord(change) {
      this.counter += change
      this.word = this.prapla[this.counter]
      this.updateProgressBar()

      document.body.style.background = '#fff'
    },
    giveFeedback(result) {
      this.speech.text = `Helaas hoorde ik: ${result}`
      speechSynthesis.speak(this.speech)

      this.speech.text = `Ik wíl graag horen: ${this.word.phrase}`
      speechSynthesis.speak(this.speech)
    },
    isIOSDevice() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    },
    updateProgressBar() {
      const progressBar = document.querySelector('.progress-bar')
      const completePct = (this.counter / this.prapla.length) * 100
      progressBar.style.width = completePct + '%'
    }
  }
}
</script>

<style lang="css" scoped>
  main {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
  }

  .navigate {
    --padding: 10%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .navigate#prev {
    left: var(--padding);
  }

  .navigate#next {
    right: var(--padding);
  }
</style>
