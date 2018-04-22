<template>
  <div class="container">
    <!-- <div class="content" :class="[`status-${section}`, run ? 'running': '']"> -->
    <div class="content" :class="status">
      <img src="@/assets/section-2.jpg" ref="section2" alt="" class="section-2 init" :style="{transform: `scale(${scale2})`}">
      <img class="section-1" src="@/assets/section-1.jpg" ref="section1" @transitionend="handleAnimationEnd" :style="{transform: `scale(${scale1})`}" alt="">
      <div class="section-0" :style="{transform: `scale(${scale0})`}">lalala</div>
    </div>
    <a class="btn" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove="handleTouchMove" href="javascript:;" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
interface Section {
  start: number,
  end: number,
  payload: number,
  ratio: number,
  [k: string]: any
}
const config: { [k: string]: Section } = {
  section1: { start: 15.88, end: 1, payload: 0.05, ratio: 0.065 },
  section2: { start: 8.038, end: 1, payload: 0.03, ratio: 0.114 }
}
@Component({})
export default class Home extends Vue {
  name: 'home'

  run: boolean = false
  /* 动画阶段 */
  step: number = 0

  get status () {
    return Array(this.step + 1).fill('').map((v, i) => `status-${i}`)
  }

  get scale0 (): number {
    return this.scale1 * config.section1.ratio
  }
  scale1: number = config.section1.start
  scale2: number = config.section2.start

  fire () {
    const { end, payload } = config.section1
    this.scale1 -= payload
    if (this.scale1 <= end) {
      this.scale1 = 1
      // 第二阶段
      this.step = 1
      requestAnimationFrame(this.fire1.bind(this))
      return
    }
    this.run && requestAnimationFrame(this.fire.bind(this))
  }

  fire1 () {
    const { end, payload, ratio } = config.section2
    this.scale2 -= payload
    this.scale1 = this.scale2 * ratio
    if (this.scale2 <= end) {
      this.scale2 = 1
      this.scale1 = this.scale2 * ratio
      return
    }
    this.run && requestAnimationFrame(this.fire1.bind(this))
  }

  initStep () {
    const { section1, section2 } = config
    switch (this.step) {
      case 5: { }
      case 4: { }
      case 3: { }
      case 2: { }
      case 1: { }
        this.scale2 = section2.start
        this.scale1 = 1
        break;
      case 0:
        this.scale1 = section1.start
        break;
    }
  }


  handleTouchStart (e: any) {
    e.preventDefault()
    e.stopPropagation();
    this.run = true
    this.fire()
  }

  handleTouchEnd () {
    console.log('end')
    this.run = false
  }

  handleTouchMove () {
    console.log('xx')
  }

  handleAnimationEnd () {
    console.log('ani end')
  }

  @Watch('step')
  onStepChange (v: number) {
    this.initStep()
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/decoration.scss';
.container,
.content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ff00ff;
  overflow: hidden;
  & > * {
    position: absolute;
    width: 100%;
  }
  div {
    height: 100%;
  }
}
.btn {
  position: absolute;
  width: 2rem;
  height: 2rem;
  left: 0;
  bottom: 10%;
  background-color: #ff0000;
  z-index: 999;
}

.status-0 {
  .section-1 {
    z-index: 10;
    @include origin(1);
  }
  .section-0 {
    display: flex;
    background-color: #000;
    justify-content: center;
    align-items: center;
    z-index: 11;
    @include origin(1);
  }
}
.status-1 {
  .section-2 {
    @include origin(2);
    z-index: 9;
  }
  .section-1 {
    @include origin(2);
    z-index: 10;
  }
}
</style>



