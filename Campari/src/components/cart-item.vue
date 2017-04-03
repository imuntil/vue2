<template>
    <div class="shopping-cart">
        <transition-group name="cart" tag="div">
            <div class="mart-group"
                 v-for="item in cart"
                 :key="item.id"
                 :index = "item.id"
                 :class="{editing: editing && editIndex == item.id}">
                <div class="item" >
                    <div class="choose">
                        <a @click="choose(item)" href="javascript:void(0);">
                            <img v-show="item.chosen" src="src/img/chosen.png" alt="" width="100%">
                            <img v-show="!item.chosen" src="src/img/not-choose.png" alt="" width="100%">
                        </a>
                    </div>
                    <div class="img">
                        <img src="src/img/home-sellings-1.jpg" alt="" width="100%">
                    </div>
                    <div class="infos">
                        <p>{{item.englishname}}</p>
                        <p>{{item.proname}}</p>
                        <p class="spe">{{item.procontent}}ml</p>
                        <div class="group">
                            <a href="javascript:void(0);"
                               :class="{disable:item.count == 1}"
                               @click="count('-', item)">
                                －
                            </a>
                            <span>{{item.count}}</span>
                            <a @click="count('+', item)" href="javascript:void(0);">
                                ＋
                            </a>
                        </div>
                    </div>
                    <div class="price">
                        {{item.proprice * item.count | currency('￥', 0)}}
                    </div>
                </div>
                <a href="javascript:void(0);"
                   @click="deleteItem(item)"
                   class="delete">删除</a>
            </div>
        </transition-group>
    </div>
</template>
<script>
//    import $ from 'jquery'
    import Hammer from 'hammerjs'
    import {CART_EDIT_COUNT, CART_CHOOSE, CART_DELETE_ITEM} from '../javascripts/constant'
    export default {
        props:{
            cart:{
                type:Array,
                required:true
            }
        },
        data() {
            return {
                editing:false,
                editIndex:-1
            }
        },
        methods:{
            count(method, item) {
                this.$store.commit(CART_EDIT_COUNT, {method:method, id:item.id})
            },
            choose(item) {
                this.$store.commit(CART_CHOOSE, {id:item.id})
            },
            deleteItem(item) {
                this.$store.commit(CART_DELETE_ITEM, {id:item.id})
            },
            onSwipeLeft() {
                console.log('swipe');
            }
        },
        mounted() {
            let self = this;
            let harmer = new Hammer(self.$el, {});
            harmer.on('swipeleft', function (e) {
                self.editIndex = $(e.target).parents('.mart-group').attr('index');
                self.editing = true;

            }).on('swiperight', function (e) {
                if (self.editIndex == $(e.target).parents('.mart-group').attr('index')
                    && self.editing ) {
                    self.editing = false;
                }
            })
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../stylesheets/common";
    .shopping-cart {
        width:100%;
        overflow: hidden;
        display: flex;
        background-color: $f6-bg-color;
        flex-direction:column;
        min-height:150px;

        //display: none;
        .mart-group {
            position: relative;
            margin-bottom:10px;
            background-color: #ffffff;
            width:130%;
            display: flex;
            transform:translateX(0);
            transition: all .3s;
            .delete {
                display: flex;
                align-items: center;
                justify-content: center;
                background: $home-red-color;
                color: #fff;
                font-size: $font-size + 0.1rem;
                flex:auto;
            }
            &.editing {
                transform:translateX(-23%)
            }
        }
        .cart-enter, .cart-leave-active {
            opacity:0;
            transform: scale(0, 0);
        }
        .cart-leave-active {
            position: absolute;
        }
        /*.cart-move {*/
            /*transition: all 1s;*/
        /*}*/

        .item {
            box-sizing: border-box;
            display: flex;
            padding:12px;
            flex-direction:row;
            justify-content:space-between;
            background-color: #ffffff;
            border-bottom:1px solid $home-border;
            flex:1 1 63%;
        }
        .img {
            display: flex;
            flex: 0 0 30%;
            padding: 5px;
            box-sizing: border-box;
            align-items: center;
        }
        .infos {
            flex: 0 0 40%;
            display: flex;
            padding: 5px 0;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: space-between;
            font-size: 0.9rem;
            font:{
                size:$font-size;
                //weight:600;
            }
            .spe {
                margin-top:6px;
                margin-bottom:4px;
            }
            .group {
                flex:1 1 40%;
                display: flex;
                flex-direction:row;
                align-items:center;
                a{
                    border:1px solid $home-border;
                    padding:5px 8px;
                    color: #000;
                    text-align: center;
                }
                a.disable {
                    color: $gray-price-color;
                }
                span {
                    margin:0 15px;
                    display: flex;
                    flex: 0 0 14%;
                    justify-content: center;
                }
            }
        }
        .price {
            flex: 0 0 15%;
            display: flex;
            align-items: center;
            color: $home-red-color;
            font-size: .9rem;
        }
        .choose {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 8%;
            a {
                width:80%;
                padding:10%;
            }
        }
    }
</style>