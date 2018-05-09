<template>
  <div class="radar">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
  const shapePoints: (points: number, radius: number) => { x: number, y: number }[] = (p, r) => {
    const angle = Math.PI * 2 / p
    let start = -Math.PI / 2
    const end = start + Math.PI * 2
    const points = []
    while (start < end) {
      points.push({
        x: r * Math.cos(start),
        y: r * Math.sin(start)
      })
      start += angle
    }
    return points
  }

  import { Vue, Component } from 'vue-property-decorator'
  @Component
  export default class Radar extends Vue {
    name: 'radar'
    ctx: CanvasRenderingContext2D
    size: number = 300
    $refs: {
      canvas: HTMLCanvasElement
    }
    drawBg (radius: number, sides: number) {
      const canvas = this.$refs.canvas
      if (!this.ctx) {
        this.ctx = canvas.getContext('2d')!
        const dpr = window.devicePixelRatio
        canvas.style.width = this.size + 'px'
        canvas.style.height = this.size + 'px'
        canvas.width = this.size * dpr
        canvas.height = this.size * dpr
        this.ctx.scale(dpr, dpr)
        // 移动到中心
        this.ctx.save()
        this.ctx.translate(this.size / 2, this.size / 2)
      }
      const points = shapePoints(sides, radius)
      this.ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < sides; i++) {
        const { x, y } = points[i]
        this.ctx.lineTo(x, y)
      }
      this.ctx.closePath()
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = '#aaa'
      this.ctx.stroke()
    }
    drawWords () {
      this.ctx.save()
      const points = shapePoints(5, 100)
      this.ctx.font = '26px Arial'
      this.ctx.textBaseline = 'middle'
      this.ctx.textAlign = 'center'
      this.ctx.lineWidth = 1
      this.ctx.strokeStyle = '#555'
      const words = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      points.forEach(({ x, y }, index) => {
        this.ctx.fillStyle = 'white'
        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.beginPath()
        this.ctx.arc(0, 0, 15, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.fillStyle = '#555'
        this.ctx.fillText(words[index], 0, 0)
        this.ctx.restore()
      })
      this.ctx.restore()
    }
    drawLine (points: { x: number, y: number }[]) {
      this.ctx.save()
      const colors = [
        'red',
        'pink',
        'yellow',
        'purple',
        'blue'
      ]
      this.ctx.lineWidth = 6
      this.ctx.lineCap = 'round'
      this.ctx.globalAlpha = .7
      for (let i = 1; i <= points.length; i++) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = colors[i - 1]
        const start = points[i - 1]
        const end = points[i] || points[0]
        this.ctx.moveTo(start.x, start.y)
        this.ctx.lineTo(end.x, end.y)
        this.ctx.stroke()
      }
      this.ctx.restore()
    }
    randomPoints () {
      // 随机半径
      const rdRs = Array(5).fill('').map(v => Math.random() * 70 + 30)
      // 点
      return rdRs.map((v, i) => {
        return shapePoints(5, v)[i]
      })
    }
    init () {
      const axis = Array(5).fill('').map((v, i) => (i + 1) * 20)
      axis.forEach(v => {
        this.drawBg(v, 5)
      })
      this.drawWords()
      this.drawLine(this.randomPoints())
    }
    mounted () {
      this.init()
    }
  }
</script>

<style lang="scss">
  .radar {
    background-color: #fff;
    margin-top: 20px;
  }
</style>
