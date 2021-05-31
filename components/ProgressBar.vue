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
    height: 2.5rem;
    position: absolute;
    width: 100%;
	}

	progress[value]::-webkit-progress-bar {
		background-color: #e7e7e7;
	}

	progress[value]::-webkit-progress-value {
		background-color: #CECBFF;
		min-width: 20px;
		transition: all 750ms ease-in-out;
	}
</style>
