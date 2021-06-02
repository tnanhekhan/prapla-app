<template>
  <button
    :disabled="isRecording"
    :class="isRecording ? 'listen' : ''"
    @click="onClick"
  >
    <img v-if="!isRecording && !correct" src="/icons/Microphone.svg" alt=" " aria-hidden="true" />
    <img v-else-if="isRecording" src="/icons/Ear.svg" alt=" " aria-hidden="true" />
    <img v-else src="/icons/Arrow.svg" alt=" " aria-hidden="true" />
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
    background: #9E99EE;
    border-radius: 50%;
    box-shadow: 0 .35em 0 .05em var(--cl-purple-400);
    display: flex;
    font-size: 1.25rem;
    height: var(--size);
    justify-content: center;
    position: relative;
    transition: 
      box-shadow 200ms ease,
      transform 200ms ease;
    width: var(--size);
  }

  button:active,
  button.listen {
    box-shadow: 0 .25em 0 .05em var(--cl-purple-400);
    transform: translateY(.1em);
  }

  button.listen::after {
    animation: pulse 1s ease-in-out infinite;
    border: .1em solid var(--cl-purple-300);
    border-radius: 50%;
    content: '';
    height: 100%;
    position: absolute;
    width: 100%;
  }

  button img {
    max-height: 2.25em;
  }

  @keyframes pulse {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1.5);
    }
  }
</style>
