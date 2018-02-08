<template>
  <section class="container">
    <spinner :percent="percent"></spinner>
    <div class="content" ref="content">
      <img src="../assets/baby.png" @load="load" @error="load" alt="">
      <img src="../assets/main-title.png" @load="load" @error="load" alt="">
      <img src="../assets/main-bg.jpg" @load="load" @error="load" alt="">
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Spinner from '@/components/Spinner2.vue'
import { delay } from '../utils/cts'
@Component({
  components: { Spinner }
})
export default class Home extends Vue {
  name: 'home'
  /* 加载的图片数量 */
  private count: number = 0
  /* 需要加载的资源总量 */
  private children: number = 0
  private get percent() {
    if (!this.children) return 0
    return +(this.count / this.children * 100).toFixed(0)
  }
  /* 加载完成后动作 */
  private async next() {
    await delay(500)
    const path = this.$store.state.redirect
    if (path) {
      this.$router.replace(path)
      this.$store.commit({ type: 'redirect', path: '' })
    } else {
      this.$router.replace('/home')
    }
  }
  /* 资源加载 */
  private load() {
    this.count += 1
    if (this.count === this.children) {
      this.$store.commit({ type: 'loaded' })
      this.next()
    }
  }
  mounted() {
    /* 获取需要加载的资源总量 */
    const p = this.$refs['content'] as HTMLElement
    this.children = p.children.length
    this.count = 0
    const loaded = this.$store.state.loaded
    if (loaded) {
      this.next()
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content {
  display: none;
}
</style>
