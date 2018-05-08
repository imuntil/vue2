<template>
  <div class="touch-bar-wrapper">
    <div class="out">
      <div class="box" :class="{slow: touched}" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend" ref="box">
        <div class="mask" :style="{width: `${offset}px`}">
          <p class="total"></p>
        </div>
        <a href="javascript:;" class="btn" :style="{left: `${offset}px`}"></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

  import { Vue, Component } from 'vue-property-decorator'
  import { throttle } from '../../utils/cts'
  @Component
  export default class TouchBar extends Vue {
    name: 'touch-bar'
    touched: boolean = true
    clientX: number = 0
    width: number = 0
    offsetLeft: number = 0

    th: (...rest: any[]) => void

    $refs: {
      box: HTMLDivElement
    }

    get offset () {
      const w = this.clientX - this.offsetLeft
      const v = w > this.width ? this.width : w < 0 ? 0 : w
      return v
    }

    touchstart (e: TouchEvent) {
      this.touched = true
      this.clientX = e.changedTouches[0].clientX
    }

    touchmove (e: TouchEvent) {
      if (!this.touched) return
      if (!this.th) {
        this.th = throttle((x: number) => {
          this.clientX = x
        }, 50)
      } else {
        this.th(e.changedTouches[0].clientX)
      }
    }

    touchend (e: TouchEvent) {
      this.touched = false
    }

    mounted () {
      const { offsetLeft, offsetWidth } = this.$refs.box
      this.width = offsetWidth - 8
      this.offsetLeft = offsetLeft
    }
  }

</script>

<style lang="scss" scoped>
  // @import '../../styles/decoration.scss';
  .out {
    padding: 3px;
    border: 1px solid #fff;
    border-radius: 10rem;
    background-color: transparent;
    width: 300px;
  }
  .box {
    position: relative;
  }
  .total {
    background: linear-gradient(to right, yellow, red, purple);
    padding: 10px;
    border-radius: 10rem;
    width: 292px;
  }
  .mask {
    width: 70%;
    overflow: hidden;
    transition: width 100ms;
  }
  .btn {
    position: absolute;
    left: 70%;
    top: -40%;
    width: 8px;
    height: 180%;
    display: block;
    background-color: #fff;
    box-shadow: 0 0 4px 2px #fff;
    border-radius: 4px;
    transition: left 100ms;
  }
  .slow .mask,
  .slow .btn {
    transition-duration: 0.1s;
  }
</style>
