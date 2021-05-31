<template>
  <section class="prapla-container">
    <img :src="image" />
    <section
      class="word-container"
      @click="speak(word)"
    >
      <h2 >{{ word }}</h2>
    </section>
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
      type: String
    }
  },
  watch: {
    word: {
      immediate: true,
      deep: true,
      handler () {
        this.word && this.speak(this.word)
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .prapla-container {
    width: 100%;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .prapla-container img {
    max-width: 60vw;
    height: 60vw;
  }
  .word-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    grid-gap: 1em;
    gap: 1em;
    padding: 1rem 0;
    margin-top: 2rem;
    background-color: white;
  }
  h2 {
    cursor: pointer;
    font-size: clamp(2rem, 3vw, 2.5rem);
    font-weight: 600;
  }
</style>
