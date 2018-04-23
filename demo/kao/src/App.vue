<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class App extends Vue {
    name: 'App'
  }
</script>

<style lang="scss" scoped>
  #app {
    height: inherit;
    background-color: transparent;
  }
</style>
