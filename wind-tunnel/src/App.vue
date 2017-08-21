<template>
  <div id="app">
    <div class="test-box" :style="style"></div>
    <p>{{e.x}}</p>
    <p>{{xd.s}}</p>
    <p>{{xd.vt}}</p>
    <!--<p>{{e.y}}</p>-->
    <!--<p>{{e.z}}</p>-->
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  },
  data () {
    return {
      e: {},
      last: 0,
      interval: 200,
      xd: {
        v0: 0,
        vt: 0,
        a: 0,
        s: 0
      },
      style: {}
    }
  },
  computed: {
    xvt () {
      return 1
    }
  },
  methods: {
    __deviceMotion (e) {
      let date = +new Date()
      let diff = date - this.last
      if (diff > this.interval) {
        this.last = date
        this.e = e.accelerationIncludingGravity || {}
//        this.e = e.acceleration || {}
        let interval = 1 / 1000 * this.interval
        this.xd.a = this.e.x
        this.xd.vt = this.xd.v0 + this.xd.a * interval
        this.xd.v0 = this.xd.vt
        this.xd.s += Math.floor((this.xd.v0 * interval + 0.5 * this.xd.a * interval * interval))
      }
    },
    __location () {
//      this.x = Math.floor(this.e.x * 200)
    }
  },
  mounted () {
    window.addEventListener('devicemotion', this.__deviceMotion, false)
  }
}
</script>

<style type="text/scss" lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    position: relative;
  }
  .test-box {
    width: 5rem;
    height: 5rem;
    background-color: #000;
    position: absolute;
    left: 0;
    right: 0;
    margin: 10rem auto;
  }
</style>
