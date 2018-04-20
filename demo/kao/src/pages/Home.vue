<template>
  <div class="container">
    <!-- <div class="content" :class="[`status-${section}`, run ? 'running': '']"> -->
    <div class="content" :class="[`status-${section}`]">
      <img src="@/assets/section-2.jpg" ref="section2" alt=""
        class="section-2">
      <img class="section-1" src="@/assets/section-1.jpg"
        ref="section1" @transitionend="handleAnimationEnd"
        :style="{'transform': `scale(${scale1})`}" alt="">
      <div class="section-0" :style="{'transform': `scale(${scale0})`}">lalala</div>
      <!-- <img src="@/assets/section-2.jpg" alt="" class="section-0"> -->
    </div>
    <a class="btn" @touchstart="handleTouchStart" @touchend="handleTouchEnd"
      @touchmove="handleTouchMove" href="javascript:;"
    />
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  interface Section {
    start: number,
    end: number,
    payload: number,
    ratio: number,
    [k: string]: any
  }
  const config: { [k: string]: Section } = {
    section1: { start: 15.88, end: 1, payload: 0.05, ratio: 0.065 }
  }
  @Component({})
  export default class Home extends Vue {
    name: 'home'

    $refs: {
      section: HTMLDivElement
      section1: HTMLImageElement
      section2: HTMLImageElement
    }

    run: boolean = false
    section: number = 0
    step: number = 1
    currentSt: Section = config.section1

    scale1: number = this.currentSt.start
    get scale0 (): number {
      return this.scale1 * this.currentSt.ratio
    }

    fire() {
      const { end, payload } = config.section1
      this.scale1 -= payload
      if (this.scale1 <= end) {
        this.scale1 = 1
        return
      }
      this.run && requestAnimationFrame(this.fire.bind(this))
    }

    fire2() {
      const { end, payload } = config.section2
    }

    handleTouchStart(e: any) {
      e.preventDefault()
      e.stopPropagation();

      this.run = true
      this.fire()

    }

    handleTouchEnd() {
      console.log('end')
      this.run = false
    }

    handleTouchMove() {
      console.log('xx')
    }

    handleAnimationEnd() {
      console.log('ani end')
    }
  }
</script>
<style lang="scss" scoped>
  .container,
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #ff00ff;
    img {
      width: 100%;
    }
  }
  .btn {
    position: absolute;
    width: 150px;
    height: 150px;
    left: 0;
    // right: 0;
    bottom: 10%;
    // margin: 0 auto;
    background-color: #ff0000;
    z-index: 999;
  }
  .content * {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .status-0 {
    overflow: hidden;
    .section-1 {
      transform-origin: 60.8% 43.2%;
      transform: scale(15.88);
      // transition: all .1s;
      z-index: 10;
    }
    .section-0 {
      // transition: all 2s;
      transform-origin: 60.8% 43.2%;
      display: flex;
      background-color: #000;
      justify-content: center;
      align-items: center;
      z-index: 11;
      // display: none;
    }
  }
  .status-0.running {
    .section-1 {
      transform: scale(1, 1);
    }
    .section-0 {
      transform: scale(0.065);
    }
  }
</style>



