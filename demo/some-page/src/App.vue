<template>
  <div id="app">
    <Page2></Page2>
    <br>
    <br>
    <br>
    <hr>
    <br>
    <br>
    <br>
    <Form></Form>
  </div>
</template>

<script>
  import Form from './components/Form'
  import Page2 from './components/Page2'

  export default {
    name: 'App',
    components: {
      Form,
      Page2
    }
  }
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
