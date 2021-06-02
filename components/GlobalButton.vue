<template>
  <button @click="clickEvent">
    <img :src="buttonIcon" alt=" " aria-hidden="true">
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

  button:active {
    box-shadow: 0 .25em 0 .05em var(--cl-purple-400);
    transform: translateY(.1em);
  }

  button img {
    max-height: 2.25em;
  }
</style>
