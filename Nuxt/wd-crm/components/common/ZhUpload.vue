<template>
  <el-upload class="product-upload" :action="action"
             :file-list="files" list-type="picture"
             :on-remove="handleRemove"
             :on-preview="handlePreview">
    <el-button size="small" type="primary">点击上传</el-button>
    <div class="upload-tip" slot="tip">只能上传jpg或png，建议尺寸750*750，不得超过300k</div>
  </el-upload>
</template>
<script>
  import { Upload, Button } from 'element-ui'
  import { url } from '~/assets/lib/api'
  export default {
    components: {
      ElUpload: Upload,
      ElButton: Button
    },
    data () {
      return {
        action: `${url}pros/upload`,
        files: []
      }
    },
    methods: {
      handleRemove () {
        // x
      },
      handlePreview () {
        // x
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

</style>
