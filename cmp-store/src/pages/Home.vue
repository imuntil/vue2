<template>
  <section class="container">
    <img class="main-bg" src="../assets/main-bg.jpg" width="100%" alt="">
    <cottons></cottons>
    <div class="content">
      <div class="title">
        <img class="logo" src="../assets/logo.png" alt="">
        <img src="../assets/main-title.png" alt="">
      </div>
      <div class="baby">
        <img src="../assets/baby.png" alt="">
      </div>
      <div class="words">
        <img src="../assets/words.png" alt="">
      </div>
      <div class="fingerprint-box">
        <img src="../assets/arrow-bottom.png" alt="">
        <p class="text--center line-words">请以妈妈最温柔的手触碰开始</p>
        <div class="fingerprint">
          <div class="inner" @click="handleClick">
            <img src="../assets/fingerprint.png" alt="">
            <img class="scan-line" src="../assets/scan-line.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Cottons from '@/components/Cottons.vue'
@Component({
  components: { Cottons }
})
export default class Home extends Vue {
  name: 'home'
  private handleClick () {
    this.$router.push('/activity')
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/decoration';
.main-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.content {
  position: relative;
}
img {
  margin: 0 auto;
  display: block;
}
.title {
  position: absolute;
  width: 100%;
  top: 0;
  img:not(.logo) {
    padding-top: 2.52rem - $status-height;    
    width: 9.5067rem;
  }
  img.logo {
    position: absolute;
    top: 2.24rem - $status-height;
    left: 0.4667rem;
    width: 2.2267rem;
  }
}
.baby {
  padding-top: 5.0533rem - $status-height;
  width: 100%;
  img {
    width: 5.3467rem;
    transform-origin: 3.666667rem /* 275/75 */ .666667rem /* 50/75 */;
    animation: bounce 3s linear infinite;
  }
}
.words {
  margin-top: 0.24rem;
  img {
    width: 5.5067rem;
  }
}
.fingerprint-box {
  margin-top: 0.2933rem;
}
.line-words {
  @include px2px(font-size, 24);
  color: #a87a2a;
  text-shadow: 3px 3px 4px rgba(255, 255, 255, 1),
    -3px -3px 4px rgba(255, 255, 255, 1);
  padding: 0.2933rem 0;
}
.fingerprint {
  text-align: center;
  .inner {
    display: inline-block;
    position: relative;
    overflow: hidden;
    & > img {
      width: 2.36rem;
    }
  }
  .scan-line {
    position: absolute;
    top: -0.6933rem;
    animation: scan 2s linear infinite;
  }
}
@keyframes scan {
  from {
    top: -0.6933rem;
  }
  to {
    top: 2.36rem;
  }
}
@keyframes bounce {
  0% {
    transform: rotate(0deg);
  }
  6% {
    transform: rotate(1deg);
  }
  12% {
    transform: rotate(-1deg);
  }
  18% {
    transform: rotate(1deg);
  }
  24% {
    transform: rotate(-1deg);
  }
  28% {
    transform: rotate(0deg);
  }
}
</style>
