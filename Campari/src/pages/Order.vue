<template>
    <div class="wrapper">
        <div class="out-container">
            <div class="main-container order-page">
                <header>
                    <h4>收货人</h4>
                    <p>
                        <span class="name">姓&nbsp;&nbsp;名：{{chosenAdr.name}}</span><span class="phone">手机号：{{chosenAdr.phone}}</span>
                    </p>
                    <p>
                        <span class="address">地&nbsp;&nbsp;址：</span>
                        <i>
                        {{chosenAdr.province}}{{chosenAdr.city}}{{chosenAdr.detail}}
                    </i>
                    </p>
                    <router-link :to="{name:'address', params:{from:'order'}}">编辑></router-link>
                </header>
                <div class="detail-infos">
                    <ul class="main-ul">
                        <li><span>商品信息</span></li>
                        <order-ing-item v-for="item in cart" :key="item.id" :order="item"></order-ing-item>
                        <li><span>配送方式</span> <i>快递</i></li>
                        <li><span>运费</span> <i>￥0.00</i></li>
                        <li class="special"><span>需要支付 </span><i>{{theMoney | currency('￥')}}</i></li>
                    </ul>
                </div>
                <footer>
                    <a class="submit-order" @click="showPay = true;" href="javascript:void(0);">提交订单</a>
                </footer>
                <transition name="bounceBottom" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
                    <div class="pay-box" v-show="showPay">
                        <p class="row-1"><a @click="showPay = false" href="javascript:void(0);"></a>付款</p>
                        <p class="row-2">支付方式</p>
                        <ul class="row-3">
                            <li class="wx">
                                <a href="javascript:void(0);"
                                   @click="payMethod = 'WX'"
                                   :class="{chosen:payMethod === 'WX'}">
                                    <i></i>
                                    <span><img src="src/img/wxp.jpg" alt="" height="100%"></span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)"
                                   @click="payMethod = 'Ali'"
                                   :class="{chosen:payMethod === 'Ali'}">
                                    <i></i>
                                    <span><img src="src/img/alip.jpg" alt="" height="100%"></span>
                                </a>
                            </li>
                        </ul>
                        <div class="row-4">
                            <p>支付 <span>{{theMoney | currency('￥')}}</span></p>
                            <a href="javascript:void(0);" @click="pay()">去支付</a>
                        </div>
                    </div>
                </transition>
                <transition name="bounceTop" enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutUp">
                    <div class="bg" v-show="showPay"></div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import OrderIngItem from '../components/order-ing-item.vue'
    import * as type from '../javascripts/constant'
    export default {
        components:{
            OrderIngItem
        },
        data() {
            return{
                showPay:false,
                payMethod:'WX',   //or Ali
                mode:this.$route.params.from
            }
        },
        computed:{
            cart() {
                return (this.mode === 'cart' ? this.$store.getters[type.CART_THE_CHOSEN] : [this.$store.getters[type.CART_THE_PRO]])
            },
            theMoney() {
                return (this.mode === 'cart' ? this.$store.getters[type.CART_THE_MONEY] : this.$store.getters[type.CART_THE_PRO].proprice)
            },
            chosenAdr() {
                return this.$store.state.address.chosenAdr;
            }
        },
        methods:{
            pay() {

            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../stylesheets/common";
    @import "../stylesheets/animate.min.css";
    .order-page {
        background-color: $f6-bg-color;
        position: relative;
        header {
            background: url("../img/watermark.jpg") no-repeat;
            background-size: cover;
            padding:5% 7% 11% ;
            position: relative;
            border-bottom:1px solid $f6-border-color;
            h4 {
                width:100%;
                text-align: left;
                font:{
                    weight: normal;
                    size: $font-size + .05rem;
                }
                color: $gray-price-color;
                padding: 5px 0;
            }
            p {
                display: block;
                overflow: hidden;
                span {
                    font-size: $font-size;
                    display: inline-block;
                    padding:3px 0;
                    &.name{
                        float: left;
                    }
                    &.phone {
                        float: right;
                    }
                    &.address {
                        width:44px;
                    }
                }
                i {
                    display: inline-table;
                    width:82%;
                    padding-left: 4px;
                    font: {
                        size: $font-size;
                        style: normal;
                    }
                }
            }
            a {
                width:15%;
                font-size: $font-size - .1rem;
                color: $red-btn-color;
                text-decoration: underline;
                display: block;
                float: right;
                text-align: center;
                padding: 3px;
            }
        }
        div.detail-infos {
            padding-bottom:65px;
            .details {
                border:none;
            }
        }
        ul.main-ul {
            background-color: #fff;
            &>li{
                border-bottom:1px solid $order-border-color;
                span {
                    display: inline-block;
                    //width:100%;
                    font-size:$font-size;
                    padding: 4% 7%;
                }
                i {
                    @extend span;
                    font-style: normal;
                    float: right;
                    color: $gray-price-color;
                }
                &.special {
                    font:{
                        weight: 600;
                        size: $font-size + .1rem;
                    }
                    span {
                        font:inherit;
                    }
                    i{
                        font:inherit;
                        color: $red-btn-color;
                    }
                }
            }
        }
        .main-ul.some-dif {
            //margin-top: 12px;
            border-top: 1px solid $order-border-color;
            background-color: transparent;
            padding-bottom:$tabbar-height;
            li {
                margin-top:12px;
                background-color: #fff;
            }
        }

        footer {
            .submit-order{
                width:100%;
                font-size:$font-size;
                color: $white-font;
                background: $red-btn-color;
                text-align: center;
                padding:15px 0;
                margin-top:15px;
                position: fixed;
                display: block;
                font-weight:500;
                letter-spacing: 2px;
                border-radius:3px;
                bottom:0;
            }
        }
        @mixin box-bg {
            transform-origin: center bottom;
            transition: 0.4s cubic-bezier(0.76, 0.55, 0.39, 1.42) all;
        }
        .pay-box {
            $pay-box-padding: 4%;
            position: fixed;
            bottom:0;
            z-index: 10;
            width:100%;
            background-color: $f6-bg-color;
            box-shadow: 0 -3px 20px #666;
//            @include box-bg;
            .row-1{
                display: block;
                width:100%;
                padding: 10px $pay-box-padding;
                font:{
                    weight: 700;
                    size: $font-size + .1;
                }
                text-align: center;
                box-sizing: border-box;
                background-color: #ffffff;
                border-bottom:1px solid $f6-border-color;
                position: relative;
                a {
                    position: absolute;
                    background: url("../img/icons.png") no-repeat -106px 0px;
                    height: 25px;
                    width: 25px;
                    top: 0;
                    bottom: 0;
                    left:0;
                    margin: auto $pay-box-padding;
                }
            }
            .row-2 {
                @extend .row-1;
                text-align: left;
                font:{
                    weight: 500;
                    size: $font-size;
                }
            }
            .row-3 {
                width: 100%;
                padding:0 $pay-box-padding;
                box-sizing: border-box;
                margin:0 auto 75px;
                overflow: hidden;
                display: block;
                background: #ffffff;
                li {
                    float: left;
                    width:50%;
                    a {
                        width:100%;
                        display: block;
                        padding:20px 7px;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        text-align: left;
                        position: relative;
                        i {
                            width: 25px;
                            height: 25px;
                            display: inline-block;
                            background: url(../img/icons.png) no-repeat -51px 8px;
                            padding: 10px 0;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            margin: auto 0;
                        }
                        span {
                            width: 98px;
                            height: 57px;
                            display: inline-block;
                            margin-left: 18px;
                            //background: url("../img/icons.png") no-repeat 4px -25px;
                        }
                    }
                }
                .chosen i{
                    background-position: -7px 8px;
                }
                //li.wx span {
                //  background-position: -4px -82px;
                //}
            }
            .row-4 {
                @extend .row-1;
                p {
                    @extend .row-1;
                    border:none;
                    margin-bottom:10px;
                    span {
                        color: $red-btn-color;
                    }
                }
                a {
                    @include common-btn;
                    position: relative;
                    margin:0 auto;
                    padding:12px 0;
                    font:{
                        weight: 600;
                        size: $font-size + .1rem;
                    }
                }
            }
        }
        .bg {
            width:100%;
            height:100%;
            background: rgba(0, 0, 0, 0.4);
            position: fixed;
            top:0;
            left:0;
            z-index:1;
            @include box-bg;
        }


    }
</style>