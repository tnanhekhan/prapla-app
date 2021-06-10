import Vue from 'vue'

if (!Vue.login) {
  Vue.login = true
  Vue.mixin({
    data() {
      return {
        recognition: null,
        isRecording: false
      }
    },
    methods: {
      buildLoginRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

        this.recognition = new SpeechRecognition()
        this.recognition.lang = 'nl-NL'
        this.recognition.continuous = false
        this.recognition.interimResults = false
        this.recognition.maxAlternatives = 2
    
        this.recognition.addEventListener('result', this.loginOnResult)
        this.recognition.addEventListener('speechend', this.loginOnUserSpeechEnd)
      },
      loginOnUserSpeechEnd() {
        this.recognition.stop()
        this.isRecording = false
      },
      loginStartSpeech() {
        this.isRecording = true
        this.recognition.start()
      },
      async loginOnResult (event) {
        this.recognition.stop()
        this.isRecording = false
        const speechResult = event.results[0][0].transcript.toLowerCase()

        try {
          const user = await this.$auth.loginWith('local', { data: { secret: speechResult } })
          if (user === null) throw 'Not authorized'
          this.speak(`Welkom, ${user.name.firstname}`)
          this.$router.push('/')
        } catch (err) {
          if(err.response) {
            this.speak(`Helaas herken ik: ${speechResult}, niet`)
            document.body.style.background = '#FFD2D2'
          }
        }
  
        console.log(speechResult)
        console.log('Confidence: ' + event.results[0][0].confidence)
      },
    }
  })
}