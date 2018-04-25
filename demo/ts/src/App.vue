<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({})
  export default class App extends Vue {
    name: 'app1.0'
  }
</script>

<style>
  #app {
    height: inherit;
    background-color: transparent;
  }
</style>
