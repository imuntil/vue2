<template>
  <div>
    Home
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Wx from '../utils/weixin'
  @Component({
  })
  export default class Home extends Vue {
    name: 'home'
    mounted () {
      Wx.shareTimeLine({
        title: 'custom title'
      })
      Wx.shareAppMessage({
        title: 'custom title2'
      })
    }
  }
</script>
<style lang="scss" scoped>

</style>
