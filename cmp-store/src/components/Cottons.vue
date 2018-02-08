<template>
  <div class="canvas"></div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

class CottonSprite {
  static width: number
  static height: number
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
  constructor () {
    this.reset()
  }
  public reset() {
    this.x = Math.random() * CottonSprite.width - 20
    this.y = Math.random() * -CottonSprite.height
    this.vy = 1 + Math.random() * 3
    this.vx = 4 * (0.5 - Math.random())
    this.o = 0.5 + Math.random() * 0.5
    this.r = Math.random() * Math.PI / 180
    this.s = Math.random() * Math.PI / 180 / 10 + Math.random() * 0.1 / 5
  }
}

@Component
export default class Cottons extends Vue {
  name: 'cottons'
  /* 元素总数量 */
  private COUNT: number = 10
  /* 画布 */
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  /* 精灵数组 */
  private cottonSprites: CottonSprite[] = []
  /* 图片 */
  private img: HTMLImageElement
  private imgNatural: { w: number, h: number }

  /* 初始化画布 */
  private init() {
    const container = this.$el
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
    CottonSprite.width = this.canvas.width = container.clientWidth
    CottonSprite.height = this.canvas.height = container.clientHeight
    container.appendChild(this.canvas)
    for (let i = 0; i < this.COUNT; i++) {
      this.cottonSprites.push(new CottonSprite())
    }
    const src = require('../assets/cotton.png')
    this.img = new Image()
    this.img.onload = () => {
      this.imgNatural = { w: this.img.naturalWidth, h: this.img.naturalWidth }
      requestAnimationFrame(this.update.bind(this))
    }
    this.img.src = src
  }
  /* 动画 */
  private update () {
    const { width, height } = this.canvas
    const { w, h } = this.imgNatural
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.fillStyle = '#FFFFFF'
    for (let i = 0; i < this.COUNT; i++) {
      const cs = this.cottonSprites[i]
      cs.y += cs.vy
      cs.x += cs.vx
      cs.r += cs.s
      const [ realW, realH ] = [ w * cs.o, h * cs.o ]
      this.reflex(cs, realW, w)
      this.ctx.save()
      this.ctx.translate(cs.x + w / 2, cs.y + h / 2)
      this.ctx.rotate(cs.r)
      this.ctx.drawImage(this.img, 0, 0, w, h,  -realW / 2, -realH / 2, realW, realH)
      this.ctx.restore()
      if (cs.y > height) {
        cs.reset()
      }
    }
    requestAnimationFrame(this.update.bind(this))
  }
  private reflex (cs: CottonSprite, realW: number, naturalW: number) {
    if (cs.x < 0 || cs.x + (naturalW + realW) / 2 > CottonSprite.width) {
      cs.vx = -cs.vx
    }
  }
  mounted() {
    this.init()
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
