<template>
  <section>
    <button v-for="image in images" :key="image"> 
        <img :src="image + '.jpg'" :alt="image"/>
        <span>{{ image }}<span/>
    </button>

    <GlobalButton 
        :clickEvent="setClickEvent"
        :buttonIcon="setButtonIcon()" />
  </section>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    setClickEvent() {
      return this.targetPhrase.tries === 2 || this.targetPhrase.correct 
        ? this.nextExercise()
        : this.selectChoice()
    },
    setButtonIcon() {
      if (this.targetPhrase.correct || this.targetPhrase.tries === 2) {
        return '/icons/Next.svg'    
      } else  {
        return '/icons/Done.svg'
      }
    },
  }
}
</script>

<style lang="css" scoped>
    button span {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
    }
</style>
