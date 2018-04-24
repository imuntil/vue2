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
  @Component({})
  export default class StaggerTransition extends Vue {
    name: "StaggerTransition"

    @Prop({ default: 200 })
    duration: number
    @Prop({ default: 0 })
    delay: number

    private beforeEnter(el: HTMLElement) {
      el.style.opacity = "0"
    }

    private enter(el: HTMLElement, done: () => any) {
      const delay: number =
        (+el.dataset.index! || 1) * this.duration + this.delay
      setTimeout(() => {
        Velocity.animate(el, { opacity: 1 }, { complete: done, duration: this.duration })
      }, delay)
    }

    private leave(el: HTMLElement, done: () => any) {
      const delay: number = (+el.dataset.index! || 1) * this.duration
      setTimeout(() => {
        Velocity.animate(el, { opacity: 0 }, { complete: done, duration: this.duration })
      }, delay)
    }
    /**
     * install 
     */
    public install(vue: typeof Vue): void {
      vue.component('StaggerTransition', StaggerTransition)
    }
  }
</script>

