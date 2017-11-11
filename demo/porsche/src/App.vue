<template>
  <div id="app">
    <show></show>
  </div>
</template>

<script>
import Show from './components/Show.vue'

export default {
  name: 'app',
  components: {
    Show
  }
}
</script>

<style>
  html, body {
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    outline: none;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
