<template>
  <main>
    <Header />
    <Word
      :image="image"
      :word="word"
    />
    <button
      v-if="counter === null"
      @click="startExercise"
    >Start oefening</button>
    <RecordButton
      v-else
      :isRecording="isRecording"
      :startSpeech="startSpeech" 
    />
  </main>
</template>

<script>
export default {
  data() {
    return {
      recognition: null,
      word: '',
      words: ['de hond', 'de kat', 'de vogel', 'de vis'],
      image: null,
      images: ['hond.svg', 'kat.svg', 'vogel.svg', 'vis.svg'],
      counter: null,
      isRecording: false,
      audio: null
    }
  },
  mounted() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    this.recognition = new SpeechRecognition()

    this.recognition.addEventListener('result', this.onResult)
    this.recognition.addEventListener('speechend', this.onSpeechEnd)
  },
  methods: {
    startExercise() {
      this.counter = 0
      this.word = this.words[this.counter].toLowerCase()
      this.image = this.images[this.counter]
    },
    startSpeech() {
      this.isRecording = true
      document.body.style.background = '#fff'

      this.word = this.words[this.counter].toLowerCase()
      this.image = this.images[this.counter]

      this.recognition.lang = 'nl-NL'
      this.recognition.continuous = false
      this.recognition.interimResults = this.isIOSDevice()
      this.recognition.maxAlternatives = 1
      this.recognition.start()
    },
    onResult(event) {
      this.recognition.stop()
      this.isRecording = false
      const speechResult = event.results[0][0].transcript.toLowerCase()

      if (speechResult === this.word) {
        this.counter++
        if (this.counter > this.words.length - 1) {
          this.counter = 0
          this.audio = new Audio('/sounds/feedback_completed.mp3')
        } else {
          this.audio = new Audio('/sounds/feedback_positive.mp3')
        }
        document.body.style.background = '#89ec71'
      } else {
        document.body.style.background = '#ffc16f'
        this.audio = new Audio('/sounds/feedback_negative.mp3')
      }
      this.audio.play()

      console.log(speechResult)
      console.log('Confidence: ' + event.results[0][0].confidence)
    },
    onSpeechEnd() {
      this.recognition.stop()
      this.isRecording = false
    },
    isIOSDevice() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    }
  }
}
</script>

<style lang="css" scoped>
  main {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
  }
</style>
