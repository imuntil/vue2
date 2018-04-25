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
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <words-layer :step="step" :duration="1000" :delay="500"
        v-if="wordsLayer" />
    </transition>
    <a class="btn" @touchstart="handleTouchStart" @touchend="handleTouchEnd"
      href="javascript:;" />
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator'
  import WordsLayer from '@/components/WordsLayer.vue'
  import Welcome from '@/components/Welcome.vue'
  import { ISection, IGroup } from '../services/interface'
  import { config, g1, g2 } from '../services/ani.config'

  @Component({
    components: {
      WordsLayer, Welcome
    }
  })
  export default class Home extends Vue {
    name: 'home'

    run: boolean = false
    step: number = 1
    /* 文字浮层 */
    wordsLayer: boolean = false
    /* 花瓣动画 */
    petalsRun: boolean = true
    /* 将canvas从页面删除 */
    canvasVisible: boolean = true
    /* 第一、二、三。。。。。组 */
    g1: IGroup = g1
    g2: IGroup = g2
    /* current group */
    cg: IGroup = this.g1
    /* speed */
    speed: number = 100

    fire(time?: number) {
      const cg = this.cg
      const { out, in: inner, key, payload } = cg
      /* 关键帧，动画加速，显示words layer */
      if (out < key!) {
        this.speed = 200
        this.wordsLayer = true
        /* 停止花瓣动画 */
        this.petalsRun = false
      }
      cg.out -= (out - inner) / this.speed * payload
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

    initStep() {
      this.speed = 120
      const { start: out, key, ratio, payload } = config[`section${this.step}`]
      this.cg = {
        out,
        key,
        ratio,
        payload,
        get in() {
          return this.out * this.ratio
        }
      }
      switch (this.step) {
        case 6: { }
        case 5: { }
        case 4: { }
        case 3: { }
        case 2: { }
          this.g2 = this.cg
          break;
        case 1:
          this.g1 = this.cg
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
