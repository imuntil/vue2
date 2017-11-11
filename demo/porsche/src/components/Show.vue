<template>
  <div class="container" ref="container">
    <div class="box sliver-box" ref="sliver" :style="sliverStyle"></div>
    <div class="box blue-box" ref="box" :style="blueStyle"></div>
  </div>
</template>
<script>
  import _ from 'lodash'
  export default {
    data () {
      return {
        container: null,
        running: false,
        throttle: null,
        clientX: 0,
        deltaX: 0,
        containerWidth: 0,
        sliverBoxWidth: 0
      }
    },
    computed: {
      width () {
        return this.containerWidth === 0 ? undefined : (this.sliverBoxWidth / this.containerWidth).toFixed(4)
      },
      sliverStyle () {
        return !this.width
          ? {}
          : { width: this.width * 100 + '%' }
      },
      blueStyle () {
        return !this.width
          ? {}
          : { width: (1 - this.width) * 100 + '%' }
      }
    },
    methods: {
      __active () {
        this.container.addEventListener('touchmove', this.throttle = _.throttle(this.__handleTouchMove, 50), false)
        this.container.addEventListener('touchstart', this.__handleTouchBegin, false)
        this.container.addEventListener('touchend', this.__handleTouchEnd, false)
      },
      __handleTouchBegin (e) {
        e.preventDefault()
        this.running = true
        if (!this.containerWidth) {
          this.sliverBoxWidth = this.containerWidth = e.target.clientWidth
        }
        const touch = e.touches[0]
        this.clientX = touch.clientX
      },
      __handleTouchMove (e) {
        e.preventDefault()
        if (!this.running) return false
        const touch = e.touches[0]
        this.deltaX = touch.clientX - this.clientX
        this.__computeWidth()
        this.clientX = touch.clientX
      },
      __handleTouchEnd (e) {
        e.preventDefault()
        this.running = false
        this.clientX = 0
        this.deltaX = 0
      },
      __computeWidth () {
        this.sliverBoxWidth += this.deltaX
        if (this.sliverBoxWidth > this.containerWidth) {
          this.sliverBoxWidth = this.containerWidth
        } else if (this.sliverBoxWidth < 0) {
          this.sliverBoxWidth = 0
        }
      }
    },
    mounted () {
      this.container = this.$refs.container
      this.__active()
    },
    beforeDestroy () {
      this.container.removeEventListener('touchmove', this.__handleTouchMove, false)
      this.container.removeEventListener('touchstart', this.__handleTouchBegin, false)
      this.container.removeEventListener('touchend', this.__handleTouchEnd, false)
      this.throttle.cancel()
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .container {
    width: 100%;
    background-color: #e6e6e6;
    height: 60%;
    margin-top: 20%;
    display: flex;
  }
  .box {
    width: 50%;
    height: 203px;
    display: inline-block;
    background: url("../assets/sliver.jpg") no-repeat left center;
    background-size: cover;
    &.sliver-box {
      width: 100%;
    }
    &.blue-box {
      width: 0;
      background: url("../assets/blue.jpg") no-repeat right center;
      background-size: cover;
    }
  }
</style>
