<template>
  <section>
    <div class="option-buttons">
      <div
        v-for="image in images"
        :key="image"
        @click="getAnswer(image)">
        <input
          :id="image"
          type="radio"
          name="images"
          :value="image"
        />
        <label :for="image">
          <img :src="images[0]" :alt="image"/>
        </label>
      </div>
    </div>
    <p>{{ question }}</p>
  </section>
</template>

<script>
export default {
  props: [
    'images',
    'question',
    'getAnswer',
    'visualAnswer',
    'speech',
    'voices'
  ],
  data() {
    return {
      baseUrl: null
    }
  },

  watch: {
    question: {
      immediate: true,
      handler () {
        this.question && this.speak(this.question)
      }
    }
  }
}
</script>

<style lang="css" scoped>
  section {
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .option-buttons {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    justify-content: center;
  }

  .option-buttons > div {
    position: relative;
    margin: 1em;
    max-width: clamp(1em, 40%, 15em);
  }

  input {
    display: none;
  }

  label {
    box-shadow: 0 .35em 0 .05em var(--cl-grey-200);
    background-color: #FFF;
    width: 100%;
    height: 100%;
    border-radius: 2em;
    display: inline-block;
    border: solid #D1D1D1 1px;
    cursor: pointer;
    transition:
      box-shadow 200ms ease,
      transform 200ms ease;
  }

  input[type="radio"]:checked + label  {
    background-color: var(--cl-primary-200);
    box-shadow: 0 .2em 0 .05em var(--cl-primary-400);
    border: solid var(--cl-primary-300) 1px;
    transform: translateY(.2em);
  }

  label img {
    width: 100%;
    height: 100%;
    transform: scale(0.7);
  }

  p {
    font-size: 1.5em;
  }
</style>
