<template>
  <section>
    <img :src="image" />
    <p @click="speak">{{ word }}</p>
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
  p {
    cursor: pointer;
    font-size: clamp(2rem, 3vw, 2.5rem);
    font-weight: 600;
  }
</style>