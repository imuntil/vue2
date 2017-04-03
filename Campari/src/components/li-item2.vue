<template>
    <li :class="customClass">
        <div class="outer">
            <a class="img-box" href="javascript:void(0);">
                <img src="src/img/home-sellings-1.jpg" alt="">
            </a>
            <div class="inner">
                <p>{{item.englishname || 'no name'}}</p>
                <p>{{item.proname || '无名酒'}}</p>
                <p class="last">{{item.proprice | currency('￥', 0)}} &nbsp;&nbsp;<span>{{item.procontent}}ml</span></p>
                <div class="btn-groups">
                    <a href="javascript:void(0);" @click.stop="addItem(item)">加入购物车</a>
                    <a href="javascript:void(0);">立即购买</a>
                </div>
            </div>
        </div>
    </li>
</template>
<script>
    import {CART_ADD_ITEM, CART_ADD_BUY_NOW} from '../javascripts/constant'
    export default {
        props:{
            item:Object,
            customClass:String
        },
        computed:{
            price() {
                return '￥' + (this.item.proprice || 100);
            }
        },
        methods:{
            addItem(item) {
                this.$store.commit(CART_ADD_ITEM, item);

                this.$toasted.show("已加入购物车", {
                    theme: "outline",
                    position: "top-center",
                    duration : 1200
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../stylesheets/vd";
    li {
        padding:15px 5%;
        margin-bottom:10px;
        background-color: #ffffff;
        .outer {
            overflow: hidden;
            position: relative;
        }
        .img-box {
            display: block;
            overflow: hidden;
            width: 31%;
            float: left;
            margin: 2.5% 5% 2.5% 0;
            img {
                width:100%;
            }
        }
        .inner {
            width:64%;
            float: right;
            p {
                width:100%;
                font:{
                    size: $font-size - .1rem;
                    weight: 600;
                }
                margin-top:2px;
            }
            p:first-child {
                margin-top:2%;
            }
            p.last {
                color: $home-red-color;
                span {
                    color: #000;
                    font:{
                        weight: normal;
                        size: $font-size - .2rem;
                    }
                }
                padding-top: 4px;
            }
        }
        .btn-groups {
            width: 100%;
            margin-top: 10%;
            overflow: hidden;
            display: block;
            a {
                width: 46%;
                color: $home-red-color;
                text-align: center;
                padding: 5px;
                border: 1px solid $home-red-color;
                border-radius: 3px;
                display: inline-block;
                box-sizing: border-box;
                font-size: $font-size;
                &:last-child {
                    float: right;
                    background-color: $home-red-color;
                    color: #ffffff;
                    display: block;
                }
            }
        }
    }
</style>