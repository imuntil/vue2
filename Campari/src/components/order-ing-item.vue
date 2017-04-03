<template>
    <li class="order-info">
        <div class="details" v-show="!order.code">
            <img src="src/img/order-p-img.jpg" alt="" width="30%">
            <div>
                <p>{{order.englishname}}
                    <span class="dif" v-if="order.discountprice">{{order.discountprice * order.count | currency('￥')}}</span>
                    <span class="dif" v-else="!order.discountprice">{{order.proprice * order.count | currency('￥')}}</span>
                </p>
                <p>{{order.proname}}</p>
                <p class="last">
                    {{order.discountprice || order.proprice | currency('￥',0)}}&nbsp;
                    <em>{{order.procontent}}ml</em>
                    <span class="dif">x{{order.count}}</span>
                </p>
            </div>
        </div>
    </li>
</template>
<script>
    export default {
        props:{
            order:Object,
            require:true
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../stylesheets/common";
    //订单directive
    li.order-info {
        //padding-top: 4%;
        overflow: hidden;
        border-bottom: 1px solid $f6-border-color;
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

            div {
                width:65%;
                float: right;
            }
            p {
                width:100%;
                font-size: $font-size;
                text-align: left;
                .dif {
                    padding:0;
                    display: inline;
                    float: right;
                    color: $gray-price-color;
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
            .t-last {
                text-align: right;
                margin-top: 5px;
                .dif {
                    float: none;
                    font-size: .7rem;
                    margin-right: 10px;
                }
            }
        }
        img {
            float: left;
        }
    }

</style>