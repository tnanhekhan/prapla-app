<template>
  <div class="back-shadow">
    <section class="modal">
      <h2> Oefening stoppen? </h2>
      <div>
        <button 
          v-for="exitBtn in exitButtons" 
          :key="exitBtn" 
          @click="'Ja' === exitBtn ? sendToHome() : closeModal()"> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path v-if="exitBtn === 'Ja'" d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
            <path v-else d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
          </svg>
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
    display: flex;
    justify-content: center;
    align-items: center;
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
  .modal div button svg {
    fill: none;
    height: 44px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    width: 44px;
    stroke: var(--cl-orange-300);
  }
  .modal div button:first-child svg {
    stroke: var(--cl-green-400);
  }
  h2 {
    text-align: center;
    margin-bottom: 2em;
  }
</style>
