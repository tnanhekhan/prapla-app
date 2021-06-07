<template>
  <div class="back-shadow">
    <section class="modal">
      <h1> Nog {{ needed }} </h1>
      <ProgressCircle :amount="amount" :total="total" />
      <GlobalButton 
        :buttonIcon="'/icons/Next.svg'" :clickEvent="startFinishSound"/>
  </section>
  </div>
  
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
  // methods: {
    
  // }
}
</script>

<style scoped>
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
    background-color: var(--cl-purple-100);
    border-radius: 1em;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 50%;
  }
  .progress-circles {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    max-width: 18.75em;
    z-index: 10;
  }
  .progression-circle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E6E6E6;
    border: solid 5px #BEBEBE;
    color: #BEBEBE;
    font-size: 1.5rem;
    border-radius: 50%;
    min-width: 2em;
    min-height: 2em;
 
  }
  .progression-circle::before {
    content: '';
    position: absolute;
    left: -2em;
    width: 2em;
    height: .2em;
    z-index: -1;
    background-color: #BEBEBE;
  }
  .progression-circle:first-of-type::before {
    display: none;
  }
  .completed {
    background-color: #99D87A;
    border: solid 5px #379807;
    color: #379807;
  }
  
  .completed::before {
    background-color: #379807;
  }

  .completed-last{
    background-color: #E6E6E6;
    border: solid 5px #BEBEBE;
    color: #BEBEBE;
    animation: to-complete 2s forwards ease 1s;
  }
  .completed-last::before {
    /* background-color: #E6E6E6; */
     width: 0;
    animation: to-complete-before 2s forwards ease;
  }
  .completed-last::after {
    content: '';
    position: absolute;
    left: -2em;
    width: 2em;
    height: .2em;
    z-index: -1;
    background-color: #BEBEBE;
    animation: to-complete-after 2s forwards ease;
  }
  
  @keyframes to-complete {
    to {
      background-color: #99D87A;
      border: solid 5px #379807;
      color: #379807;
    }
  }
  @keyframes to-complete-before {
    to {
       width: 2em;
    }
  }
  @keyframes to-complete-after {
    0% {
       left: 0;
       width: 100%;
    }
    90% {
      left: 0;
      width: 100%;
    }
    100% {
      left: 0;
      width: 50%;
    }
  }
</style>
