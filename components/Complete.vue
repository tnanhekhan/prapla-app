<template>
  <div class="back-shadow">
    <section class="modal">
      <h1> Nog {{ needed }}! </h1>
      <ProgressCircle :amount="amount" :total="total" />
      <GlobalButton 
        :buttonIcon="'/icons/Next.svg'" :clickEvent="nextExercise"/>
  </section>
  </div>
  
</template>

<script>
export default {
  name: "Complete",
  props: ['nextExercise'],
  data() {
    return {
      needed: 1,
      total: 4,
      amount: 2,
      audio: null,
      clap: null,
      buttonIcon: '/icons/Next.svg'
    }
  },
}
</script>

<style scoped>
  h1 {
    font-size: 2em;
  }

  .back-shadow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.6);
    padding: 2em;
  }

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    border-radius: 1em;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: clamp(15rem, 90%, 30rem);
    height: 65vh;
  }
</style>
