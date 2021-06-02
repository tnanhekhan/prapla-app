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
        :voices="voices"
        :speech="speech"
        :isSpeaking="isSpeaking"
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
    this.buildSpeech()
    this.buildRecognition()
  },
  methods: {
    startExercise() {
      this.counter = 0
      this.word = this.prapla[this.counter]
      this.speak('Druk op de knop en zeg mij na:')
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
