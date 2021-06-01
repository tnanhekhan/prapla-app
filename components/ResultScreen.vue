<template>
	<div class="pop-up">
    <section class="card">
      <h1> Nog {{ needed }} oefening te gaan </h1>
      <div>
        <p> {{ amount }} / {{ total }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    },
    amount: {
      type: Number
    },
    needed: {
      type: Number
    }
  }
}
</script>

<style scoped>
  .pop-up {
    width: 100%;
    height: 100%;
    background-color: rgba(175, 175, 175, 0.7)
  }
</style>
