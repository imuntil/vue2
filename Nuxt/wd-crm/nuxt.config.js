module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'wd-crm',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/reset.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'element-ui',
      'isomorphic-fetch',
      'lodash',
      'normalizr',
      'quill',
      'vue-quill-editor',
      'vue2-filters',
      'socket.io-client'
    ]
  },
  css: [
    'element-ui/lib/theme-default/index.css',
    '~assets/style/font.less',
    { src: '~assets/style/base.scss', lang: 'scss' }
  ],
  transition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (e) {
      console.log('----------------------------------before')
    }
  },
  plugins: [
    '~plugins/element-ui',
    '~plugins/some-config',
    '~plugins/vue-quill-editor',
    '~plugins/vue2-filters',
    '~plugins/socket'
  ],
  router: {
    middleware: ['check-auth', 'bread']
  }
}
