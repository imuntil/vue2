<template>
  <div>
    <p class="title">index page</p>
    <ul>
      <li @click="share('1')">1111111111111111111</li>
      <li @click="share('2')">22222222222222222</li>
      <li @click="share('3')">3333333333333333333</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Wx from '../utils/weixin'
@Component
export default class Index extends Vue {
  name: 'index'
  private share(str: string) {
    const content = { title: '', desc: '' }
    switch (str) {
      case '1':
        content.title = content.desc = '111111111111'
        break
      case '2':
        content.title = content.desc = '22222222222'
        break
      default:
        content.title = content.desc = '3333333333333'
    }
    Wx.shareTimeLine(content)
    Wx.shareAppMessage(content)
  }
}
</script>
<style lang="scss" scoped>
@import '../styles/decoration';
.title {
  text-align: center;
  @include px2px(font-size, 40);
}
</style>
