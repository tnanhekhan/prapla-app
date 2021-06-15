import Vue from 'vue'

if (!Vue.checkAnswer) {
  Vue.checkAnswer = true
  Vue.mixin({
    methods: {
      checkAnswer(answer, correctAnswer) {
        document.body.classList.remove('correct', 'incorrect')
        if (answer === correctAnswer) {
          this.targetPhrase.correct = true
          this.audio = new Audio('/sounds/feedback_positive.mp3')
          document.body.classList.add('correct')
          setTimeout(() => this.giveFeedback(true), 500)
        } else {
          this.targetPhrase.tries++
          this.audio = new Audio('/sounds/feedback_fart.mp3')
          document.body.classList.add('incorrect')

          setTimeout(() => this.giveFeedback(), 500)
          
          if(this.targetPhrase.tries === 2) {
            this.phrases.push(this.targetPhrase)
          } else if (this.targetPhrase.tries > 3) {
            this.targetPhrase.correct = true
          }
        }

        this.audio.play() 
      }
    }
  })
}