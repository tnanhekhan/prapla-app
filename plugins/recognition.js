import Vue from 'vue'

if (!Vue.recognition) {
  Vue.recognition = true
  Vue.mixin({
    data() {
      return {
        recognition: null,
        isRecording: false
      }
    },
    methods: {
      buildRecognition(login = false) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

        this.recognition = new SpeechRecognition()
        this.recognition.lang = 'nl-NL'
        this.recognition.continuous = false
        this.recognition.interimResults = false
        this.recognition.maxAlternatives = 1

        this.recognition.addEventListener('result', login ? this.loginOnResult : this.onResult)
        this.recognition.addEventListener('speechend', this.onUserSpeechEnd)
      },
      onUserSpeechEnd() {
        this.recognition.stop()
        this.isRecording = false
      },
      startSpeech(login = false) {
        this.isRecording = true
        this.recognition.start()
        if (!login) {
          this.targetPhrase = this.phrases[this.counter]
          document.body.classList.remove('correct', 'incorrect')
        }
      },
      onResult(event) {
        this.recognition.stop()
        this.isRecording = false
        const speechResult = event.results[0][0].transcript.toLowerCase()

        this.checkAnswer(speechResult, this.targetPhrase.word.toLowerCase())
      },
      async loginOnResult(event) {
        this.recognition.stop()
        this.isRecording = false

        const speechResult = event.results[0][0].transcript.toLowerCase()

        // Handle user's secret word for authentication
        try {
          // Use local login strategy for auth
          const res = await this.$axios.$get('https://cms-prapla.responsible-it.nl/api/list?spell=' + speechResult);
          await this.$store.dispatch('storeWordList', res.slice(1));
          this.$auth.setUser(res[0].student);
          this.speak(`Welkom, ${res[0].student}`)
        } catch (err) {
          this.speak(`Helaas herken ik: ${speechResult}, niet`)
          document.body.style.background = 'var(--cl-orange-100)'
        }
      }
    }
  })
}
