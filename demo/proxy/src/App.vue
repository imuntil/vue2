<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <div class="parent">
      <ss>
        <p slot-scope="props">
          <span>parent</span> <br>
          <span>{{props.names}}</span> <br>
          <span>{{props.age}}</span>
        </p>
      </ss>
    </div>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  import SlotScope from './components/SlotScope'

  export default {
    name: 'App',
    components: {
      HelloWorld,
      Ss: SlotScope
    },
    created () {
      // fetch('/lala/api/user/test').then(v => {
      //   v.json().then(res => {
      //     console.log(res)
      //   })
      // })
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
    margin-top: 60px;
  }
</style>
