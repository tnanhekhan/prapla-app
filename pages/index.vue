<template>
  <div>
    <Header
      v-if="counter !== null"
      :empty="onExit"
      :counter="counter"
    />
    <main>
      <Word
        v-if="targetPhrase && level === 1"
        :word="targetPhrase.word"
        :speech="speech"
        :voice="voices"
      />
      <VisualExercise
        v-if="targetPhrase && level === 3"
        :question="targetPhrase.question"
        :images="targetPhrase.images"
        :voice="voices"
        :visualAnswer="visualAnswer"
        :getAnswer="getAnswer"
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
    <Complete v-if="showComplete" :nextExercise="nextExercise"/>
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
  // Get the exercise asynchronously
  async asyncData({ $axios, $auth }) {
    const { data } = await $axios.post('/exercise', { user: $auth.user })
    let exercises = []

    data.forEach(exercise => {
      exercises.push({
        phrases: exercise.phrases, 
        level: exercise.level, 
        completed: exercise.completed
      })
    })
    return {
      exercises: exercises
    }
  },
  data() {
    return {
      bakList: null,
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
      visualAnswer: null,
      instructions: [
        'Druk op de knop en zeg mij na:',
        'Druk op de knop en doe iets anders:',
        'Klik op het juiste antwoord:',
        'Klik op de knop en beantwoord de vraag:'
      ],
      level: 1,
      phrases: null
    }
  },
  mounted() {
    // Setup the Web Speech API
    this.buildSpeech()
    this.buildRecognition()

    fetch('/data/data.json')
      .then(response => response.json())
      .then(data => {
        this.bakList = data
      })
      .catch(err => console.log(err)) 
  },
  middleware: 'auth',
  methods: {
    // Start the exercise
    startExercise() {
      this.counter = 0

      this.exercises.forEach(exercise => {
        if(exercise.level === this.level) {
          this.phrases = exercise.phrases
        }
      })

      this.targetPhrase = this.phrases[this.counter]
      this.speak(this.instructions[this.level - 1])
    },
    // Go to the next word
    changeWord() {
      this.counter++
      this.targetPhrase.tries++
      this.targetPhrase = this.phrases[this.counter]

      // Show last question on exercise end
      if(!this.targetPhrase) {
        this.isCompleted()
        this.startFinishSound()
        this.targetPhrase = this.phrases[this.counter - 1]
      }
      
      this.progressValue = (this.counter / this.phrases.length) * 100

      document.body.classList.remove('correct', 'incorrect')
    },
    onExit() {
      this.exitModal = true
      this.speak('Weet je zeker dat je wilt stoppen?')
    },
    closeModal() {
      this.exitModal = false
    },
    sendToHome() {
      this.counter = null
      this.targetPhrase = null
      this.exitModal = false
      document.body.classList.remove('correct', 'incorrect')
    },
    getAnswer() {
      const inputVal = document.querySelector('input[name="images"]:checked')  
      if(inputVal){
        this.visualAnswer = inputVal.value
      }
    },
    checkMultipleAnswer(answer) {
      this.counter++
      this.progressValue = (this.counter / this.phrases.length) * 100

      if(this.targetPhrase.correctAnswer === answer) {
        this.targetPhrase.correct = true;
        this.targetPhrase.tries++
        this.audio = new Audio('/sounds/feedback_positive.mp3')
        document.body.classList.add('correct')
        setTimeout(() => this.giveFeedback(), 1000)

      } else {
        this.targetPhrase.tries++
        this.audio = new Audio('/sounds/feedback_negative.mp3')
        document.body.classList.add('incorrect')
      }

      var inputFields = document.getElementsByName("images")
      for(var i=0;i<inputFields.length;i++) inputFields[i].disabled = true

      this.audio.play()       
    },
    nextQuestion() {
      
      this.targetPhrase = this.phrases[this.counter]
      document.body.classList.remove('correct', 'incorrect')

      var inputFields = document.getElementsByName("images")
      for(var i=0;i<inputFields.length;i++) {
        inputFields[i].checked = false
        inputFields[i].disabled = false
      }
    },
    setClickEvent() {
      if(this.targetPhrase.tries === 1 && this.targetPhrase.correctAnswer) {
         return this.nextQuestion()
      } else if(this.targetPhrase.correctAnswer) {
        return this.checkMultipleAnswer(this.visualAnswer)
      } else if(this.targetPhrase.tries === 2 || this.targetPhrase.correct ) {
       return this.changeWord()
      } else {
        return this.startSpeech()
      }
    },
    setButtonIcon() {
      const icons = {
        '/icons/Ear.svg': this.isRecording,
        '/icons/Next.svg': this.targetPhrase.tries === 1 && this.targetPhrase.correctAnswer || this.targetPhrase.correct || this.targetPhrase.tries === 2,
        '/icons/Microphone.svg': this.targetPhrase.word && !this.targetPhrase.correct,
        '/icons/Check.svg': this.targetPhrase.correctAnswer
      }
      
      for(const [key, value] of Object.entries(icons)) {
        console.log('entry: ', key, value)
        if (value !== false && value && value !== undefined) {
          console.log('hey', key, value)
          return key;
        }
      }
    },
    // After finishing each phrase
    isCompleted() {
      this.progressValue = 100
      setTimeout(() => {
        this.showComplete = true
        // this.$axios.post('/exercise/completed', {
        //   user: this.$auth.user
        // })
      }, 1000)
    },
    nextExercise() {
      this.level = 3
      this.showComplete = false
      this.exercises.forEach(exercise => {
        if(exercise.level === this.level) {
          this.phrases = exercise.phrases
        }
      })
      this.counter = 0
      this.progressValue = (this.counter / this.phrases.length) * 100
      this.targetPhrase = this.phrases[this.counter]
    },
    startFinishSound() {
      this.audio = new Audio('/sounds/feedback_completed.mp3')
      this.clap = new Audio('/sounds/feedback_clapping.mp3')

      this.clap.volume = 0.5
      this.audio.play()
      this.clap.play()

      // Slowly lower the volume of the claps to make it less abrupt
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
    background-color: var(--cl-primary-300);
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
