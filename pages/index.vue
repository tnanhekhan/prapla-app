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
        :word="word"
        :speak="speak"
      />
      <button
        class="start-button"
        v-if="counter === null"
        @click="startExercise"
      >Start oefening</button>
      <GlobalButton
        v-else
        :clickEvent="word.correct ? changeWord : startSpeech"
        :buttonIcon="buttonIcon"
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
          image: 'hond.svg',
          correct: false
        },
        {
          phrase: 'de kat',
          image: 'kat.svg',
          correct: false
        },
        {
          phrase: 'de vogel',
          image: 'vogel.svg',
          correct: false
        },
        {
          phrase: 'de vis',
          image: 'vis.svg',
          correct: false
        }
      ],
      counter: null,
      isRecording: false,
      audio: null,
      clap: null,
      progressValue: null,
      voices: [],
      showResultScreen: false,
      buttonIcon: null
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
  updated() {
    if (!this.word.correct && !this.isRecording) {
        this.buttonIcon = '/icons/Microphone.svg'
    } else if (!this.word.correct && this.isRecording) {
        this.buttonIcon = '/icons/Listen.svg'
    } else {
        this.buttonIcon = '/icons/Next.svg'
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
        this.word.correct = true
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

      // let correctPhrases
      // this.prapla.forEach(phrase => {
      //   if(phrase.correct) {
      //     correctPhrases++
      //     if (correctPhrases.length === this.prapla.length) {
      //       this.audio = new Audio('/sounds/feedback_completed.mp3')
      //       this.clap = new Audio('/sounds/feedback_clapping.mp3')
      //       this.showResultScreen = true
      //     }
      //   }
      // })
      // if (this.progressValue === this.prapla.length - 1) {
      //
      // }

      this.audio.play()

      if(this.clap) {
        this.clap.volume = 0.5
        this.clap.play()

        function fadeOut() {
          setInterval(() => {
            if(this.clap.volume > 0.06) {
              this.clap.volume -= 0.05
            } else {
              this.clap.volume = 0
              clearInterval(fadeOut)
            }
          }, 100)
        }

        setTimeout( () => {
          fadeOut()
        }, 1300)
      }

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
    changeWord() {
      this.counter ++
      
      if (this.counter === this.prapla.length) {
        this.progressValue = 100
        setTimeout(() => {
          this.$router.push('/Complete')
        }, 1000)
        document.body.style.background = '#F8F8FF'
        return
      }
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
    background-color: var(--cl-purple-300);
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
