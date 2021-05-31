<template>
  <section 
    @click="speak(word.phrase)"
  >
    <img :src="word.image" />
    <h2 >{{ word.phrase }}</h2>
  </section>
</template>

<script>
export default {
  props: {
    speak: {
      type: Function
    },
    image: {
      type: String
    },
    word: {
      type: Object
    }
  },
  watch: {
    word: {
      immediate: true,
      handler () {
        this.word && this.speak(this.word.phrase)
      }
    }
  }
}
</script>

<style lang="css" scoped>
  section {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70%;
  }

  img {
    height: 50%;
    object-fit: cover;
  }

  h2 {
    background: white;
    box-shadow: 0 3px #00000015;
    color: var(--cl-purple-400);
    cursor: pointer;
    font-size: clamp(2.5rem, 3vw, 3.5rem);
    font-weight: 600;
    padding: 1.5rem;
    width: 100vw;
  }
</style>
