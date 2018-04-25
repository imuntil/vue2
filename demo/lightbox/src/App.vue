<template>
  <div id="app">
    <Nav />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Nav from './components/Nav'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Nav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
