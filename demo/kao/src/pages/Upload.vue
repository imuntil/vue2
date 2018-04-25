<template>
  <div class="container">
    <p class="flex-right">
      <a href="javascript:;" class="btn">活动说明</a>
    </p>
    <div class="content">
      <croppa v-model="myCroppa" :width="options.width" :height="options.height"
        @file-choose="hasFile = true" :show-remove-button="false"></croppa>
    </div>
    <p class="flex-space-between">
      <a class="btn" @click="chooseFile" href="javascript:;">重新选择</a>
      <a class="btn" @click="submit" href="javascript:;">确认上传</a>
    </p>
    <img :src="src" width="200px" alt="">
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  @Component({})
  export default class Upload extends Vue {
    name: 'upload'

    hasFile: boolean = false
    src: string = ''
    options: any = {
      width: null,
      height: null
    }
    myCroppa: any = {}

    chooseFile() {
      this.myCroppa.chooseFile()
    }

    submit() {
      if (!this.hasFile) {
        this.$toasted.show('请选择照片')
        return
      }
      this.src = this.myCroppa.generateDataUrl()
    }

    mounted() {
      const w = document.documentElement.offsetWidth * 0.6
      this.options.width = w
      this.options.height = w * 1.2
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    widows: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
