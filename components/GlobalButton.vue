<template>
  <button @click="clickEvent">
    <img v-if="buttonIcon"
      :src="buttonIcon"
      alt=" "
      aria-hidden="true"
    >
    <span v-else>{{buttonText}}</span>
  </button>
</template>

<script>
export default {
  props: {
    clickEvent: {
      type: Function
    },
    buttonIcon: {
      type: String
    },
    buttonText: {
      type: String
    }
  }
}
</script>

<style lang="css" scoped>
   button {
    --size: 5rem;
    align-items: center;
    background: var(--cl-primary-300);
    border-radius: 50%;
    box-shadow: 0 .35em 0 .05em var(--cl-primary-400);
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

  button img {
    max-height: 2.25em;
  }

  button:active,
  button.listen {
    box-shadow: 0 .25em 0 .05em var(--cl-primary-400);
    transform: translateY(.1em);
  }

  button.listen::after {
    animation: pulse 1s ease-in-out infinite;
    border: .1em solid var(--cl-primary-300);
    border-radius: 50%;
    content: '';
    height: 100%;
    position: absolute;
    width: 100%;
  }

  button.inactiveVisual {
    background: var(--cl-grey-200);
    transform: translateY(.3em);
    box-shadow: none;
  }

  button span {
    font-size: 1.3em;
    letter-spacing: 2px;
    font-family:
      'Arial Rounded MT',
      sans-serif;
    color: white;
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
