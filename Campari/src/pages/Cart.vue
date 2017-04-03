<template>
    <div class="wrapper">
        <div class="out-container">
            <div class="main-container cart-page">
                <transition name="cart-turn" mode="out-in">
                    <cart-item key="full" v-if="cart.length" :cart="cart"></cart-item>
                    <div v-else key="empty" class="empty-cart">
                        <div>
                            <img src="src/img/empty-cart.jpg" alt="">
                        </div>
                    </div>
                </transition>
                <div class="like">
                    <h3 class="with-after">猜你喜欢</h3>
                    <ul>
                        <li-item :item="{}"></li-item>
                        <li-item :item="{}"></li-item>
                        <li-item :item="{}"></li-item>
                        <li-item :item="{}"></li-item>
                    </ul>
                </div>
                <div class="foot-bar">
                    <a href="javascript:void(0);"
                       @click="chooseAll()"
                       class="choose-all">
                        <img v-show="allChosen" src="src/img/chosen.png" alt="">
                        <img v-show="!allChosen" src="src/img/not-choose.png" alt="">
                        全选
                    </a>
                    <div>
                        <span>合计：￥{{theMoney}}</span>
                        <a href="javascript:;" @click="toSettle()">去结算</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CartItem from '../components/cart-item.vue'
    import LiItem from '../components/li-item.vue'
    import {cart} from '../javascripts/services'
    import * as type from '../javascripts/constant'

    export default {
        components:{
            CartItem,
            LiItem
        },
        computed:{
            cart() {
                return this.$store.getters[type.CART_ALL];
            },
            allChosen() {
                return this.$store.getters[type.CART_ALL_CHOSEN];
            },
            theMoney() {
                return this.$store.getters[type.CART_THE_MONEY];
            }
        },
        methods:{
            chooseAll() {
                this.$store.commit(type.CART_CHOOSE_ALL, !this.allChosen);
            },
            toSettle() {
                if (this.theMoney === 0) {
                    this.$toasted.show('还没有选中商品哦', {
                        theme:'outline',
                        position:'top-center',
                        duration:1000
                    });
                    return;
                }
                this.$router.push({name:'order', params:{from:'cart'}});
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../stylesheets/common";
    .cart-page {
        position: relative;
        width:100%;
        display: block;
        overflow-y: scroll;
        overflow-x: hidden;
        .empty-cart {
            width:100%;
            display: block;
            background-color: $f6-bg-color;
            padding-bottom:12px;
            div {
                background-color: #fff;
                border-bottom:1px solid $home-border;
                padding:20%;
            }
            img {
                width:50%;
                margin:0 auto;
            }
        }
        .like {
            width:90%;
            margin:0 auto;
            padding-bottom:$tabbar-height + 15px;
            ul {
                @include homeUl;
                margin-top: 15px;
            }
        }
        .foot-bar {
            position: fixed;
            bottom:0;
            left:0;
            width:100%;
            height:$tabbar-height;
            background-color: #ffffff;
            overflow: hidden;
            border-top:1px solid $home-border;
            display: flex;
            flex-direction:row;
            padding:0 5%;
            box-sizing: border-box;
            flex-basis:100%;
            .choose-all {
                display: flex;
                flex: 0 0 auto;
                padding: 0 2%;
                align-items: center;
                color: #000;
                font-size: $font-size;
                img {
                    height:20px;
                    width:20px;
                    margin-right:10px;
                }
            }
            div {
                display: flex;
                flex:auto;
                align-items:center;
                justify-content:flex-end;
                font-size: $font-size;
                span {
                    color: $home-red-color;
                }
                a {
                    margin-left:5%;
                    padding:8px 8%;
                    background-color: $red-btn-color;
                    color: #ffffff;
                    font-size: $font-size;
                    border-radius: 3px;
                    flex:0 0 auto;
                    white-space:nowrap;
                }
            }
        }

        .cart-turn-enter-active, cart-turn-leave-active {
            transition: opacity 1s;
        }
        .cart-turn-enter, .cart-turn-leave {
            opacity:0;
        }
    }
</style>