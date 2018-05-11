<template>
  <div class="container">
    <div class="right-box">
      <a href="javascript:;" @touchstart.stop.prevent="handleClick(0)" class="road rr1" :class="{visible: view}">
        <img src="../assets/rr1.png" alt="">
        <img src="../assets/rr1-active.png" alt="">
        <span>积分</span>
        <i class="arrow-1"><img src="../assets/nav-btn-left2.png" alt=""></i>
      </a>
      <a href="javascript:;" @touchstart.stop.prevent="handleClick(1)" class="road rr2" :class="{visible: view}">
        <img src="../assets/rr2.png" alt="">
        <img src="../assets/rr2-active.png" alt="">
        <span>排名</span>
        <i class="arrow-2"><img src="../assets/nav-btn-left2.png" alt=""></i>
      </a>
      <a href="javascript:;" @touchstart.stop.prevent="handleClick(2)" class="road left rl1" :class="{visible: view}">
        <img src="../assets/rl1.png" alt="">
        <img src="../assets/rl1-active.png" alt="">
        <span>称号</span>
        <i class="arrow-3"><img src="../assets/nav-btn-left2.png" alt=""></i>
      </a>
      <a href="javascript:;" @touchstart.stop.prevent="handleClick(3)" class="road left rl2" :class="{visible: view}">
        <img src="../assets/rl2.png" alt="">
        <img src="../assets/rl2-active.png" alt="">
        <span>指南</span>
        <i class="arrow-4"><img src="../assets/nav-btn-left2.png" alt=""></i>
      </a>
    </div>
    <a class="toggle" @click="view = !view" href="javascript:;">view</a>
  </div>
</template>

<script>
  export default {
    name: 'center',
    data () {
      return {
        view: true
      }
    },
    methods: {
      handleClick (index) {
        this.$emit('on-road-click', index)
      }
    }
  }
</script>

<style scoped>
  .container {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .right-box {
    width: 75.2%;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #eee;
    position: absolute;
    overflow: hidden;
  }
  .road {
    position: absolute;
    right: 0;
    bottom: 0;
    transition: all 0.3s cubic-bezier(0.5, 0.43, 0.3, 1.22);
    display: block;
    text-align: right;
    line-height: 0;
  }
  .road span {
    position: absolute;
    color: #fff;
    width: 70px;
    height: 35px;
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    line-height: 35px;
    left: 0;
    top: 0;
    bottom: 0;
    right: -3rem;
    margin: auto;
    transform: rotate(45deg);
  }
  .road i {
    position: absolute;
    left: 40%;
    transform: rotate(180deg);
    top: 0;
    width: 28px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.4;
  }
  .left i {
    transform: rotate(0);
    left: 55%;
  }
  .left {
    left: 0;
    text-align: left;
  }
  .left span {
    transform: rotate(-32.3deg);
    left: -3rem;
    right: 0;
  }
  .road img {
    display: inline-block;
    transition: opacity 0.3s;
  }
  .left img {
    margin-left: 0;
  }
  .road img:nth-child(2n) {
    position: absolute;
    right: 0;
    bottom: 0;
    transition: opacity 0.3s;
    opacity: 0;
  }
  .left img:nth-child(2n) {
    left: 0;
  }
  .road:active img:nth-child(2n) {
    opacity: 1;
  }
  .road:active img:nth-child(2n + 1) {
    opacity: 0;
  }

  .rr1 {
    transform-origin: right top;
    transform: translate(100%, -440%) rotate(-45deg);
    bottom: 66.72%;
  }
  .rr1.visible,
  .rr2.visible {
    transform: translate(0, 0) rotate(-45deg);
  }
  .rr1 img {
    width: 108.9%;
  }
  .rr2 {
    transform-origin: right top;
    transform: translate(100%, -460%) rotate(-45deg);
    bottom: 51.83%;
    transition-delay: 0.1s;
  }
  .rr2 img {
    width: 81%;
  }
  .rr2 i {
    opacity: 0.7;
    left: 40%;
  }

  .rl1 {
    transform-origin: left top;
    transform: translate(-100%, -312%) rotate(32.3deg);
    bottom: 40.55%;
    transition-delay: 0.2s;
  }
  .rl1.visible,
  .rl2.visible {
    transform: translate(0, 0) rotate(32.3deg);
  }
  .rl1 img {
    width: 105.14%;
  }
  .rl2 {
    transform-origin: left top;
    transform: translate(-100%, -312.3%) rotate(32.3deg);
    bottom: 28%;
    transition-delay: 0.3s;
  }
  .rl2 img {
    width: 124.3%;
  }

  i[class^='arrow'] {
    animation: inf 2.5s linear infinite;
  }
  i.arrow-2 {
    animation-duration: 2s;
  }
  i.arrow-3,
  i.arrow-4 {
    animation-direction: reverse;
  }
  i.arrow-3 {
    animation-duration: 2.2s;
  }
  i.arrow-4 {
    animation-duration: 1.8s;
  }
  @keyframes inf {
    from {
      left: -30px;
    }
    to {
      left: 100%;
    }
  }
</style>
<style>
  .toggle {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    line-height: 50px;
    background-color: #fff;
  }
</style>
