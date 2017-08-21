// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import touch from 'vue-directive-touch'
import FastClick from 'fastclick'
// import VueGesture from 'vue-gesture'
import wx from './lib/wetchat-plugin'

import './styles/reset.css'
import 'animate.css'

Vue.config.productionTip = false
// Vue.use(touch)
// Vue.use(VueGesture)

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  mounted () {
    wx.config(false)
  }
})
