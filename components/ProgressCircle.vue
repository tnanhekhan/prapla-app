<template>
  <div class="progress-circles">
    <div class="progression-circle"
      v-for="exercise in exercises"
      :key="exercise.level"
      :class="exercise.completed ? 'completed' : null"
    >
      {{ exercise.level}}
    </div>
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
    exercises: {
      type: Array
    }
  },
  mounted() {
    this.setAnimation()
  },
  methods: {
    setAnimation() {
      const completedArray = document.querySelectorAll('.completed')

      if(completedArray.length > 1) {
        completedArray[completedArray.length - 1].classList.add('completed-last')
      }
    }
  }
}
</script>

<style scoped>
  .progress-circles {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 18.75em;
    z-index: 10;
  }

  .progression-circle {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E6E6E6;
    border: solid 5px #BEBEBE;
    color: #BEBEBE;
    font-size: 1.5rem;
    border-radius: 50%;
    min-width: 2em;
    min-height: 2em;
    margin-right: 2em;
  }

  .progression-circle:last-of-type {
    margin-right: 0;
  }

  .progression-circle::before {
    content: '';
    position: absolute;
    left: -2.5em;
    width: 2.5em;
    height: .2em;
    z-index: -1;
    background-color: #BEBEBE;
  }

  .progression-circle:first-of-type::before {
    display: none;
  }

  .completed {
    background-color: var(--cl-green-200);
    border: solid 5px var(--cl-green-400);
    color: var(--cl-green-400);
  }
  
  .completed::before {
    background-color: var(--cl-green-400);
  }

  .completed-last{
    background-color: #E6E6E6;
    border: solid 5px #BEBEBE;
    color: #BEBEBE;
    animation: to-complete 2s forwards ease 1s;
  }

  .completed-last::before {
    /* background-color: #E6E6E6; */
    width: 0;
    animation: to-complete-before 2s forwards ease;
  }

  .completed-last::after {
    content: '';
    position: absolute;
    left: -2.5em;
    width: 2.5em;
    height: .2em;
    z-index: -1;
    background-color: #BEBEBE;
    animation: to-complete-after 2s forwards ease;
  }
  
  @keyframes to-complete {
    to {
      background-color: var(--cl-green-200);
      border: solid 5px var(--cl-green-400);
      color: var(--cl-green-400);
    }
  }

  @keyframes to-complete-before {
    to {
       width: 2.5em;
    }
  }

  @keyframes to-complete-after {
    0% {
       left: 0;
       width: 100%;
    }
    90% {
      left: 0;
      width: 100%;
    }
    100% {
      left: 0;
      width: 50%;
    }
  }
</style>
