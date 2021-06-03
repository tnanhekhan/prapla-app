<template>
  <main>
    <section>
      <h1>Wat is je geheime wachtwoord?</h1>
    </section>
    <GlobalButton
      :buttonIcon="setButtonIcon()"
      :clickEvent="startSpeech"
      :class="isRecording ? 'listen' : ''"
    />
  </main>
</template>

<script>
export default {
  data() {
    return {
      // speech: null,
      // voices: [],
      // audio: null,
      // buttonIcon: null
    }
  },
  mounted() {
    this.buildSpeech()
    this.buildLoginRecognition()
  },
  methods: {
    setButtonIcon() {
      if (this.isRecording) {
        return '/icons/Ear.svg'
      } else {
        return '/icons/Microphone.svg'
      }
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
</style>
