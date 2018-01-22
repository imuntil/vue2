<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  name: 'App'
}
</script>

<style lang="scss" scoped>
@import './styles/decoration.scss';
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  * {
    @include px2px(font-size, 32);
  }
}
</style>
