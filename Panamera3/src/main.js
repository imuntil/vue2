// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import VeeValidate from 'vee-validate'

import router from './router/index'

import './lib/some-other'
import { ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'

import './styles/reset.css'
import './styles/base.scss'
import 'animate.css'

Vue.use(VeeValidate)
Vue.use(VueRouter)

Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
