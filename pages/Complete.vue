<template>
  <main>
    <h1> Nog <span>{{ needed }}</span> oefening te gaan </h1>
    <ProgressCircle :amount="amount" :total="total" />
    <GlobalButton 
      :buttonIcon="buttonIcon"/>
  </main>
</template>

<script>
export default {
  name: "Complete",
  data() {
    return {
      needed: 1,
      total: 3,
      amount: 2,
      buttonIcon: '/icons/Next.svg'
    }
  }
}

  //TODO If every word is completed, play different sound

  // let correctPhrases
  // this.prapla.forEach(phrase => {
  //   if(phrase.correct) {
  //     correctPhrases++
  //     if (correctPhrases.length === this.prapla.length) {
  //       this.audio = new Audio('/sounds/feedback_completed.mp3')
  //       this.clap = new Audio('/sounds/feedback_clapping.mp3')
  //   
  //     }
  //   }
  // })
</script>

<style scoped>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-evenly;
    text-align: center;
  }
  h1 {
    color: var(--cl-primary-300);
    max-width: 16rem;
  }
  h1 span {
    font-size: 150%;
  }
</style>
