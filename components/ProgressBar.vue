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
		height: 60%;
		width: clamp(15rem, 90%, 30rem);
	}

	progress[value]::-webkit-progress-bar {
		background-color: #FFF;
		border-radius: 100px;
	}

	progress[value]::-webkit-progress-value {
		background-color: var(--cl-purple-200);
		min-width: 20px;
		transition: all 750ms ease-in-out;
		border-radius: 100px 0 0 100px;
	}
</style>
