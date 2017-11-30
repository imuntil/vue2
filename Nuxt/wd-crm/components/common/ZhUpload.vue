<template>
  <el-upload class="product-upload" :action="action"
             :file-list="files" list-type="picture"
             accept="image/jpeg, image/png" name="file" multiple
             :before-upload="handleBefore"
             :on-remove="handleRemove"
             :on-success="handleSuccess">
    <el-button size="small" type="primary">点击上传</el-button>
    <div class="upload-tip" slot="tip">只能上传jpg或png，建议尺寸750*750，不得超过300k</div>
  </el-upload>
</template>
<script>
//  import { Upload, Button } from 'element-ui'
  import { url, staticUrl } from '~/assets/lib/api'
  /* eslint-disable no-unused-vars */
  import { delay } from '~/assets/lib/common-tools'
  import _ from 'lodash'
  export default {
    props: ['sku', 'images'],
    components: {
//      ElUpload: Upload,
//      ElButton: Button
    },
    data () {
      return {
        action: `${url}pros/${this.sku}/upload`,
        files: [],
        d: null
      }
    },
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
      handleBefore (file) {
        if (file.size > 300 * 1024) {
          this.$notify({ title: '消息', message: '配图不得超过300k', type: 'warning' })
          return false
        }
        if (this.files.length >= 5) {
          this.$notify({ title: '消息', message: '每个产品最多只能上传5张配图, 超出的配图不会被保存', type: 'warning' })
          return false
        }
      },
      watchFiles (v) {
        const urls = this.files.map(f =>
          f.response
            ? f.response.data
            : f.url.match(/(\/images\/.+\.(jpg|png)$)/i)[0]
        )
        this.$emit('update:images', urls)
      }
    },
    created () {
      this.files = (this.images && this.images.map(i => ({
        name: i.slice(-17),
        url: `${staticUrl}${i}`
      }))) || []
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

</style>
