import Vue from 'vue'

if (process.browser) {
  const Quill = require('quill')
  const { ImageImport } = require('~/assets/modules/imageImport')
  const { ImageResize } = require('~/assets/modules/imageResize')
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)
  const VueQuillEditor = require('vue-quill-editor/ssr')
  Vue.use(VueQuillEditor)
}
