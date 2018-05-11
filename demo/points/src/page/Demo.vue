<template>
  <div class="container" @touchmove="move">
    <div class="path"></div>
    <span :style="style"></span>
    <!-- <div class="ct">
      <div class="pt2"></div>
    </div> -->
  </div>

</template>

<script>
  export default {
    data () {
      return {
        x: 0
      }
    },
    computed: {
      y () {
        return 1 / 1000 * Math.pow(this.x, 2)
      },
      style () {
        return { 'transform': `translate(${this.x}px, ${this.y}px)` }
      }
    },
    methods: {
      move (e) {
        this.x = e.changedTouches[0].clientX - 175
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .path {
    width: 100%;
    height: 20%;
    border: 1px solid #000;
    border-radius: 100%;
    position: absolute;
  }
  span {
    width: 10px;
    height: 10px;
    background-color: #ff0000;
    display: inline-block;
    transform-origin: center center;
  }
  // .ct {
  //   &::before {
  //     width: 50%;
  //     content: '';
  //   }
  //   .pt2 {
  //     width: 1000px;
  //     height: 1000px;
  //     border: 1px solid #000;
  //     border-radius: 1000px;
  //   }
  // }
</style>
