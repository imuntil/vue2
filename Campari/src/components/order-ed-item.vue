<template>
    <li class="order-info">
        <p class="header">订单编号&nbsp;{{orders.ordernum}} <em>{{orders.status.s}}</em></p>
        <div class="details more" v-for="order in orders.products" :key="order.id">
            <img src="src/img/order-p-img.jpg" alt="" width="30%">
            <!--<img ng-src="img/order-p-img.jpg" alt="" width="30%">-->
            <div>
                <p>{{order.englishname || 'wine'}}  <span>{{order.price | currency('￥')}}</span></p>
                <p>{{order.proname}} <span class="light">x&nbsp;&nbsp;{{order.num}}</span></p>
                <p class="last light"><em>{{order.procontent}}ml</em></p>
            </div>
        </div>
        <p class="t-last"><span class="dif light">共{{orders.total}}件商品</span><big>实付{{orders.orderprice | currency("￥")}}</big></p>
        <p class="footer">
            <a :class="[orders.status.c]"
               @click="operate(orders)"
               href="javascript:void(0);">{{orders.status.o}}</a>
        </p>
    </li>
</template>
<script>
    export default {
        props:{
            orders:{
                type:Object,
                required:true,
            },
        },
        data() {
            return {

            }
        },
        methods:{
            operate(orders) {
                if (+orders.orderstatus !== 0) return;
                this.$emit('repay', orders);
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../stylesheets/vd";
    li.order-info {
        overflow: hidden;
        border-bottom: 1px solid $f6-border-color;
        .light {
            color: $gray-price-color;
        }
        &>p {
            font-size: .8rem;
            padding:15px 5%;
            border-bottom: 1px solid $f6-border-color;
            em {
                float: right;
                color: $home-red-color;
                font-style: normal;
            }
        }
        p.t-last {
            text-align: right;
            padding:0 5%;
            .dif {
                margin-right: 10px;
                display: inline-block;
                font-size:$font-size;
                padding: 4% 7%;
                float: none;
            }
        }
        p.footer {
            border: none;
            width: 100%;
            display: inline-block;
            box-sizing: border-box;
            padding:15px 4%;
            a {
                padding: 5px 25px;
                border: 2px solid $home-red-color;
                color: $home-red-color;
                border-radius: 2px;
                float: right;
                box-sizing: border-box;
            }
            a.black {
                border:2px solid #000;
                color: #000;
            }
        }
        div.details {
            overflow: hidden;
            padding: 15px 5%;
            width:100%;
            box-sizing: border-box;
            border-bottom:1px solid $order-border-color;
            img {
                float: left;
            }

            div {
                width:65%;
                float: right;
            }
            p {
                width:100%;
                font-size: $font-size;
                text-align: left;
                clear: both;
                span {
                    display: inline-block;
                    float: right;
                }
            }
            .last {
                margin-top: 5px;
                color: $home-red-color;
                em {
                    font:{
                        style: normal;
                        size: $font-size - .1rem;
                    }
                    color: #000;
                }
            }
        }
    }
</style>