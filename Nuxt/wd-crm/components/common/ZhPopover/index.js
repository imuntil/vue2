import Zp from './ZhPopover.vue'
import Vue from 'vue'
const ZpConstructor = Vue.extend(Zp)

let old

ZpConstructor.prototype.close = function () {
  this.$on('after-leave', () => {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
      this.$destroy()
    }
  })
  this.visible = false
}

function removeOld () {
  old.close()
}
const ZhPopover = function (options = {}) {
  const instance = new ZpConstructor({
    el: document.createElement('div'),
    data: options
  })
  if (old) removeOld()
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => { instance.visible = true })
  old = instance
  // setTimeout(() => {
  //   instance.close()
  // }, 3000)
  return instance
}

export default ZhPopover
