<template>
  <transition-group tag="div" class="trans-page" :enter-active-class="`animated ${classes[0]}`" :leave-active-class="`animated ${classes[1]}`">
    <div v-if="active === 0" key="0" v-touch:up.stop.prevent="swipeUp" class="page-1"></div>
    <div v-else key="1" class="page-2" v-touch:down.stop.prevent="swipeDown"></div>
  </transition-group>
</template>

<script>
  export default {
    data () {
      return {
        active: 0,
        classes: ['fadeInUp', 'fadeOut']
      }
    },
    methods: {
      swipeUp () {
        this.active = 1
        this.classes = ['fadeInUp', 'fadeOut']
      },
      swipeDown () {
        this.active = 0
        this.classes = ['fadeIn', 'fadeOutDown']
      }
    }
  }
</script>

<style scoped>
  .trans-page {
    height: 100%;
    background-color: #fff;
    overflow: hidden;
    position: relative;
  }
  .page-1,
  .page-2 {
    width: 100%;
    height: 100%;
    background-color: #ff00ff;
    position: absolute;
    left: 0;
    top: 0;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  }
  .page-2 {
    background-color: #000;
    z-index: 2;
  }
</style>
<style>
  .trans-page .animated.fadeInUp,
  .trans-page .animated.fadeOutDown {
    animation-duration: 0.5s;
  }
  .trans-page .animated.fadeOut {
    animation-delay: 0.5s;
    transform: translateZ(-100px);
  }
  .trans-page .animated.fadeIn {
    animation-duration: 0.1s;
  }
</style>
