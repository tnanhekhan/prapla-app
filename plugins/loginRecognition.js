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
      // Setup the Web Speech API's speech recognition for login
      buildLoginRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

        this.recognition = new SpeechRecognition()
        this.recognition.lang = 'nl-NL'
        this.recognition.continuous = false
        this.recognition.interimResults = false
        this.recognition.maxAlternatives = 1
    
        this.recognition.addEventListener('result', this.loginOnResult)
        this.recognition.addEventListener('speechend', this.loginOnUserSpeechEnd)
      },
      // Stop listining on end of user speech
      loginOnUserSpeechEnd() {
        this.recognition.stop()
        this.isRecording = false
      },
      // Start listining for user speech input
      loginStartSpeech() {
        this.isRecording = true
        this.recognition.start()
      },
      // Handle login when result has been recognized
      async loginOnResult (event) {
        this.recognition.stop()
        this.isRecording = false
        
        const speechResult = event.results[0][0].transcript.toLowerCase()

        // Handle user's secret word for authentication
        try {
          // Use local login strategy for auth
          const { data: user } = await this.$auth.loginWith('local', {
            data: {
              secret: speechResult
            }
          })

          this.$auth.setUser(user)
          this.speak(`Welkom, ${user.name.firstname}`)
        } catch (err) {
          this.speak(`Helaas herken ik: ${speechResult}, niet`)
          document.body.style.background = 'var(--cl-orange-100)'

        }
      }
    }
  })
}