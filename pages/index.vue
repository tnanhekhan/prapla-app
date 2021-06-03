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
        :clickEvent="setClickEvent"
        :buttonIcon="setButtonIcon()"
        :class="isRecording ? 'listen' : ''"
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
          correct: false,
          false: 0
        },
        {
          phrase: 'de kat',
          image: 'kat.svg',
          correct: false,
          false: 0
        },
        {
          phrase: 'de vogel',
          image: 'vogel.svg',
          correct: false,
          false: 0
        },
        {
          phrase: 'de vis',
          image: 'vis.svg',
          correct: false,
          false: 0
        }
      ],
      counter: null,
      isSpeaking: false,
      isRecording: false,
      audio: null,
      clap: null,
      progressValue: null,
      voices: [],
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
    this.speech.addEventListener('end', this.onSpeakEnd)

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
      this.speak('Druk op de knop en zeg mij na:')
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
        setTimeout(() => this.giveFeedback(), 1000)
      } else {
        this.word.false++
        document.body.style.background = '#FFD2D2'
        this.audio = new Audio('/sounds/feedback_negative.mp3')
        setTimeout(() => this.giveFeedback(speechResult), 1000)
        
        if(this.word.false > 1) {
          this.prapla.push(this.word)
        }
      }

      //TODO If every word is completed, play different sound

      // let correctPhrases
      // this.prapla.forEach(phrase => {
      //   if(phrase.correct) {
      //     correctPhrases++
      //     if (correctPhrases.length === this.prapla.length) {
      //       this.audio = new Audio('/sounds/feedback_completed.mp3')
      //       this.clap = new Audio('/sounds/feedback_clapping.mp3')
      //   
      //     }
      //   }
      // })
      if (this.progressValue === this.prapla.length - 1) {
        this.audio = new Audio('/sounds/feedback_completed.mp3')
        this.clap = new Audio('/sounds/feedback_clapping.mp3')
      }

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
    onSpeakEnd() {
      this.isSpeaking = false
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

      this.word.false = 0
      this.word = this.prapla[this.counter]
      this.progressValue = (this.counter / this.prapla.length) * 100

      document.body.style.background = 'var(--cl-purple-100)'
    },
    speak(phrase, speed = .8) {
      this.speech.voice = this.voices.filter(voice => voice.name === 'Xander')[0]
      this.speech.lang = 'nl-NL'
      this.speech.rate = speed
      this.speech.text = phrase
      this.isSpeaking = true
      speechSynthesis.speak(this.speech)
    },
    giveFeedback(result = undefined) {
      if (result) {
        this.speak(`Helaas hoorde ik: ${result}`)
        this.speak(`Ik wíl graag horen: ${this.word.phrase}`)
      } else {
        this.speak(this.randomText())
      }
    },
    randomText() {
      const phrases = [
        'Goed gedaan!',
        'Netjes!',
        'Je doet het súper!',
        'Helemaal goed!',
        'Je bent een topper!'
      ]
      const maximumNumber = phrases.length
      const randomNumber = Math.floor(Math.random() * maximumNumber)

      return phrases[randomNumber]
    },
    onEmpty() {
      this.counter = null
      this.word = null
    },
    setClickEvent() {
      return this.word.false > 1 || this.word.correct ? this.changeWord() : this.startSpeech()
    },
    setButtonIcon() {
      if (this.isRecording) {
        return '/icons/Ear.svg'
      } else if (this.word.correct || this.word.false > 1) {
        return '/icons/Next.svg'    
      } else {
        return '/icons/Microphone.svg'
      }
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
    display: flex;
    align-items: top;
    justify-content: center;
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
