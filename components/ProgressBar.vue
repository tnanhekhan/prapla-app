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
		border: 2px solid var(--cl-grey-100);
		border-radius: 100px;
	}

	progress[value]::-webkit-progress-value {
		background-color: var(--cl-primary-200);
		min-width: 20px;
		transition: width 750ms ease-in-out;
		border-radius: 100px 0 0 100px;
	}
</style>
