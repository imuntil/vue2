<template>
  <div class="container">
    <div class="content">
      <div class="step2">
        <div src="@/assets/section-2.jpg" :style="{transform: `scale(${g2.out})`}"
          alt="" class="section-2 img-wrap">
          <img src="@/assets/section-2.jpg" alt="">
        </div>
        <div class="step1" :style="{transform: `scale(${g2.in})`}">
          <div src="@/assets/section-1.jpg" :style="{transform: `scale(${g1.out})`}"
            alt="" class="section-1 img-wrap">
            <img src="@/assets/section-1.jpg" alt="">
          </div>
          <welcome :canvas-visible="canvasVisible" :petals-run="petalsRun"
            class="section-0" :style="{transform: `scale(${g1.in})`}"
          />
        </div>
      </div>
    </div>
    <words-layer :step="step" :duration="1000" :delay="500"
      v-if="wordsLayer " />
    <a class="btn" @touchstart="handleTouchStart" @touchend="handleTouchEnd"
      @touchmove="handleTouchMove" href="javascript:;"
    />
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import WordsLayer from '@/components/WordsLayer.vue'
  import Welcome from '@/components/Welcome.vue'
  interface Section {
    start: number
    payload: number
    ratio: number
    key: number
    [k: string]: any
  }
  interface Group {
    out: number,
    in: number,
    key?: number
  }
  const config: { [k: string]: Section } = {
    section1: { start: 15.88, key: 8, payload: 0.05, ratio: 0.063 },
    section2: { start: 8.772, key: 4, payload: 0.03, ratio: 0.114 }
  }

  @Component({
    components: {
      WordsLayer, Welcome
    }
  })
  export default class Wrap extends Vue {
    name: 'wrap'

    run: boolean = false
    step: number = 1
    /* 文字浮层 */
    wordsLayer: boolean = false
    /* 花瓣动画 */
    petalsRun: boolean = true
    /* 将canvas从页面删除 */
    canvasVisible: boolean = true

    /* 第一组 */
    g1: Group = {
      key: 0,
      out: config.section1.start,
      get in() {
        return this.out * config.section1.ratio
      },
    }
    /* 第二组 */
    g2: Group = {
      key: 0,
      out: config.section2.start,
      get in() {
        return this.out * config.section2.ratio
      }
    }
    /* current group */
    cg: Group = this.g1

    /* speed */
    speed: number = 100

    fire(time?: number) {
      const cg = this.cg
      const { out, in: inner, key } = cg

      /* 关键帧，动画加速，显示words layer */
      if (out < key!) {
        this.speed = 200
        this.wordsLayer = true
        /* 停止花瓣动画 */
        this.petalsRun = false
      }
      cg.out -= (out - inner) / this.speed
      if (cg.out <= 1) {
        cg.out = 1
        /* 下一个step */
        this.step++
        /* 删除canvas */
        this.canvasVisible = false
        if (this.step > 2) return
        /* hide words layer */
        this.wordsLayer = false
        this.initStep()
      }
      this.run && requestAnimationFrame(this.fire.bind(this))
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

    initStep() {
      this.speed = 120
      const { start, key } = config[`section${this.step}`]
      switch (this.step) {
        case 6: { }
        case 5: { }
        case 4: { }
        case 3: { }
        case 2: { }
          this.g2.out = start
          this.g2.key = key
          this.cg = this.g2
          break;
        case 1:
          this.g1.out = start
          this.g1.key = key
          this.cg = this.g1
          break;
      }
    }

    mounted() {
      this.initStep()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/decoration.scss';
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .content {
    div {
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .section-0 {
      background-color: #000;
      color: #fff;
      @include px2px(font-size, 50);
    }
  }
  .step1 > * {
    @include origin(1);
  }
  .step2 > * {
    @include origin(2);
  }
  .img-wrap {
    top: 0;
    left: 0;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .btn {
    position: absolute;
    width: 1.472222rem;
    height: 1.472222rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 10%;
    z-index: 999;
    background: url(../assets/finger.png) no-repeat center;
    background-size: cover;
  }
</style>
