<template>
  <main>
    <h1> Nog <span>{{ needed }}</span> oefening te gaan </h1>
    <ProgressCircle :amount="amount" :total="total" />
    <GlobalButton 
      :clickEvent="startNewExercise"
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
  h1 span {
    font-size: 150%;
  }
</style>
