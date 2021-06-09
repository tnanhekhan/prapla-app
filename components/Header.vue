<template>
  <header>
    <nav>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="22.368" 
        height="22.368" 
        viewBox="0 0 22.368 22.368"
        @click="empty"
      >

        <g id="Group_63" data-name="Group 63" transform="translate(-130.672 -24.672)">
          <line id="Line_2" data-name="Line 2" x2="16.711" y2="16.711" transform="translate(133.5 27.5)" fill="none" stroke="#70a4d0" stroke-linecap="round" stroke-width="4"/>
          <line id="Line_3" data-name="Line 3" x1="16.711" y2="16.711" transform="translate(133.5 27.5)" fill="none" stroke="#70a4d0" stroke-linecap="round" stroke-width="4"/>
        </g>

      </svg>
    </nav>
  </header>
</template>
<script>
  export default {
    props: {
      empty: {
        type: Function
      }
    }
  }
</script>
<style scoped>
  header {
    height: 10vh;
    padding: 2rem 1rem;
    width: 100%;
  }

  nav {
    display: flex;
    align-items: center;
  }

  svg {
    height: 1.7rem;
    width: 1.7rem;
  }

  nav svg line {
    stroke: var(--cl-primary-200);
  }
</style>
