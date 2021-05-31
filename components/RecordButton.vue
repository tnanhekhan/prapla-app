<template>
  <button
    :disabled="isRecording"
    @click="onClick"
  >
    <img v-if="!isRecording && !correct" src="/icons/microphone.svg" alt=" " aria-hidden="true">
    <div v-else-if="isRecording && !correct" class="audiowaves">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
    <img v-else src="/icons/Arrow.svg" alt=" ">
  </button>
</template>

<script>
export default {
  props: {
    correct: {
      type: Boolean
    },
    isRecording: {
      type: Boolean
    },
    startSpeech: {
      type: Function
    },
    changeWord: {
      type: Function
    }
  },
  methods: {
    onClick() {
      this.correct
        ? this.changeWord()
        : this.startSpeech()
    }
  }
}
</script>

<style lang="css" scoped>
  button {
    --size: 5rem;
    align-items: center;
    appearance: none;
    background: #9E99EE;
    border: none;
    border-radius: 50%;
    box-shadow: 0 .35em 0 .05em var(--cl-purple-400);
    cursor: pointer;
    display: flex;
    font-size: 1.25rem;
    height: var(--size);
    justify-content: center;
    position: relative;
    transition: 
      box-shadow 300ms ease,
      transform 300ms ease;
    width: var(--size);
  }

  button:active {
    box-shadow: 0 .25em 0 .05em var(--cl-purple-400);
    transform: translateY(.1em);
  }

  button img {
    max-height: 2.25em;
  }

  .audiowaves {
    display: flex;
    justify-content: space-evenly;
  }

  .audiowaves i {
    animation: musicEqualizer 400ms ease var(--delay, 0s) infinite alternate;
    background-image: linear-gradient(
      to top,
      #fbc2eb 0%,
      #a6c1ee 100%
    );
    display: block;
    height: 1rem;
    width: .125rem;
  }

  @keyframes musicEqualizer {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(1.5)
    }
  }
</style>
