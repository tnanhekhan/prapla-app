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
    --cl-grey-200: hsl(0, 0%, 88%);

    --cl-green-100: hsl(99, 62%, 82%);
    --cl-green-200: hsl(100, 52%, 58%);
    --cl-green-300: hsl(100, 100%, 35%);
    --cl-green-400: hsl(100, 100%, 25%);

    --cl-orange-100: hsl(22, 100%, 84%);
    --cl-orange-200: hsl(22, 100%, 65%);
    --cl-orange-300: hsl(22, 100%, 55%);
    --cl-orange-400: hsl(22, 100%, 42%);
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

  body.correct {
    --cl-grey-100: var(--cl-grey-200);
    --cl-primary-200: var(--cl-green-200);
    --cl-primary-300: var(--cl-green-300);
    --cl-primary-400: var(--cl-green-400);
    background-color: var(--cl-green-100);
  }

  body.incorrect {
    --cl-grey-100: var(--cl-grey-200);
    --cl-primary-200: var(--cl-orange-200);
    --cl-primary-300: var(--cl-orange-300);
    --cl-primary-400: var(--cl-orange-400);
    background-color: var(--cl-orange-100);
  }
</style>
