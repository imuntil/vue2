<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <p>{{full}}</p>
    <a href="javascript:;" @click="unless++">++</a>
    <br>
    <a href="javascript:;" @click="lastName='vv'">change</a> -->
    <hello-world @vv="vv" @click.native.stop.prevent="handleClick" :flag="unless % 2 === 0"></hello-world>
    <button @click="unless++">change</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      unless: 0,
      firstName: "z",
      lastName: "b"
    };
  },
  computed: {
    full() {
      if (this.unless > 0) {
        return this.firstName + " " + this.lastName;
      }
      return "no name";
    }
  },
  methods: {
    vv () {
      console.log('vv')
    },
    handleClick () {
      console.log('click')
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
