<template>
  <div class="container">
    <div class="box">
      <p class="imgs">
        <img v-if="count <= total * 0.444" key="35" src="@/assets/loading/loading-35.png" alt="">
        <img v-else-if="count <= total * 0.667" key="55" src="@/assets/loading/loading-55.png" alt="">
        <img v-else key="85" src="@/assets/loading/loading-85.png" alt="">
      </p>
      <p class="loading-bar">
        <span class="loaded" :style="{width: percent}"></span>
      </p>
      <p class="percent">{{percent}}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { imgs } from '../utils/imgs'
  import createjs from 'preloadjs'
  import { delay } from '../utils/cts';
  const needLoad = imgs.filter((v: string) => v.length < 100)

  @Component({})
  export default class loading extends Vue {
    name: 'loading'

    count: number = 0
    total: number = needLoad.length
    get percent (): string {
      return `${Math.floor(this.count / this.total * 100)}%`
    }

    onFileLoad () {
      this.count++
    }

    async onComplete () {
      this.$store.commit({ type: 'loaded' })
      await delay(500)
      const path = this.$store.state.path
      if (path) {
        this.$router.replace(path)
        return
      }
      this.$router.replace('/')
    }

    start () {
      const queue = new createjs.LoadQueue(true)
      queue.on('fileload', this.onFileLoad)
      queue.on('complete', this.onComplete)
      queue.loadManifest(needLoad)
      queue.load()
    }

    mounted () {
      this.start()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/decoration.scss';
  $loaded: #d0647f;
  $bg: #cac1c5;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading-bar {
    width: 3.657407rem; /* 395 */
    height: 0.259259rem; /* 28 */
    background-color: $bg;
    border-radius: 0.3rem;
    vertical-align: top;
  }
  .loaded {
    @extend .loading-bar;
    background-color: $loaded;
    width: 0;
    transition: width 0.25s;
    display: inline-block;
    font-size: 0;
    line-height: 0;
  }
  .percent {
    text-align: center;
    margin-top: 0.185185rem; /* 20 */
    @include px2px(font-size, 28);
  }
  .imgs img {
    width: 3.657407rem; /* 395 */
    height: 2.416667rem; /* 261 */
  }
</style>
