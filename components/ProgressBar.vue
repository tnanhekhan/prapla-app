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
  	/* Reset the default appearance */
		-webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 2em;
    padding: .2em .2em 0 .2em;
	}

	progress[value]::-webkit-progress-bar,
	progress[value]::-webkit-progress-value {
		border-radius: 100px;
	}

	progress[value]::-webkit-progress-bar {
		background-color: #e7e7e7;
	}

	progress[value]::-webkit-progress-value {
		background-color: #77DB81;
		min-width: 20px;
		transition: 1s all;
	}
</style>
