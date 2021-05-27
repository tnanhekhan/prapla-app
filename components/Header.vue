<template>
  <header>
    <ProgressBar
      v-if="counter !== null"
      :progressValue="progressValue"
    />
    <nav>
      <svg @click="empty" xmlns="http://www.w3.org/2000/svg" width="59" height="45" viewBox="0 0 59 45">
        <g id="Arrow" transform="translate(-154 -633)">
          <path id="Polygon_3" data-name="Polygon 3" d="M19.035,6.006a4,4,0,0,1,6.929,0L41.539,33a4,4,0,0,1-3.465,6H6.926a4,4,0,0,1-3.465-6Z" transform="translate(213 633) rotate(90)" fill="#fff"/>
          <rect id="Rectangle_16" data-name="Rectangle 16" width="26" height="18" rx="7" transform="translate(154 647)" fill="#fff"/>
        </g>
      </svg>
      <section class="category">
        <div>
          <h3> Categorie </h3>
          <h2> {{ this.category }}</h2>
        </div>
      </section>
    </nav>
  </header>
</template>
<script>
  export default {
    data() {
      return {
        category: 'Dieren'
      }
    },
    props: {
    //   category: {
    //     type: String
    //   }
      empty: {
        type: Function
      },
      counter: {
        type: Number
      },
      progressValue: {
        type: Number
      }
    }
  }
</script>
<style scoped>
  header {
    height: 12.5vh;

    width: 100%;
  }

  h1{
  	font-size: 3rem;
  	text-align: center;
  }
  h2 {
    font-size: 2rem;
  }
  nav h3 {
    font-size: .9rem;
    opacity: .7;
  }
  nav {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    background-color: white;
  }
  nav svg {
    transform: rotate(180deg);
    max-width: 40px;
  }
  #Arrow path, #Arrow rect {
    fill: #9E99EE;
  }
  .category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 40px 1rem 0;
    width: 100%;
  }
  .category div > * {
    width: max-content;
    color: #9E99EE;
    line-height: 23px;
  }
</style>
