<template>
  <section>
    <img
      :src="`${baseUrl}${word}.svg`"
      @click="speak(word, .7)"
    />
    <h2 @click="speak(word, .7)">
      {{ word }}
    </h2>
  </section>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.CLOUDINARY_BASE_URL
    }
  },
  props: {
    speech: {
      type: SpeechSynthesisUtterance
    },
    voices: {
      type: Array
    },
    word: {
      type: String
    }
  },
  watch: {
    targetPhrase: {
      immediate: true,
      handler () {
        this.word && this.speak(this.word, .7)
      }
    }
  }
}
</script>

<style lang="css" scoped>
  section {
    align-items: center;
    background: white;
    border-radius: 1em;
    box-shadow: 0 .125em .125em .125em #00000015;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70%;
    width: clamp(15rem, 90%, 30rem);
  }

  img {
    cursor: pointer;
    height: 50%;
    object-fit: cover;
    max-width: 30rem;
  }

  h2 {
    border-bottom: .1em solid var(--cl-purple-400);
    color: #4b4b4b;
    cursor: pointer;
    font-size: clamp(2.5rem, 3vw, 3.5rem);
    font-weight: 500;
    padding: 1.5rem 0 .25rem;
    width: max-content;
  }
</style>
