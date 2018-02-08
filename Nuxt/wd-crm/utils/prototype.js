console.log('——————————————————test1 start————————————————————————————')
function P () {
  this.p = 1
}
function C () {
  this.c = 2
}
C.prototype = new P()
const c = new C()
/* eslint-disable no-proto */
console.log(c.__proto__ === C.prototype)
console.log(c.__proto__.__proto__ === P.prototype)
console.log(c.__proto__.__proto__.__proto__ === Object.prototype)
console.log(C.prototype.constructor === P)
console.log(P.prototype.constructor === P)

console.log('——————————————————test1 end————————————————————————————')
console.log('——————————————————test2 start————————————————————————————')
function D () {
  this.d = 'd'
}
D.prototype = Object.create(P.prototype)
const d = new D()
console.log(d)
console.log(d.__proto__ === D.prototype)
console.log(d.__proto__.__proto__ === P.prototype)
console.log('使用Object.create方法，原型链完整')
console.log(D.prototype.constructor === P)
console.log('——————————————————test2 end————————————————————————————')

console.log('——————————————————test3 start————————————————————————————')
const p = new P()
console.log(p.__proto__ === P.prototype)

function CC () {
  C.call(this, null)
  this.cc = '3'
}
const cc = new CC()
console.log(cc)

console.log(cc.__proto__ === CC.prototype)
console.log(cc.__proto__.__proto__ === C.prototype) // -> false
console.log('可见，使用call方法没有继承原型， cc的原型链上没有C ')
console.log('下面修改')
CC.prototype = Object.create(C.prototype)
const c2 = new CC()
console.log(c2.__proto__ === CC.prototype)
console.log(c2.__proto__.__proto__ === C.prototype)

console.log('——————————————————test3 end————————————————————————————')
console.log('——————————————————test start————————————————————————————')
class X {
  constructor () {
    this.x = 1
  }
}
class Y extends X {
  constructor () {
    super()
    this.y = 2
  }
}
const y = new Y()
console.log(y.__proto__ === Y.prototype)
console.log(y.__proto__.__proto__ === X.prototype)
console.log(y.__proto__.constructor === Y)
console.log('使用class extends方式集成，constructor也指向正确')
console.log('——————————————————test end————————————————————————————')
