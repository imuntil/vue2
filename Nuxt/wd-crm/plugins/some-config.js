import Vue from 'vue'

Vue.prototype.$staticURL =
  process.env.NODE_ENV === 'development'
    ? 'https://localhost'
    : 'https://imuntil.com'
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
Vue.config.errorHandler = function(err, vm, info) {
  console.log(err)
}
