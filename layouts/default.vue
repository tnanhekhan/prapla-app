<template>
  <Nuxt />
</template>

<style>
  :root {
    --cl-purple-100: hsl(244, 85%, 95%);
    --cl-purple-200: hsl(244, 85%, 90%);
    --cl-purple-300: hsl(244, 85%, 75%);
    --cl-purple-400: hsl(244, 85%, 70%);

    -cl-grey-100: hsl(0, 0%, 91%);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    background-color: var(--cl-purple-100);
    font-family:
      'Arial Rounded MT',
      sans-serif;
    font-size: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
</style>
