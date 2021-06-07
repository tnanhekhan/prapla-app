<template>
  <div>
    <Header
      v-if="counter !== null"
      :empty="onEmpty"
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
      voices: []
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
      
      if (this.counter === this.phrases.length) {
        this.progressValue = 100
        setTimeout(() => {
          this.$router.push('/Complete')
        }, 1000)
        document.body.style.background = '#F8F8FF'
        return
      }

      this.targetPhrase.tries = 0
      this.targetPhrase = this.phrases[this.counter]
      this.progressValue = (this.counter / this.phrases.length) * 100

      document.body.style.background = 'var(--cl-purple-100)'
    },
    onEmpty() {
      this.counter = null
      this.targetPhrase = null
    },
    setClickEvent() {
      return this.targetPhrase.tries > 1 || this.targetPhrase.correct 
        ? this.changeWord() 
        : this.startSpeech()
    },
    setButtonIcon() {
      if (this.isRecording) {
        return '/icons/Ear.svg'
      } else if (this.targetPhrase.correct || this.targetPhrase.tries > 1) {
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
