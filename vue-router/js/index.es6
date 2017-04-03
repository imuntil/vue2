/*
example-1
 */
// const Foo = {template:'<div>foo</div>'};
// const Bar = {template:'<div>bar</div>'};
// const routes = [
//     {path:'/foo', component:Foo},
//     {path:'/bar', component:Bar}
// ];
// const router = new VueRouter({routes});
// const app = new Vue({router}).$mount('#app');

/*
example-2
 */
// const User = {
//     template:'<div>User {{$route.params.id}}</div>',
//     watch: {
//         '$route' (to, from) {
//             console.log('route go from ' + from + ' to ' + to);
//         }
//     }
// };
// const routes = [
//     {
//         path:'/user/:id',
//         component:User
//     }
// ];
// const router = new VueRouter({routes});
// const app = new Vue({router}).$mount('#app');

/*
嵌套路由
 */
const User = {
    template:
    '<div class="user">' +
    '<h2>User {{$route.params.id}}</h2>' +
    '<router-view></router-view>' +
    '</div>',
    beforeRouteEnter (to, from, next) {
        next(vm => {

        })
    },
    beforeRouteUpdate (to, from, next) {
        next();
    },
    beforeRouteLeave (to, form, next) {

    }
};
const profile = {
    template:'<div>profile</div>'
};
const posts = {
    template:'<div>posts</div>'
};
const index = {
    template:'<div>index</div>'
};

const router = new VueRouter({
    routes:[
        {
            path:'/user/:id',
            component:User,
            children:[
                {
                    path:'profile',
                    component:profile
                },
                {
                    path:'posts',
                    component:posts
                },
                {
                    path:'',
                    component:{
                        template:'<div>index</div>'
                    }
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    next()
});
const app = new Vue({
    el:'#app',
    router:router,
    methods:{
        go(){
            router.push('/user/foo/posts');
        }
    }
});