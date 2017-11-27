<template>
  <div class="quill-editor" v-model="content" v-quill:myQuillEditor="option"></div>
</template>
<script>
  export default {
    data () {
      return {
        option: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            }
//            ,
//            imageImport: true,
//            imageResize: {
//              displaySize: true
//            }
          }
        },
        content: ''
      }
    },
    methods: {
      handleFileChange () {
        console.log('change')
      }
    },
    mounted () {
      console.log('mounted')
    },
    created () {
      console.log('created')
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

</style>
