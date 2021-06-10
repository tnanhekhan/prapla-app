<template>
  <div class="back-shadow">
    <section class="modal">
      <h2> Oefening stoppen? </h2>
      <div>
        <button 
          v-for="exitBtn in exitButtons" 
          :key="exitBtn" 
          @click="'Ja' === exitBtn ? sendToHome() : closeModal()"> 
          {{ exitBtn }}
        </button>
      </div>
    </section>
  </div>
  
</template>

<script>
export default {
  name: "Complete",
  props: {
    sendToHome: {
      type: Function
    },
    closeModal: {
      type: Function
    }  
  },
  data() {
    return {
      needed: 1,
      total: 3,
      amount: 2,
      audio: null,
      clap: null,
      exitButtons: ['Ja', 'Nee'],
      buttonIcon: '/icons/Next.svg'
    }
  }
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
    background-color: rgba(0,0,0,.5);
    padding: 2em;
  }
  .modal {
    width: clamp(15rem, 90%, 30rem);
    height: 65vh;
    min-height: 16em;
    max-height: 30em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    border-radius: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1em;
  }
  .modal div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .modal div button {
    appearance: none;
    margin: 0 1rem;
    color: var(--cl-orange-400);
    font-family:
      'Arial Rounded MT',
      sans-serif;
    font-size: 1.7rem;
    width: 5rem;
    height: 5rem;
    border-radius: 1.5rem;
    border: solid var(--cl-orange-300);
    box-shadow: 0 .15em 0 .05em var(--cl-orange-400);  
  }
  .modal div button:first-child {
    border: solid var(--cl-green-300);
    box-shadow: 0 .15em 0 .05em var(--cl-green-400);
    color: var(--cl-green-400);
  }
  h2 {
    text-align: center;
    margin-bottom: 2em;
  }
</style>
