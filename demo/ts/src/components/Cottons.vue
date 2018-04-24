<template>
  <div class="canvas">
    <img ref="img" src="../assets/petals/01.png" style="display: none;" alt="">
  </div>
</template>
<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import { petals } from '../utils/imgs'
  const total = petals.length

  class CottonSprite {
    static width: number
    static height: number

    /* 图片 */
    img: HTMLImageElement
    /* 自然宽高 */
    natural: { w: number, h: number } = { w: 0, h: 0 }

    public x: number = 0
    public y: number = 0
    public vy: number = 0
    public vx: number = 0
    /* 缩放倍率 */
    public o: number = 0
    /* 旋转角度 */
    public r: number = 0
    /* 旋转速率 */
    public s: number = 0

    constructor(src: string) {
      this.reset()
      this.img = new Image()
      this.img.src = src
      this.setNatural()
    }
    public reset () {
      this.x = Math.random() * CottonSprite.width - 20
      this.y = Math.random() * -CottonSprite.height
      this.vy = 1 + Math.random() * 3
      this.vx = 3 * (0.5 - Math.random())
      this.o = 0.5 + Math.random() * 0.5
      this.r = Math.random() * Math.PI / 180
      this.s = Math.random() * Math.PI / 180 / 10 + Math.random() * 0.1 / 5
    }

    public setNatural () {
      if (this.img.complete) {
        const { naturalHeight, naturalWidth } = this.img
        this.natural = { w: naturalWidth, h: naturalHeight }
      } else {
        this.img.onload = () => {
          const { naturalHeight, naturalWidth } = this.img
          this.natural = { w: naturalWidth, h: naturalHeight }
        }
      }
    }
  }

  @Component({})
  export default class Cottons extends Vue {
    name: 'cottons'
    /* 元素总数量 */
    @Prop({ default: 20 })
    count: number
    @Prop({ default: false })
    pause: boolean
    /* 画布 */
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    /* 精灵数组 */
    private cottonSprites: CottonSprite[] = []
    /* dpr */
    private dpr: number

    /* 初始化画布 */
    private init () {
      const container = this.$el
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')!
      CottonSprite.width = this.canvas.width = container.clientWidth
      CottonSprite.height = this.canvas.height = container.clientHeight
      container.appendChild(this.canvas)
      for (let i = 0; i < this.count; i++) {
        this.cottonSprites.push(new CottonSprite(petals[i % total]))
      }
      requestAnimationFrame(this.update.bind(this))
    }
    /* 动画 */
    private update () {
      const { width, height } = this.canvas
      this.ctx.clearRect(0, 0, width, height)
      this.ctx.fillStyle = '#FFFFFF'
      for (let i = 0; i < this.count; i++) {
        const cs = this.cottonSprites[i]
        const { w, h } = cs.natural
        cs.y += cs.vy
        cs.x += cs.vx
        cs.r += cs.s
        const [realW, realH] = [w * cs.o * this.dpr, h * cs.o * this.dpr]
        // this.reflex(cs, realW, w)
        this.ctx.save()
        this.ctx.translate(cs.x + w / 2, cs.y + h / 2)
        this.ctx.rotate(cs.r)
        this.ctx.drawImage(cs.img, 0, 0, w, h, -realW / 2, -realH / 2, realW, realH)
        this.ctx.restore()
        if (cs.y > height) {
          cs.reset()
        }
      }
      !this.pause && requestAnimationFrame(this.update.bind(this))
    }
    private reflex (cs: CottonSprite, realW: number, naturalW: number) {
      if (cs.x < 0 || cs.x + (naturalW + realW) / 2 > CottonSprite.width) {
        cs.vx = -cs.vx
      }
    }
    mounted () {
      this.init()
      this.dpr = +(window.devicePixelRatio || 1).toFixed(1) / 2
    }
  }
</script>
<style lang="scss" scoped>
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
</style>
