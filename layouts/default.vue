<template>
  <Nuxt />
</template>

<style>
  :root {
    --cl-purple-100: hsl(244, 85%, 95%);
    --cl-purple-200: hsl(244, 85%, 90%);
    --cl-purple-300: hsl(244, 85%, 75%);
    --cl-purple-400: hsl(244, 85%, 70%);

    --cl-primary-200: hsl(207, 56%, 65%);
    --cl-primary-300: hsl(207, 55%, 50%);
    --cl-primary-400: hsl(207, 55%, 35%);

    --cl-grey-100: hsl(0, 0%, 91%);

    --cl-green-100: hsl(99, 62%, 82%);

    --cl-orange-100: hsl(22, 100%, 84%);
  }

  @font-face {
    font-family: 'Arial Rounded MT';
    src: local('Arial Rounded MT'),
         local('Arial Rounded MT Bold')
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-family:
      'Arial Rounded MT',
      sans-serif;
    font-size: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  button {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    border-radius: 10em;
    cursor: pointer;
  }
</style>
