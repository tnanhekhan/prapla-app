import Vue from 'vue'

if (!Vue.recognition) {
  Vue.recognition = true
  Vue.mixin({
    methods: {
      buildRecognition () {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

        this.recognition = new SpeechRecognition()
        this.recognition.lang = 'nl-NL'
        this.recognition.continuous = false
        this.recognition.interimResults = false
        this.recognition.maxAlternatives = 2
    
        this.recognition.addEventListener('result', this.onResult)
        this.recognition.addEventListener('speechend', this.onUserSpeechEnd)
      },
      onUserSpeechEnd() {
        this.recognition.stop()
        this.isRecording = false
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
    }
  })
}