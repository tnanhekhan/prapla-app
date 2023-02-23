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
        :image="targetPhrase.images[0]"
        :speech="speech"
        :voice="voices"
      />
      <VisualExercise
        v-if="targetPhrase && level === 2"
        :question="targetPhrase.question"
        :images="targetPhrase.images"
        :speech="speech"
        :voice="voices"
        :visualAnswer="visualAnswer"
        :getAnswer="getAnswer"
      />
      <GlobalButton
        class="start-button"
        v-if="counter === null"
        :clickEvent="startExercise"
        :buttonText="'Start oefening'"
      />
      <GlobalButton
        v-else
        :clickEvent="setClickEvent"
        :buttonIcon="setButtonIcon()"
        :class="[isRecording ? 'listen' : '', level === 2 && !visualAnswer ? 'inactiveVisual' : '']"
        :disabled="showComplete || isRecording || (level === 2 && !visualAnswer)"
      />
    </main>
    <Complete
      v-if="showComplete"
      :nextExercise="nextExercise"
      :sendToHome="sendToHome"
      :exercises="exercises"
    />
    <ExitModal
      v-if="exitModal"
      :closeModal="closeModal"
      :sendToHome="sendToHome"
    />
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
  async asyncData({$axios, $auth, store}) {
    let data = store.getters['getWordList'];
    let data2 = data.map(exercise => {
      return {
        "_id": exercise.id,
        "level": 1,
        "completed": false,
        "phrases": data.map(exercise => {
          return {
            "images": [exercise.image],
            "word": exercise.word,
            "correct": false,
            "tries": 0
          }
        })
      }
    });


    let exercises = []
    data2.forEach(exercise => {
      exercises.push({
        phrases: exercise.phrases,
        level: exercise.level,
        completed: exercise.completed
      })
    });

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
        'Klik op het juiste antwoord:',
        'Druk op de knop en doe iets anders:',
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

    // Array of words in categories, the Baklist
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
        if (exercise.level === this.level) {
          this.phrases = exercise.phrases
        }
      });

      this.targetPhrase = this.phrases[this.counter]
      console.log(this.targetPhrase);
      this.speak(this.instructions[this.level - 1])
    },
    // Go to the next word
    changeWord() {
      this.counter++
      this.targetPhrase.tries++
      this.targetPhrase = this.phrases[this.counter]

      // Show last question on exercise end
      if (!this.targetPhrase) {
        this.isCompleted()
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
      // Get all the users exercises
      this.exercises.forEach(exercise => {
        // Set all exercises to incomplete
        exercise.completed = false
        exercise.phrases.forEach(phrase => {
          // Reset all the phrases
          phrase.correct = false
          phrase.tries = 0
        })
      })
      this.level = 1
      this.progressValue = 0
      this.counter = null
      this.targetPhrase = null

      // Close all the modals
      this.exitModal = false
      this.showComplete = false

      // Delete the red/green background
      document.body.classList.remove('correct', 'incorrect')
    },
    getAnswer() {
      const inputVal = document.querySelector('input[name="images"]:checked')
      if (inputVal) {
        this.visualAnswer = inputVal.value
      }
    },
    checkMultipleAnswer(answer) {
      this.checkAnswer(answer, this.targetPhrase.correctAnswer)

      if (this.targetPhrase.tries === 2 && this.targetPhrase.correctAnswer || this.targetPhrase.correctAnswer && this.targetPhrase.correct) {
        const inputFields = document.getElementsByName("images")
        for (let i = 0; i < inputFields.length; i++) inputFields[i].disabled = true
      }
    },
    nextQuestion() {
      this.counter++
      this.progressValue = (this.counter / this.phrases.length) * 100
      this.visualAnswer = null
      document.body.classList.remove('correct', 'incorrect')

      if (this.progressValue === 100) {
        return this.isCompleted()
      }

      this.targetPhrase = this.phrases[this.counter]
      const inputFields = document.getElementsByName("images")
      for (let i = 0; i < inputFields.length; i++) {
        inputFields[i].checked = false
        inputFields[i].disabled = false
      }
    },
    setClickEvent() {
      if (this.targetPhrase.tries === 2 && this.targetPhrase.correctAnswer || this.targetPhrase.correctAnswer && this.targetPhrase.correct) {
        return this.nextQuestion()
      } else if (this.targetPhrase.correctAnswer) {
        return this.checkMultipleAnswer(this.visualAnswer)
      } else if (this.targetPhrase.tries === 2 || this.targetPhrase.correct) {
        return this.changeWord()
      } else {
        return this.startSpeech()
      }
    },
    setButtonIcon() {
      const icons = {
        '/icons/Ear.svg': this.isRecording,
        '/icons/Next.svg': this.targetPhrase.correct || this.targetPhrase.tries === 2,
        '/icons/Microphone.svg': this.targetPhrase.word && !this.targetPhrase.correct,
        '/icons/Check.svg': this.targetPhrase.correctAnswer && !this.targetPhrase.correct
      }

      for (const [key, value] of Object.entries(icons)) {
        if (value !== false && value && value !== undefined) return key;
      }
    },
    // After finishing each phrase
    isCompleted() {
      this.progressValue = 100
      this.exercises.forEach(exercise => {
        if (exercise.level === this.level) {
          exercise.completed = true
        }
      })
      setTimeout(() => {
        this.showComplete = true
        this.startFinishSound()
      }, 500)
    },
    nextExercise() {
      this.level = 2
      this.showComplete = false
      this.exercises.forEach(exercise => {
        if (exercise.level === this.level) {
          this.phrases = exercise.phrases
        }
      })
      this.counter = 0
      this.progressValue = (this.counter / this.phrases.length) * 100
      this.targetPhrase = this.phrases[this.counter]
      this.speak(this.instructions[this.level - 1])
    },
    startFinishSound() {
      this.audio = new Audio('/sounds/feedback_completed.mp3')
      this.clap = new Audio('/sounds/feedback_clapping.mp3')

      this.clap.volume = 0.5
      this.audio.play()
      this.clap.play()

      // Slowly lower the volume of the claps to make it less abrupt
      setTimeout(() => {
        setInterval(() => {
          if (this.clap.volume > 0.06) {
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
  --size: 10rem;
}
</style>
