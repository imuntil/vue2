<template>
  <stagger-transition class="word-layer" :class="[`step-${step}`]" :duration="duration" :delay="delay">
    <p v-for="(src, i) in imgs" :key="i+1" :data-index="i+1">
      <img :src="src" alt="">
    </p>
  </stagger-transition>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  import StaggerTransition from '@/components/Anim/StaggerTransition.vue'
  import { step1, step2, step0 } from '../utils/imgs'
  const imgList = [step0, step1, step2]

  @Component({
    components: { StaggerTransition }
  })
  export default class Words85 extends Vue {
    name: 'word-layer'

    @Prop({ default: 800 })
    duration: number
    @Prop({ default: 250 })
    delay: number
    @Prop()
    step: number

    imgs: string[] = imgList[this.step]

    beforeDestroy () {
      console.log('destroy')
      this.imgs = []
    }
  }
</script>

<style lang="scss" scoped>
  .word-layer {
    position: absolute;
    top: 0.722222rem; /* 78/108 */
    left: 0.666667rem; /* 72/108 */
    width: 3.935185rem;
    perspective: 100;
    p {
      float: right;
      width: 0.759259rem;
    }
    p:first-child {
      width: 0.898148rem;
    }
    img {
      width: 100%;
    }
  }
  .word-layer.step-2 {
    width: 4.148148rem; /* 448 */
    p:first-child {
      width: 1.111111rem; /* 120 */
    }
  }
  .word-layer.step-0 p:first-child {
    width: 0.981481rem; /* 106 */
  }
</style>
