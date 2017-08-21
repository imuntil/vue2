<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <main-box></main-box>
    <div class="orientation" v-show="!orientation">
      <img src="./assets/turn.png" alt="">
    </div>
  </div>
</template>

<script>
  // import Hello from './components/Hello'
  import Main from './components/Main'

  export default {
    name: 'app',
    components: {
      MainBox: Main
    },
    data () {
      return {
        orientation: true
      }
    },
    methods: {
      __orientation () {
        this.orientation = (window.orientation === 0)
      }
    },
    mounted () {
      document.addEventListener('touchmove', function (e) {
        e.preventDefault()
      }, true)
      window.addEventListener('orientationchange', this.__orientation, false)
      this.__orientation()
    }
  }
</script>

<style type="text/scss" lang="scss">
  html,body {
    background-color: #000;
    height: 100%;
    width: 100%;
    position: relative;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .orientation {
    position: absolute;
    z-index: 99999999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    img {
      width: 170px;
      height: 155px;
    }
  }
  .mint-indicator-wrapper {
    z-index: 100;
  }
</style>
