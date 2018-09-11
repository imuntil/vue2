<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        dy {{count}}
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <router-link to="/hello" class="button--green">hello world</router-link>
        <router-link to="/about" class="button--grey">about</router-link>
        <a href="javascript:;" class="button--grey" @click="pfm">查看性能</a>
      </div>
      <ul class="sector">
        <li>页面加载完成时间:{{sector.loadPage}}</li>
        <li>解析 DOM 树结构的时间:{{sector.domReady}}</li>
        <li>重定向的时间:{{sector.redirect}}</li>
        <li>DNS 查询时间:{{sector.lookupDomain}}</li>
        <li>读取页面第一个字节的时间:{{sector.ttfb}}</li>
        <li>内容加载完成的时间:{{sector.request}}</li>
        <li>执行 onload 回调函数的时间:{{sector.loadEvent}}</li>
      </ul>
    </div>
  </section>
</template>

<script>
  import AppLogo from '~/components/AppLogo.vue'
  import pfm from '~/utils/pfm'
  import { mapState } from 'vuex'
  export default {
    components: {
      AppLogo
    },
    async fetch ({ store }) {
      store.commit('count/increase', { count: 1 })
    },
    data () {
      return {
        sector: {}
      }
    },
    computed: {
      ...mapState('count', ['count'])
    },
    methods: {
      pfm () {
        this.sector = pfm()
      }
    },
    beforeCreate () {
      console.log('beforeCreate')
    },
    created () {
      console.log('created')
    },
    beforeMount () {
      console.log('beforeMount')
    },
    mounted () {
      console.log('mounted')
    },
    beforeDestroy () {
      console.log('beforeDestroy')
    },
    destroyed () {
      console.log('destroyed')
    }
  }
</script>

<style scoped>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
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

