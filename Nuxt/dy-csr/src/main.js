import 'babel-polyfill'
/* eslint-disable */
import _ from 'lodash'
import axios from 'axios'
import 'animate.css'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
