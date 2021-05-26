<template>
  <section>
    <img :src="image" />
    <p @click="textToSpeech">{{ word }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      speech: null
    }
  },
  props: {
    image: {
      type: String
    },
    word: {
      type: String
    }
  },
  watch: {
    word: {
      immediate: true,
      deep: true,
      handler () {
        this.textToSpeech()
      }
    }
  },
  mounted() {
    const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance

    this.speech = new SpeechSynthesisUtterance()
    this.speech.lang = 'nl-NL'
    this.speech.rate = .8
  },
  methods: {
    textToSpeech() {
      if (this.speech) {
        this.speech.text = this.word
        speechSynthesis.speak(this.speech)
      }
    }
  }
}
</script>

<style lang="css" scoped>
  p {
    cursor: pointer;
    font-size: clamp(2rem, 3vw, 2.5rem);
    font-weight: 600;
  }
</style>