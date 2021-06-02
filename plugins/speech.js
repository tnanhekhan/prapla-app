import Vue from "vue"

if (!Vue.speech) {
  Vue.speech = true
  Vue.mixin({
    methods: {
      buildSpeech() {
        const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance
        const speechSynthesis = window.speechSynthesis || window.webkitspeechSynthesis

        this.speech = new SpeechSynthesisUtterance()
        this.voices = speechSynthesis.getVoices()
    
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.addEventListener('voiceschanged', () => {
            this.voices = speechSynthesis.getVoices()
          })
        }
      },
      speak(phrase, speed = .8) {
        this.speech.voice = this.voices.filter(voice => voice.name === 'Xander')[0]
        this.speech.lang = 'nl-NL'
        this.speech.rate = speed
        this.speech.text = phrase
        this.isSpeaking = true
        speechSynthesis.speak(this.speech)
      },
      giveFeedback(result = undefined) {
        if (result) {
          this.speak(`Helaas hoorde ik: ${result}`)
          this.speak(`Ik wíl graag horen: ${this.word.phrase}`)
        } else {
          this.speak(this.randomText())
        }
      },
      randomText() {
        const phrases = [
          'Goed gedaan!',
          'Netjes!',
          'Je doet het súper!',
          'Helemaal goed!',
          'Je bent een topper!'
        ]
        const maximumNumber = phrases.length
        const randomNumber = Math.floor(Math.random() * maximumNumber)
  
        return phrases[randomNumber]
      },
    }
  })
}