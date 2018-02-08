// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/common.scss'
import Wx from './utils/weixin'

Vue.config.productionTip = false

const app: Vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

/* 获取微信openid */
store.dispatch('wxAuth')

// 微信init
Wx.wxReady({
  title: 'unicharm',
  desc: 'pppppppp',
  link: 'http://www.baidu.com',
  imgUrl: 'http://api.jtuntech.com/event/2017/Q4/porsche-e3/static/img/logo.ab3c77a.jpg'
})

export default app
