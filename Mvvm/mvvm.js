function Mvvm(options = {}) {
  this.$options = options
  let data = (this._data = this.$options.data)
  observe(data)
  //数据代理
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get() {
        return this._data[key]
      },
      set(v) {
        this._data[key] = v
      }
    })
  }

  new Compile(options.el, this)
}

/* 数据劫持 */
function Observe(data) {
  for (let key in data) {
    const dep = new Dep()
    let val = data[key]
    observe(val)
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        console.log('key:', key, dep.subs)
        return val
      },
      set(newVal) {
        if (val === newVal) return
        val = newVal
        observe(newVal)
        dep.notify()
      }
    })
  }
}

function observe(data) {
  if (!data || typeof data !== 'object') return
  return new Observe(data)
}

/* 数据编译 */
function Compile(el, vm) {
  vm.$el = document.querySelector(el)
  const fragment = document.createDocumentFragment()

  let child
  while ((child = vm.$el.firstChild)) {
    fragment.appendChild(child)
  }

  function replace(frag) {
    Array.from(frag.childNodes).forEach(node => {
      const txt = node.textContent
      const reg = /\{\{(.*)\}\}/g
      if (node.nodeType === 3 && reg.test(txt)) {
        const arr = RegExp.$1.split('.')
        let val = vm
        arr.forEach(key => {
          val = val[key]
        })

        node.textContent = txt.replace(reg, val).trim()

        new Watcher(vm, RegExp.$1, newVal => {
          node.textContent = txt.replace(reg, newVal).trim()
        })
      }
      if (node.nodeType === 1) {
        const nodeAttr = node.attributes
        Array.from(nodeAttr).forEach(attr => {
          const { name, value: exp } = attr
          if (name.includes('v-')) {
            node.value = exp.split('.').reduce((cvm, v) => cvm[v], vm)

            new Watcher(vm, exp, newVal => {
              node.value = newVal
            })

            node.addEventListener(
              'input',
              e => {
                const path = exp.split('.')
                const last = path.pop()
                const parent = path.reduce((cvm, v) => cvm[v], vm)

                parent[last] = e.target.value
              },
              false
            )
          }
        })
      }
      if (node.childNodes && node.childNodes.length) {
        replace(node)
      }
    })
  }
  replace(fragment)
  vm.$el.appendChild(fragment)
}

/* 发布订阅 */
function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}
/* 监听函数 */
function Watcher(vm, exp, fn) {
  console.log('watch:', exp)
  this.fn = fn
  this.vm = vm
  this.exp = exp

  Dep.target = this
  let arr = exp.split('.')
  let val = vm
  arr.forEach(key => {
    // 这里会调用get方法
    val = val[key]
  })
  Dep.target = null
}
Watcher.prototype.update = function() {
  let arr = this.exp.split('.')
  let val = this.vm
  arr.forEach(key => {
    val = val[key]
  })
  this.fn(val)
}
