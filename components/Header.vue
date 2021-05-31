<template>
  <header>
    <nav>
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 35.904 35.904"
        @click="empty"
      >
        <path d="M20.952,3A17.952,17.952,0,1,0,38.9,20.952,17.936,17.936,0,0,0,20.952,3Zm8.976,24.4L27.4,29.928l-6.445-6.445-6.445,6.445L11.976,27.4l6.445-6.445-6.445-6.445,2.531-2.531,6.445,6.445L27.4,11.976l2.531,2.531-6.445,6.445Z"/>
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
    height: 2rem;
    width: 2rem;
  }

  nav svg path {
    fill: var(--cl-purple-300);
    transform: translate(-3px, -3px);
  }
</style>
