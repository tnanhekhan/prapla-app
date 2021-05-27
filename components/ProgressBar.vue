<template>
	<div class="progress-background">
    <div class="progress-bar"></div>
  </div>
</template>

<style scoped>
	.progress-background,
	.progress-bar {
		height: 20px;
		border-radius: 100px;
	}

	.progress-background {
		width: 80%;
		background-color: #e0e0e0;
	}

  .progress-bar {
		height: 20px;
		width: 0;
		min-width: 20px;
		margin-right: auto;
		background-color: #77DB81;
		transition: 1s all;
  }
</style>