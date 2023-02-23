<template>
  <section>
    <img
      :src="`${image}`"
      @click="speak(word, .7)"
    />

    <h2
      v-if="article"
      @click="speak(word, .7)"
    >
      <span>{{ article }}</span>
      {{ noun }}
    </h2>

    <h2
      v-else
      @click="speak(word, .7)"
    >
      {{ word }}
    </h2>
  </section>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.CLOUDINARY_BASE_URL,
      article: null,
      noun: null
    }
  },
  props: ['speech', 'voices', 'word', 'image'],
  watch: {
    word: {
      immediate: true,
      handler () {
        this.word && this.speak(this.word, .7)
        this.splitWord()
      }
    }
  },
  methods: {
    // Splits the article from a phrase so we can style it differently.
    splitWord() {
      if (this.word.includes('De ') || this.word.includes('Het ')) {
        this.article = this.word.match(/(De|Het)/g)[0]
        this.noun = this.word.match(/(?<=De|Het).*/ms)[0]
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
    border: 2px solid var(--cl-grey-100);
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
    color: #4b4b4b;
    cursor: pointer;
    font-size: clamp(2.5rem, 3vw, 3.5rem);
    font-weight: 500;
    padding: 1.5rem 0 .25rem;
    width: max-content;
  }

  h2 span {
    border-bottom: .1em solid var(--cl-primary-300);
    color: var(--cl-primary-300);
  }
</style>
