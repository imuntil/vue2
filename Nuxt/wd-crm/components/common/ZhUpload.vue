<template>
  <el-upload class="product-upload" :action="action"
             :file-list="files" list-type="picture"
             accept="image/*" name="file" multiple
             :before-upload="handleBefore"
             :on-remove="handleRemove"
             :on-success="handleSuccess">
    <el-button size="small" type="primary">点击上传</el-button>
    <div class="upload-tip" slot="tip">只能上传jpg或png，建议尺寸750*750，不得超过300k</div>
  </el-upload>
</template>
<script>
  import { Upload, Button } from 'element-ui'
  import { url, staticUrl } from '~/assets/lib/api'
  /* eslint-disable no-unused-vars */
  import { delay } from '~/assets/lib/common-tools'
  import _ from 'lodash'
  export default {
    props: ['sku', 'images'],
    components: {
      ElUpload: Upload,
      ElButton: Button
    },
    data () {
      return {
        action: `${url}pros/${this.sku}/upload`,
        files: [],
        d: null
      }
    },
//    computed: {
//      files () {
//
//      }
//    },
    methods: {
      handleRemove (file, fl) {
        this.files = fl
        this.watchFiles()
      },
      handleSuccess (res, file, fileList) {
        const { code } = res
        if (code !== 0) return false
        if (!this.d) {
          this.d = _.debounce(() => {
            this.files = fileList
            this.watchFiles()
            this.d = null
          }, 100)
        }
        this.d()
      },
      watchFiles (v) {
        const urls = this.files.map(f =>
          f.response
            ? f.response.data
            : f.url.match(/(\/images\/.+\.(jpg|png)$)/)[0]
        )
        this.$emit('update:images', urls)
      },
      handleBefore (file) {
//        if (this.files.length > 5) return false
      }
    },
    created () {
      this.files = this.images.map(i => ({
        name: i.slice(-17),
        url: `${staticUrl}${i}`
      }))
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

</style>
