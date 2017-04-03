<template>
    <div class="wrapper">
        <div class="out-container">
            <div class="main-container order-page">
                <ul class="main-ul some-dif">
                    <order-ed-item v-for="orders in inShow"
                                   v-on:repay="repay"
                                   :key="orders.ordernum" :orders="orders"></order-ed-item>
                </ul>
                <a class="load-more" @click="more()" href="javascript:void(0);">
                    加载更多
                </a>

                <transition name="bounceBottom" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
                    <div class="pay-box" v-show="showPay">
                        <p class="row-1"><a @click="showPay = false" href="javascript:void(0);"></a>付款</p>
                        <p class="row-2">收货地址</p>
                        <p class="row-2">&nbsp;&nbsp;&nbsp;{{repayOrder.orderaddress}}</p>
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
                            <p>支付 <span>{{repayOrder.orderprice | currency('￥')}}</span></p>
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
    import config from '../../javascripts/config'
    import OrderEdItem from '../../components/order-ed-item.vue'
    import _ from 'lodash/array'
    import swal from 'sweetalert'
    export default {
        components: {
            OrderEdItem
        },
        data() {
            return {
                page: this.$route.params.page,
                pageOrders:[],  //分页后，
                pages:0,  //加载的页数
                inShow:[],  //显示的内容
                showPay:false,
                repayOrder:{},
                payMethod:'WX',
            }
        },
        methods:{
            more() {
                if (this.pages === this.pageOrders.length - 1) {
                    swal({title:'', text:'没有更多咯', type:'warning', timer:1500});
                    return;
                }
                this.pages ++;
                this.inShow = this.inShow.concat(this.pageOrders[this.pages]);
            },
            __getOrders() {
                //ajax
                this.pageOrders = _.chunk(config.testOrderData, 2);
                this.inShow = this.pageOrders[0];
            },
            pay() {

            },
            repay(order) {
                this.showPay = true;
                this.repayOrder = order;
            }
        },
        created() {
            this.__getOrders();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../stylesheets/vd";
    .order-page {
        background-color: $f6-bg-color;
        position: relative;
        ul.main-ul {
            background-color: #fff;
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
        p.no-data {
            width: 60%;
            text-align: center;
            margin: 0 auto;
            padding: 50% 10px 10px;
            box-sizing: border-box;
            border-bottom:1px solid $home-border;
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
            @include box-bg;
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
                    background: url("../../img/icons.png") no-repeat -106px 0px;
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
                margin:0 auto 40px;
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
                            background: url(../../img/icons.png) no-repeat -51px 8px;
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
    //加载更多按钮
    .load-more {
        width: 100%;
        padding: 15px;
        margin-bottom: 55px;
        text-align: center;
        background:#fff;
        box-sizing: border-box;
        color: $gray-price-color;
        font-size: $font-size - 0.2rem;
        display: block;
        position: fixed;
        bottom:0;
    }
    .order-page .load-more {
        margin:0;
    }
</style>