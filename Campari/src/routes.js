/**
 * Created by 斌 on 2017/3/10.
 */

import VueRouter from 'vue-router'
import layout from './layouts/Main.vue'
import _ from 'lodash'
import config from './javascripts/config'

import home from './pages/Home.vue'
import products from './pages/Products.vue'
import products2 from './pages/Products2.vue'
import cocktail from './pages/Cocktail.vue'

const routes = [
    {
        path:'/', component:layout,
        children: [
            { path:'', component:home, name:'index'},
            { path:'/home', name:'home', component:home },
            { path:'/products', name:'products', component:products },
            // { path:'/products2/:flag?/:sort?/:type?', name:'products2', component(resolve){require(['./pages/Products2.vue'], resolve)} },
            { path:'/products2/:flag?/:sort?/:type?', name:'products2', component:products2},
            { path:'/cocktail', name:'cocktail', component:cocktail},
            // { path:'/cocktail', name:'cocktail', component(resolve){require(['./pages/Cocktail.vue'], resolve)} },
            { path:'/cart', name:'cart', component:() => System.import('./pages/Cart.vue') },
            { path:'/user', name:'user', component:() => System.import('./pages/User.vue') },
            { path:'/order/:from', name:'order', component() {return System.import('./pages/Order.vue')}},
            { path:'/detail/:id', name:'detail', component(resolve) {require(['./pages/Detail.vue'], resolve)}},
            { path:'/address/:from?', name:'address', component() {return System.import('./pages/address/address.vue')}},
            { path:'/editAdr/:status/:id?', name:'editAdr', component() {return System.import('./pages/address/editAdr.vue')}},
            { path:'/sign-in/:next?', name:'sign-in', component() {return System.import('./pages/Sign-in.vue')}},
            { path:'/login1', name:'login1', component() {return System.import('./pages/Login.vue')}},
            { path:'/login2', name:'login2', component() {return System.import('./pages/login2.vue')}},

            { path:'/modify-avatar', name:'modify-avatar', component() {return System.import('./pages/modify/modify-avatar.vue')}},
            { path:'/modify-nick', name:'modify-nick', component() {return System.import('./pages/modify/modify-nick.vue')}},

            { path:'/my-orders/:page', name:'my-orders', component() {return System.import('./pages/order/my-orders.vue')}},

        ]
    },
]

const router = new VueRouter({
    routes:routes
})

const NOT_NEET_SIGNIN = ['home', 'products', 'products2', 'cocktail', 'detail', 'sign-in', 'login1', 'login2', 'index'];
router.beforeEach((to, from, next) => {
    // if (config.dev) {
    //     next();
    //     return;
    // }
    if (from.name === null) {
        next();
        return;
    }
    let user = router.app.$store.state.user.user;
    if(_.indexOf(NOT_NEET_SIGNIN, to.name) === -1) {
        if (!user || !user.usersid) {
            console.log('xxxx');
            next({name:'sign-in', params:{next: to.name}});
            return;
        }
    }
    next();
});

export {router}