<template>
  <transition-group tag="div" :class="false" @before-enter="beforeEnter"
    @before-appear="beforeEnter" @enter="enter" @appear="enter"
    @leave="leave">
    <slot></slot>
  </transition-group>
</template>
<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator"
  import * as Velocity from "velocity-animate"
  @Component
  export default class StaggerTransition extends Vue {
    name: "stagger transition"

    @Prop({ default: 200 })
    duration: number
    @Prop({ default: 0 })
    delay: number

    private beforeEnter(el: HTMLElement) {
      Velocity.animate(el, this.config(0, 1.15, 25, 10), { duration: 0 })
    }
    private enter(el: HTMLElement, done: () => any) {
      const delay: number =
        (+el.dataset.index! || 1) * this.duration + this.delay
      setTimeout(() => {
        Velocity.animate(el, this.config(1, 1, 0, 0), { complete: done, duration: this.duration })
      }, delay)
    }
    private leave(el: HTMLElement, done: () => any) {
      const delay: number = (+el.dataset.index! || 1) * this.duration
      setTimeout(() => {
        Velocity.animate(el, this.config(0, 0.8, -25, -10), { complete: done, duration: this.duration })
      }, delay)
    }

    config(opacity: number, scale: number, translateX: number, translateZ: number) {
      return { opacity, scale, translateX, translateZ }
    }
    /**
     * install 
     */
    public install(vue: typeof Vue): void {
      vue.component('stagger-transition', StaggerTransition)
    }
  }
</script>

