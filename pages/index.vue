<template>
  <main>
    <Header />
    <Word 
      :image="image"
      :word="word"
    />
    <RecordButton 
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
      counter: 0,
      isRecording: false
    }
  },
  mounted() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    this.recognition = new SpeechRecognition()

    this.recognition.addEventListener('result', this.onResult)
    this.recognition.addEventListener('speechend', this.onSpeechEnd)
  },
  methods: {
    startSpeech() {
      this.isRecording = true
      document.body.style.background = '#fff'

      if (this.counter > this.words.length - 1) {
        this.counter = 0
      }

      this.word = this.words[this.counter].toLowerCase()
      this.image = this.images[this.counter]

      this.recognition.lang = 'nl-NL'
      this.recognition.continuous = false
      this.recognition.interimResults = false
      this.recognition.maxAlternatives = 1
      this.recognition.start()
    },
    onResult(event) {
      this.recognition.stop()
      this.isRecording = false
      const speechResult = event.results[0][0].transcript.toLowerCase()

      if (speechResult === this.word) {
        this.counter++
        document.body.style.background = '#89ec71'
      } else {
        document.body.style.background = '#ffc16f'
      }

      console.log(speechResult)
      console.log('Confidence: ' + event.results[0][0].confidence)
    },
    onSpeechEnd() {
      this.recognition.stop()
      this.isRecording = false
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
