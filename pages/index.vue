<template>
  <div>
    <Header
      v-if="counter !== null"
      :empty="onExit"
      :counter="counter"
    />
    <main>
      <Word
        v-if="targetPhrase"
        :word="targetPhrase.word"
        :speech="speech"
        :voice="voices"
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
        :disabled="isRecording"
      />
    </main>
    <Complete v-if="showComplete"/>
    <ExitModal v-if="exitModal" :closeModal="closeModal" :sendToHome="sendToHome"/>
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
  async asyncData({ $axios }) {
    const { data } = await $axios.get('/exercise')
    return {
      phrases: data
    }
  },
  data() {
    return {
      speech: null,
      counter: null,
      audio: null,
      clap: null,
      progressValue: null,
      buttonIcon: null,
      isRecording: false,
      targetPhrase: '',
      voices: [],
      showComplete: false,
      exitModal: false,
    }
  },
  mounted() {
    this.buildSpeech()
    this.buildRecognition()
  },
  methods: {
    startExercise() {
      this.counter = 0
      this.targetPhrase = this.phrases[this.counter]
      this.speak('Druk op de knop en zeg mij na:')
    },
    changeWord() {
      this.counter ++
      this.targetPhrase = this.phrases[this.counter]

      // Show last question on exercise end
      if(!this.targetPhrase) {
        this.isCompleted()
        this.startFinishSound()
        this.targetPhrase = this.phrases[this.counter - 1]
      }
      
      this.targetPhrase.tries++
      this.progressValue = (this.counter / this.phrases.length) * 100

      document.body.style.background = 'var(--cl-purple-100)'
    },
    onExit() {
      this.exitModal = true
      this.speak('Weet je zeker dat je wilt stoppen?')
    },
    closeModal() {
      console.log('hello')
      this.exitModal = false
    },
    sendToHome() {
      console.log('hola')
      this.counter = null
      this.targetPhrase = null
      this.exitModal = false
    },
    setClickEvent() {
      return this.targetPhrase.tries === 2 || this.targetPhrase.correct 
        ? this.changeWord() 
        : this.startSpeech()
    },
    setButtonIcon() {
      if (this.isRecording) {
        return '/icons/Ear.svg'
      } else if (this.targetPhrase.correct || this.targetPhrase.tries === 2) {
        return '/icons/Next.svg'    
      } else {
        return '/icons/Microphone.svg'
      }
    },
    isCompleted() {
      this.progressValue = 100
      setTimeout(() => {
        this.showComplete = true
      }, 1000)
      document.body.style.background = '#F8F8FF'
    },
    startFinishSound() {
      this.audio = new Audio('/sounds/feedback_completed.mp3')
      this.clap = new Audio('/sounds/feedback_clapping.mp3')

      this.audio.play()
      
      this.clap.volume = 0.5
      this.clap.play()

      setTimeout( () => {
        setInterval(() => {
          if(this.clap.volume > 0.06) {
            this.clap.volume -= 0.05
          } else {
            this.clap.volume = 0
            clearInterval()
          }
        }, 100)
      }, 1300)  
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
    display: flex;
    justify-content: center;
  }

  button {
    appearance: none;
    border: none;
    color: white;
    background-color: var(--cl-purple-300);
    padding: 1rem 2rem;
    font-weight: bold;
  }

  .start-button {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
</style>
