<template>
  <button 
    @click="startSpeech"
    :disabled="isRecording"
  >
    <svg 
      v-if="!isRecording"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" />
      <rect x="9" y="2" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
    <div v-else class="audiowaves">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isRecording: {
      type: Boolean
    },
    startSpeech: {
      type: Function
    }
  }
}
</script>

<style lang="css" scoped>
  button {
    appearance: none;
    background: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1em 0.25em #00000015;
    cursor: pointer;
    display: block;
    font-size: 1.25rem;
    height: 2.5em;
    padding: .25em;
    margin: 0 auto;
    width: 2.5em;
  }

  button svg {
    --size: 2em;
    fill: none;
    height: var(--size);
    stroke: #8485b4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5;
    width: var(--size);
  }

  button svg path:first-of-type {
    fill: none;
    stroke: none;
  }

  button svg rect {
    height: 11px;
    width: 6px;
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