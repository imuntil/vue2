<template>
  <div class="container">
    <router-link to="/upload">to upload</router-link>
    <img v-for="(s, i) in imgs" :src="s" :key="i" alt="">
    <router-link to="/">home</router-link>
    <!-- <Welcome :canvas-visible="false" :petals-run="false"></Welcome> -->
    <words-layer :step="0" :duration="1000" :delay="500" />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Welcome from '@/components/Welcome.vue'
  import WordsLayer from '@/components/WordsLayer.vue'
  import { step0 } from '../utils/imgs'
  @Component({
    components: { Welcome, WordsLayer }
  })
  export default class Vote extends Vue {
    name: 'vote'
    imgs: string[] = step0
  }
</script>

<style lang="scss" scoped>
  img {
    width: 0.462963rem;
  }
</style>
