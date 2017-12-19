import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)

function lt (v) {
  return v >= 10 ? v : `0${v}`
}
// data time format
Vue.filter('dtf', v => {
  if (!v) return ''
  const dv = new Date(v)
  const M = dv.getMonth() + 1
  const D = dv.getDate()
  const h = dv.getHours()
  const m = dv.getMinutes()
  const s = dv.getSeconds()
  return `${dv.getFullYear()}.${lt(M)}.${lt(D)}-${lt(h)}:${lt(m)}:${lt(s)}`
})
