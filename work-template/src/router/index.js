import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/introduce', name: 'introduce', component () { return System.import('@/pages/Introduce.vue') } },
    { path: '/products', name: 'products', component () { return System.import('@/pages/Products.vue') } },
    { path: '/news', name: 'news', component () { return System.import('@/pages/News.vue') } },
    { path: '/contract', name: 'contract', component () { return System.import('@/pages/Contract.vue') } }
  ]
})
