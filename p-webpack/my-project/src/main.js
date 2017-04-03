import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => {
      console.log(App);
      return h(App)
  }
})
