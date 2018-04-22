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
    // mounted () {
    //   Array.from(document.querySelectorAll('img')).forEach(ele => {
    //     ele.addEventListener('touchstart', (e: any) => e.preventDefault())
    //     ele.addEventListener('touchstart', (e: any) => alert('x'))
    //     ele.addEventListener('touchend', (e: any) => alert('e'))
    //   }, false)
    // }
  }
</script>

<style lang="scss" scoped>
  #app {
    height: inherit;
    background-color: transparent;
  }
</style>
