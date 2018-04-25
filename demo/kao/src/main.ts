// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Wx, { fetchOpenID } from './utils/weixin'
import Croppa from 'vue-croppa'
import VueToasted from 'vue-toasted'
import 'animate.css'
import 'vue-croppa/dist/vue-croppa.css'
import './styles/common.scss'

Vue.config.productionTip = false
Vue.use(Croppa)
Vue.use(VueToasted, {
  position: 'top-center',
  duration: 1500,
  className: 'custom-toasted'
})

const app: Vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// Wx.wxReady()
/* 获取微信openid */
// store.dispatch('wxAuth')

export default app
