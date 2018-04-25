import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route } from 'vue-router'
import store from '../store'

const Home: AsyncComponent = (): any =>
  import(/* webpackChunkName: 'helloworld' */ '@/pages/Home.vue')
const Wrap: AsyncComponent = (): any =>
  import(/* webpackChunkName: 'wrap' */ '@/pages/Wrap.vue')
const Loading: AsyncComponent = (): any =>
  import(/* webpackChunkName: 'loading' */ '@/pages/Loading.vue')
const Upload: AsyncComponent = (): any =>
  import(/* webpackChunkName: 'upload' */ '@/pages/Upload.vue')
const Vote: AsyncComponent = (): any =>
  import(/* webpackChunkName: 'vote' */ '@/pages/Vote.vue')


Vue.use(Router)

const routes: RouteConfig[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/wrap', name: 'index', component: Wrap },
  { path: '/loading', name: 'loading', component: Loading },
  { path: '/upload', name: 'upload', component: Upload },
  { path: '/vote', name: 'vote', component: Vote }
]

const router: Router = new Router({
  routes
})

router.beforeEach((to: Route, from: Route, next) => {
  // const { loaded } = store.state
  // const { name, path } = to
  // if (name !== 'loading' && !loaded) {
  //   next({ path: '/loading' })
  //   store.commit({ type: 'redirect', path })
  //   return
  // }
  next()
})

export default router
