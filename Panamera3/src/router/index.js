import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'login', component () { return System.import('@/pages/Login.vue') } },
    { path: '/activity', name: 'activity', component () { return System.import('@/pages/Activity.vue') } },
    { path: '/competing', name: 'competing', component () { return System.import('@/pages/Competing.vue') } },
    { path: '/introduction', name: 'introduction', component () { return System.import('@/pages/Introduction.vue') } },
    { path: '/pictures', name: 'pictures', component () { return System.import('@/pages/Pictures.vue') } },
    { path: '/pics-sub/:sub', name: 'p-sub', component () { return System.import('@/pages/Pictures-sub.vue') } },
    { path: '/schedule', name: 'schedule', component () { return System.import('@/pages/Schedule.vue') } },
    { path: '/space', name: 'space', component () { return System.import('@/pages/Space.vue') } },
    { path: '/test-drive', name: 'drive', component () { return System.import('@/pages/Test-drive.vue') } },
    { path: '/td-test', name: 'td-test', component () { return System.import('@/pages/TD-Test.vue') } },
    { path: '/td-task', name: 'td-task', component () { return System.import('@/pages/TD-Task.vue') } },
    { path: '/menu', name: 'menu', component () { return System.import('@/pages/Menu.vue') } },
    //  vct
    { path: '/vct', name: 'v-login', component () { return System.import('@/pages/Login.vue') } },
    { path: '/vct/menu', name: 'v-menu', component () { return System.import('@/pages/VCT/Menu.vue') } },
    { path: '/vct/test/:model', name: 'v-test', component () { return System.import('@/pages/VCT/Test.vue') } }
  ]
})
