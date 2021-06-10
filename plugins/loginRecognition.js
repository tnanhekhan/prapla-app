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
          const { data: user } = await this.$auth.loginWith('local', { data: { secret: speechResult } })
          this.$auth.setUser(user)
          this.speak(`Welkom, ${user.name.firstname}`)
          document.body.style.background = '#FFF'
        } catch (err) {
          this.speak(`Helaas herken ik: ${speechResult}, niet`)
          document.body.style.background = 'var(--cl-orange-100)'
        }

        console.log(this.$auth.user)
  
        console.log(speechResult)
        console.log('Confidence: ' + event.results[0][0].confidence)
      }
    }
  })
}