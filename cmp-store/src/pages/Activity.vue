<template>
  <section class="container">
    <upload-image size="small" :upload="upload" :src="src"></upload-image>
  </section>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import UploadImage from '@/components/UploadImage'
  @Component({
    components: { UploadImage }
  })
  export default class Home extends Vue {
    name: 'home'
    /* 图片地址，没有则为空 */
    private src: string = ''
    private upload (f: File) {
      // 上传至服务器，并更新src
      console.log(f)
    }
  }
</script>
<style lang="scss" scoped>
.container {
}
</style>
