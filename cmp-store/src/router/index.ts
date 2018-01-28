import Vue, { AsyncComponent } from 'vue'
import Router , { RouteConfig, Route } from 'vue-router'
import store from '../store'

const Home: AsyncComponent = (): any => import(/* webpackChunkName: 'home' */ '@/pages/Home.vue')
const Loading: AsyncComponent = (): any => import(/* webpackChunkName: 'loading' */ '@/pages/Loading.vue')
const Activity: AsyncComponent = (): any => import(/* webpackChunkName: 'activity' */ '@/pages/Activity.vue')
const Share: AsyncComponent = (): any => import(/* webpackChunkName: 'share' */ '@/pages/Share.vue')

Vue.use(Router)

const routes: RouteConfig[] = [
  { path: '/', name: 'loading', component: Loading },
  { path: '/home', name: 'home', component: Home },
  { path: '/Activity', name: 'activity', component: Activity },
  { path: '/share', name: 'share', component: Share }
]

const router: Router = new Router({
  routes
})

router.beforeEach((to: Route, from: Route, next) => {
  const { loaded } = store.state
  const { name, path } = to
  if (name !== 'loading' && !loaded) {
    next('/')
    store.commit({ type: 'redirect', path })
    return
  }
  next()
})

export default router
