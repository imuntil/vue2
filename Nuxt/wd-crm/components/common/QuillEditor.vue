<template>
  <div class="quill-content" style="position: relative;">
    <div id="toolbar" slot="toolbar">
      <!-- Add a bold button -->
      <button class="ql-bold">Bold</button>
      <button class="ql-italic">Italic</button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
      <!-- Add font size dropdown -->
      <select class="ql-size">
        <option value="small"></option>
        <!-- Note a missing, thus falsy value, is used to reset to default -->
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
      <button class="ql-header" value="1"></button>
      <button class="ql-header" value="2"></button>
      <!-- Add subscript and superscript buttons -->
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>

      <select class="ql-color"></select>
      <select class="ql-background"></select>

      <select class="ql-align"></select>
      <button class="ql-clean"></button>

      <button class="ql-link"></button>
      <button class="custom-upload">
        <svg viewBox="0 0 18 18"> <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> <circle class="ql-fill" cx="6" cy="7" r="1"></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>
        <input @change="handleFileChange" accept="image/*" type="file">
      </button>
    </div>
    <div class="quill-container">
      <div :content="content" style="position: relative;"
           @change="handleEditorChange($event)"
           v-quill:editor="option">
      </div>
    </div>
  </div>
</template>
<script>
  import { uploadImage } from '~/assets/lib/api'
  export default {
    props: ['content', 'sku'],
    data () {
      return {
        scrollingContainer: '.quill-content',
        option: {
          modules: {
            toolbar: '#toolbar',
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageImport: true,
            imageResize: {
              displaySize: false
            }
          }
        }
      }
    },
    methods: {
      handleEditorChange (e) {
        this.$emit('update:content', e.html)
      },
      async handleFileChange (e) {
        const files = e.target.files
        if (files.length === 0) return false
        console.log('xxxxxxxxxxxxxxxxxxxxxxxx')
        const path = await this.uploadImg(files[0])
        console.log(path)
        if (!path) return false
        const index = (this.editor.getSelection() || {}).index || this.editor.getLength()
        this.editor.insertEmbed(index, 'image', path, 'user')
      },
      async uploadImg (file) {
        const fd = new FormData()
        fd.append('file', file)
        const { err, data, fail } = await uploadImage({ fd, sku: this.sku })
        if (err || fail) return false
        console.log(data)
        return `${this.$staticURL}${data.data}`
      }
    },
    created () {
      console.log('created')
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .custom-upload {
    position: relative;
    width: auto !important;
    input {
      position: absolute;
      top: 0;
      width: 0;
      left: 0;
      right: 0;
      opacity: 0;
    }
  }
</style>
