<template>
  <div class="hello">
    <p>angle: {{angle}}</p>
    <p>zoom: {{zoom}}</p>
    <p>x: {{x}}, y: {{y}}</p>
    <img :style="style" v-finger:single-tap="tap" v-finger:pinch="pinch" v-finger:press-move="pressMove" v-finger:rotate="rotate" v-finger:double-tap="doubleTap" src="../assets/drive-bg.jpg" width="100%" alt="">
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        angle: 0,
        zoom: 1,
        x: 0,
        y: 0
      }
    },
    computed: {
      style () {
        return {
          transform: `translate(${this.x}px, ${this.y}px) scale(${
            this.zoom
            }) rotate(${this.angle})`
        }
      }
    },
    methods: {
      tap (e) {
        console.log('tap:', e)
      },
      rotate (e) {
        console.log('rotate:', e)
        // this.angle += +e.angle
      },
      pinch (e) {
        console.log('pinch:', e)
        this.zoom = +e.zoom
      },
      doubleTap (e) {
        console.log('doubleTap:', e)
      },
      pressMove (e) {
        this.x += e.deltaX
        this.y += e.deltaY
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
