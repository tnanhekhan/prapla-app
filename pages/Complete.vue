<template>
  <main>
    <h1> Nog {{ needed }} </h1>
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
      audio: null,
      clap: null,
      buttonIcon: '/icons/Next.svg'
    }
  },
  mounted() {
    this.startFinishSound()
  },
  methods: {
    startFinishSound() {
      this.audio = new Audio('/sounds/feedback_completed.mp3')
      this.clap = new Audio('/sounds/feedback_clapping.mp3')

      this.audio.play()
      
      this.clap.volume = 0.5
      this.clap.play()

      function fadeOut() {
        setInterval(() => {
          if(this.clap.volume > 0.06) {
            this.clap.volume -= 0.05
          } else {
            this.clap.volume = 0
            clearInterval(fadeOut)
          }
        }, 100)
      }

      setTimeout( () => {
        fadeOut()
      }, 1300)  
    }
  }
}
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
    color: #7973CC;
    max-width: 16rem;
  }
</style>
