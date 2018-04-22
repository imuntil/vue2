<template>
  <div class="container">
    <cottons :count="40" />
    <words-layer class="welcome" :step="0" />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import WordsLayer from './WordsLayer.vue'
  import Cottons from './Cottons.vue'
  @Component({
    components: { WordsLayer, Cottons }
  })
  export default class Welcome extends Vue {
    name: 'welcome'
  }
</script>

<style lang="scss" scoped>
  .container {
    background: url(../assets/welcome-bg.jpg) no-repeat left top;
    background-size: 100% 100%;
    .welcome {
      left: 2.814815rem; /* 304 */
      // top: 1.259259rem; /* 136 */
      top: 1.074074rem; /* 116 */
      width: 4.203704rem;
    }
  }
</style>
