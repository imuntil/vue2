<template>
  <div class="spinner-wrapper">
    <div class="semipolar-spinner">
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
    </div>
    <p class="percent" v-if="percent !== undefined">
      {{ percent }}%
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Spinner extends Vue {
  name: 'spinner'
  @Prop() percent: number
}
</script>
<style lang="scss" scoped>
@import '../styles/decoration';
.semipolar-spinner,
.semipolar-spinner * {
  box-sizing: border-box;
}

.semipolar-spinner {
  height: 120px;
  width: 120px;
  position: relative;
}

.semipolar-spinner .ring {
  border-radius: 50%;
  position: absolute;
  border: calc(120px * 0.05) solid transparent;
  border-top-color: $red;
  border-left-color: $red;
  animation: semipolar-spinner-animation 2s infinite;
}

.semipolar-spinner .ring:nth-child(1) {
  height: calc(120px - 120px * 0.2 * 0);
  width: calc(120px - 120px * 0.2 * 0);
  top: calc(120px * 0.1 * 0);
  left: calc(120px * 0.1 * 0);
  animation-delay: calc(2000ms * 0.1 * 4);
  z-index: 5;
}

.semipolar-spinner .ring:nth-child(2) {
  height: calc(120px - 120px * 0.2 * 1);
  width: calc(120px - 120px * 0.2 * 1);
  top: calc(120px * 0.1 * 1);
  left: calc(120px * 0.1 * 1);
  animation-delay: calc(2000ms * 0.1 * 3);
  z-index: 4;
}

.semipolar-spinner .ring:nth-child(3) {
  height: calc(120px - 120px * 0.2 * 2);
  width: calc(120px - 120px * 0.2 * 2);
  top: calc(120px * 0.1 * 2);
  left: calc(120px * 0.1 * 2);
  animation-delay: calc(2000ms * 0.1 * 2);
  z-index: 3;
}

.semipolar-spinner .ring:nth-child(4) {
  height: calc(120px - 120px * 0.2 * 3);
  width: calc(120px - 120px * 0.2 * 3);
  top: calc(120px * 0.1 * 3);
  left: calc(120px * 0.1 * 3);
  animation-delay: calc(2000ms * 0.1 * 1);
  z-index: 2;
}

.semipolar-spinner .ring:nth-child(5) {
  height: calc(120px - 120px * 0.2 * 4);
  width: calc(120px - 120px * 0.2 * 4);
  top: calc(120px * 0.1 * 4);
  left: calc(120px * 0.1 * 4);
  animation-delay: calc(2000ms * 0.1 * 0);
  z-index: 1;
}

@keyframes semipolar-spinner-animation {
  50% {
    transform: rotate(360deg) scale(0.7);
  }
}
</style>
<style lang="scss" scoped>
@import '../styles/decoration.scss';
.percent {
  text-align: center;
  @include px2px(font-size, 40);
  padding-top: .266667rem /* 20/75 */;
}
</style>




