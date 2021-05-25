<template>
  <section>
    <figure></figure>
    <p class="word">{{ word }}</p>
  </section>
</template>

<script>
export default {
  props: {
    word: {
      type: String
    }
  }
}
</script>

<style lang="css" scoped>
  p {
    font-size: clamp(2rem, 3vw, 2.5rem);
    font-weight: 600;
  }
</style>