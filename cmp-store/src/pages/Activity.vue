<template>
  <section class="container">
    <upload-image size="small" :upload="upload" :src="src"></upload-image>
    <br>
    <touch-bar class="touch-bar"></touch-bar>
    <Radar></Radar>
    <a href="javascript:;" @click="screenshot">screenshot</a>
    <img :src="shot" width="100%" style="border: 2px solid #fff;" alt="">
  </section>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import UploadImage from '../components/UploadImage/UploadImage.vue'
  import TouchBar from '../components/TouchBar/TouchBar.vue'
  import Radar from '../components/Radar/Radar.vue'
  import html2canvas from 'html2canvas'
  @Component({
    components: { UploadImage, TouchBar, Radar }
  })
  export default class Home extends Vue {
    name: 'home'
    /* 图片地址，没有则为空 */
    private src: string = ''
    private shot: string = ''
    private upload (f: File) {
      // 上传至服务器，并更新src
      console.log()
    }
    screenshot () {
      html2canvas(document.body).then((canvas: HTMLCanvasElement) => {
        // document.body.appendChild()
        this.shot = canvas.toDataURL()
      })
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  // .touch-bar {
  //   width: 80%;
  // }
</style>
