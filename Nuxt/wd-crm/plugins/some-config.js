import Vue from 'vue'

Vue.prototype.$staticURL = 'http://localhost:3001'
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
Vue.config.errorHandler = function (err, vm, info) {
  console.log(err)
}
