<template>
  <div>
    Home
    <span>{{foo.v}}</span>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import Wx from '../utils/weixin'
  @Component({
  })
  export default class Home extends Vue {
    name: 'home'
    foo: any = {
      v: 1,
      x: 2
    }
    mounted () {
      Wx.shareTimeLine({
        title: 'custom title'
      })
      Wx.shareAppMessage({
        title: 'custom title2'
      })
      setTimeout(() => {
        this.foo.v = 10
      }, 1000);
    }
  }
</script>
<style lang="scss" scoped>

</style>
