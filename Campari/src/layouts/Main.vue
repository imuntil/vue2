<template>
    <div class="root-wrap">

        <transition enter-active-class="animated fadeInDown"
                    leave-active-class="animated fadeOutDown"
                    mode="out-in" class="container-ani">
            <router-view :key="Math.random()"></router-view>
        </transition>


        <nav class="tabbar" v-show="show">
            <router-link :to="{name:'home'}" active-class="active" :class="{active:index}">
                <img src="src/img/nav-1.jpg" alt="" width="120%" class="no">
                <img src="src/img/nav-1-a.jpg" alt="" width="120%" class="is">
            </router-link>
            <router-link :to="{name:'products'}" active-class="active" :class="{active:active}">
                <img src="src/img/nav-2.jpg" alt="" width="120%" class="no">
                <img src="src/img/nav-2-a.jpg" alt="" width="120%" class="is">
            </router-link>
            <router-link :to="{name:'cocktail'}" active-class="active">
                <img src="src/img/nav-3.jpg" alt="" width="120%" class="no">
                <img src="src/img/nav-3-a.jpg" alt="" width="120%" class="is">
            </router-link>
            <router-link :to="{name:'cart'}" active-class="active">
                <img src="src/img/nav-4.jpg" alt="" width="120%" class="no">
                <img src="src/img/nav-4-a.jpg" alt="" width="120%" class="is">
            </router-link>
            <router-link :to="{name:'user'}" active-class="active">
                <img src="src/img/nav-5.jpg" alt="" width="120%" class="no">
                <img src="src/img/nav-5-a.jpg" alt="" width="120%" class="is">
            </router-link>
        </nav>
    </div>
</template>
<script>
    import _ from 'lodash'
    export default {
        computed:{
            active() {
                return this.$route.name === 'products2'
            },
            index() {
                return this.$route.name === 'index'
            },
            show() {
                return _.includes([
                    'index',
                    'home',
                    'products',
                    'products2',
                    'cocktail',
                    'user',
                ], this.$route.name);
            }
        }
    }


</script>

<style rel="stylesheet/scss" lang="scss">
    @import "../stylesheets/common.scss";
    @import "../stylesheets/animate.min.css";
    .fadeInDown.animated,
    .fadeOutDown.animated {
        animation-duration: .5s;
    }

    nav.tabbar {
        height:$tabbar-height;
        width:100%;
        position: fixed;
        bottom:0;
        background-color: #fafafa;
        border-top:1px solid #b2b2b2;
        z-index: 1000;

        a {
            width: 20%;
            height: 54px;
            float: left;
            padding-top: 2px;
            position: relative;
            img {
                position: absolute;
                top:0;
                left:-10%;
            }
            .is {
                display: none;
            }
            .no {
                display: block;
            }
        }
        a.active {
            .no {
                display: none;
            }
            .is {
                display: block;
            }
        }
    }
</style>