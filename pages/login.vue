<template>
  <main>
    <GlobalButton
        class="login-button"
        v-if="login === false"
        :clickEvent="loginSpeechText"
        :buttonText="'Login'"
      />

    <h1 v-else>Wat is je geheime woord?</h1>

    <GlobalButton
      v-if="login === true"
      :buttonIcon="setButtonIcon()"
      :clickEvent="startSpeech"
      :class="isRecording ? 'listen' : ''"
      :disabled="isRecording"
    />
  </main>
</template>

<script>
export default {
  data() {
    return {
      login: false
    }
  },
  mounted() {
     // Setup the Web Speech API
    this.buildSpeech()
    this.buildRecognition(true)
  },
  middleware: 'guest',
  methods: {
    setButtonIcon() {
      if (this.isRecording) {
        return '/icons/Ear.svg'
      } else {
        return '/icons/Microphone.svg'
      }
    },
    loginSpeechText() {
      this.login = true
      setTimeout(() => {
        this.speak('Druk op de knop en zeg je geheime woord')
      }, 400)
    }
  }
}
</script>

<style scoped>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-evenly;
    text-align: center;
  }

  section {
    align-items: center;
    background: white;
    border-radius: 1em;
    box-shadow: 0 .125em .125em .125em #00000015;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 30%;
    width: clamp(15rem, 90%, 30rem);
  }

  h1 {
    color: #4b4b4b;
    font-size: clamp(2rem, 3vw, 2.5rem);
    font-weight: 500;
  }

  h1 span {
    font-size: 150%;
  }

  .login-button {
    width: 10rem;
    height: 10rem;
  }
</style>
