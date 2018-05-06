<template>
  <div class="trans-wrapper" ref="container">
    <transition-group class="trans-box" tag="div">
      <div key="0" class="page-1" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend" @touchcancel="touchcancel">
        <slot name="page-1"></slot>
      </div>
      <div key="1" class="page-2" :class="{'on-drag': touching}" :style="style">
        <slot name="page-2"></slot>
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: 'drag-page',
    props: {
      critical: {
        type: Number,
        default: 0.4,
        validator (v) {
          return v > 0.2 && v < 0.8
        }
      }
    },
    data () {
      return {
        touching: false,
        startY: 0,
        // 变化量
        delta: 0,
        // 容器高度
        boxHeight: 0
      }
    },
    computed: {
      style () {
        return { transform: `translateY(${this.delta / this.boxHeight * 100}%)`, opacity: `${Math.abs(this.delta / this.boxHeight)}` }
      }
    },
    methods: {
      touchstart (e) {
        this.touching = true
        this.startY = e.changedTouches[0].clientY
      },

      touchmove (e) {
        if (!this.touching) return
        this.delta = e.changedTouches[0].clientY - this.startY
      },

      touchend (e) {
        this.touching = false
        if (this.delta <= -this.critical * this.boxHeight) {
          this.delta = -this.boxHeight
        } else {
          this.delta = 0
        }
      },

      touchcancel () {
        this.delta = 0
      }
    },

    mounted () {
      const container = this.$refs.container
      this.boxHeight = container.getBoundingClientRect().height
      console.info(`
      USE:
      <drag-cmp :critical="0.4">
        <div slot="page-1">your code...</div>
        <div slot="page-2">your code...</div>
      </drag-cmp>
      `)
    }
  }
</script>

<style lang="scss">
  .trans-box,
  .trans-wrapper {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  div[class^='page-'] {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(0, 140, 255);
  }
  div.page-2 {
    background: #000;
    z-index: 1;
    transition: all 0.25s;
    top: 100%;
    bottom: -100%;
  }
  .page-2.on-drag {
    transition-duration: 60ms;
  }
</style>
