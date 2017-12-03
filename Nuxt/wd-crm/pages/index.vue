<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        wd-crm
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
        <a href="javascript:;" @click="test">debounce</a>
        <a href="javascript:;" @click="test2">throttle</a>
      </div>
    </div>
  </section>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import _ from 'lodash'
  export default {
    components: {
      Logo
    },
    data () {
      return {
        d: null,
        t: null
      }
    },
    methods: {
      test () {
        if (!this.d) {
          this.d = _.debounce(() => {
            console.log('x')
            this.d = null
          }, 500)
        }
        this.d()
      },
      test2 () {
        if (!this.t) {
          this.t = _.throttle(() => {
            console.log('t')
            this.t = null
          }, 500, { trailing: true })
        }
        this.t()
      }
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
