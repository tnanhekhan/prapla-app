<template>
	<progress max="100" :value="progressValue"></progress>
</template>

<script>
export default {
  props: {
    progressValue: {
      type: Number
    }
  }
}
</script>

<style scoped>
	progress[value] {
		-webkit-appearance: none;
    appearance: none;
    bottom: 0;
    height: 100%;
    position: absolute;
    width: 100%;
	}

	progress[value]::-webkit-progress-bar {
		background-color: var(--cl-grey-100);
	}

	progress[value]::-webkit-progress-value {
		background-color: var(--cl-purple-200);
		min-width: 20px;
		transition: all 750ms ease-in-out;
	}
</style>
