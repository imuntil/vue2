/**
 * Created by 斌 on 2017/4/30.
 */
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Velocity from 'velocity-animate'
import '../../static/vendor/velocity.ui'
// import messageCn from 'vee-validate/dist/locale/zh_CN'

Vue.directive('re-render', {
  inserted (el, binding) {
    setTimeout(function () {
      el.style.paddingBottom = binding.value
    }, 2000)
  }
})
Vue.directive('shaking', {
  update (el, binding) {
    let value = binding.value
    if (value) {
      Velocity(el, {
        borderColor: '#ff0000'
      }, {duration: 200, queue: false})
      Velocity(el, 'callout.flash', { duration: 500 })
        .then(function () {
          Velocity(el, {
            borderColor: '#ffffff'
          }, {duration: 200})
        })
    }
  }
})
Vue.directive('prevent-pull-down', {
  bind (el, binding) {
    // xx
    let start = 0
    el.addEventListener('touchmove', function (e) {
      let bound = el.getBoundingClientRect()
      if (start < bound.top || start > bound.bottom) return
      let current = e.changedTouches[0].clientY
      if (current > start && el.scrollTop === 0) {
        return e.preventDefault()
      }
      e.stopPropagation()
    }, false)
    el.addEventListener('touchstart', function (e) {
      start = e.touches[0].clientY
    })
  }
})

VeeValidate.Validator.extend('phone', {
  getMessage (filed, params, data) {
    return (data && data.message) || 'phone number is wrong'
  },
  validate (value) {
    let _reg = /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/
    return _reg.test(value)
  }
})
// VeeValidate.Validator.addLocale(messageCn)
// Vue.use(VeeValidate, {
//   locale: 'zh_CN'
// })
