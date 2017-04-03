<template>
    <div class="wrapper">
        <div class="out-container">
            <div class="main-container detail-page">
                <div class="product-info">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img src="src/img/detail-1.jpg" width="100%" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="src/img/detail-1.jpg" width="100%" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="src/img/detail-1.jpg" width="100%" alt="">
                            </div>
                            <div class="swiper-slide">
                                <img src="src/img/detail-1.jpg" width="100%" alt="">
                            </div>
                            <!--<div class="swiper-slide" ng-repeat="slide in imgs track by $index">-->
                            <!--<img ng-src="{{slide}}" alt="" width="100%">-->
                            <!--</div>-->
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                    <p class="en">{{item.englishname || 'xxxxx'}}</p>
                    <p class="cn">{{item.proname || '啊啊啊'}}</p>
                    <p class="pr">{{item.discountprice || item.proprice | currency('￥', 0)}}</p>
                    <ul>
                        <li>酒精度 <span>{{item.prolcoholic || 50}}%</span></li>
                        <li>净含量 <span>{{item.procontent}}ml</span></li>
                        <li>来自 <span>{{item.proarea || '意大利'}}</span></li>
                        <li>类别 <span>{{item.prolabel || '利口酒'}}</span></li>
                    </ul>
                </div>
                <div class="brand-introduce">
                    <div>
                        <h3 class="with-after">产品介绍</h3>
                        <img src="src/img/intro-1.jpg" alt="" width="100%">
                        <p>金巴利苦味利口酒的历史要追溯到1860年的诺瓦腊，当时发明的秘方仍沿用至今。1904年，第一家金巴利酒厂在Sesto San Giovanni开业，并开始进行海外出口贸易。时至今日，金巴利已经遍及190多个市场，是世界上最著名的烈酒品牌之一，更是意大利风格和卓越品质的标志。</p>
                        <img src="src/img/intro-2.jpg" alt="" width="100%">
                        <p>金巴利是一种使用酒精和水浸泡香草及其他芳香植物和水果制成的烈酒，配方完全源自1860年的诺瓦腊，历久弥新。金巴利拥有独特的色泽、香气和口味，风格热情奔放，不羁却迷人，堪称当代烈酒中的经典之作。</p>
                    </div>
                </div>
                <div class="after-sales">
                    <h3 class="with-after">配送及售后说明</h3>
                    <ul>
                        <li>本产品支持退款;</li>
                        <li>快递信息：顺丰、圆通、韵达；</li>
                        <li>邮费信息：包邮；</li>
                        <li>发货周期：48小时内发货，节假日暂缓；</li>
                        <li>发货范围：全国可送（不含港澳台地区、西藏、新疆、宁夏、青海）；</li>
                    </ul>
                    <div class="sign">
                        <img src="src/img/detail-sign.jpg" alt="" width="100%">
                    </div>
                    <a href="javascript:void(0);">更多&nbsp;<i>▼</i></a>
                </div>
                <div class="like">
                    <div>
                        <h3 class="with-after">猜你喜欢</h3>
                        <ul>
                            <li-item :item="{id:11}"></li-item>
                            <li-item :item="{id:12}"></li-item>
                            <li-item :item="{id:13}"></li-item>
                            <li-item :item="{id:14}"></li-item>
                        </ul>
                    </div>
                </div>
                <div class="foot-btns">
                    <a href="javascript:void(0);" @click="addToCart(item)">加入购物车</a>
                    <a href="javascript:void(0);" @click="buyNow(item)">立即购买</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import swiper from '../javascripts/modules/swiper.min'
    import {query} from '../javascripts/services'
    import LiItem from '../components/li-item.vue'
    import {CART_ADD_ITEM, CART_ADD_BUY_NOW} from '../javascripts/constant'
    export default{
        components:{
            LiItem
        },
        data() {
            return{
                item:{}
            }
        },
        mounted() {
            new swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 12,
                preloadImages: true,
                loop: true,
                autoplay:3000,
                pagination:'.swiper-pagination'
            });
        },
        created() {
            let self = this;
            query('productShowOnePro.action', self.$route.params)
                .then(data => {
                    self.item = data[0];
                })
        },
        methods:{
            addToCart(item) {
                this.$store.commit(CART_ADD_ITEM, item);
                this.$toasted.show("已加入购物车", {
                    theme: "outline",
                    position: "top-center",
                    duration : 1200
                });
            },
            buyNow(item) {
                this.$store.commit(CART_ADD_BUY_NOW, item);
                this.$router.push({name:'order', params:{from:'pro'}})
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../stylesheets/common";
    .detail-page {
        position: relative;
        width:100%;
        display: block;
        overflow-x: hidden;
        overflow-y: scroll;
        background-color: $f6-bg-color;
        .product-info {
            border-bottom:1px solid $home-border;
            padding:10px 0 20px 0;
            background-color: #ffffff;
            margin-bottom: 10px;
            .swiper-container {
                margin-bottom: 12px;
                .swiper-pagination-bullet {
                    background-color: #fff;
                    opacity:0.8;
                }
                .swiper-pagination-bullet-active {
                    border:2px solid #222;
                }
            }
            p {
                width:100%;
                text-align: center;
                font:{
                    size:$font-size + .2rem;
                    weight: 600;
                }
            }
            p.pr {
                color: $home-red-color;
                margin-top: 15px;
            }
            ul {
                width:90%;
                margin: 20px auto 10px;
                li {
                    padding:9px 10px;
                    text-align: left;
                    font-size: $font-size;
                    border-top:1px solid $home-border;
                    span {
                        color: $gray-price-color;
                        float: right;
                    }
                }
            }
        }
        .brand-introduce {
            width:100%;
            background-color: #ffffff;
            border-bottom:1px solid $home-border;
            margin-bottom:10px;
            padding:10px 0 20px 0;
            div {
                width:90%;
                margin:0 auto;
            }
            img {
                margin:20px 0 15px 0;
            }
            p {
                font-size:$font-size;
            }
        }
        .after-sales {
            border-bottom:1px solid $home-border;
            margin-bottom:10px;
            padding:10px 0 20px 0;
            background-color: #fff;
            position: relative;
            ul {
                width:90%;
                margin:15px auto 0;
                li {
                    font-size: $font-size;
                    color: $gray-price-color;
                    padding-top:2px;
                    padding-bottom:2px;
                    padding-left: 16px;
                    position: relative;
                    word-break: break-all;
                    &::before {
                        content: '';
                        width:5px;
                        height:5px;
                        position: absolute;
                        background: $gray-price-color;
                        left:0;
                        top:0;
                        bottom:0;
                        margin:auto 0;
                        border-radius: 50%;
                    }
                }
                li:last-child::before {
                    top:-50%
                }
            }
            div {
                width:21%;
                position: absolute;
                right:10%;
                top:38%;
            }
            a {
                width: 20%;
                padding: 5px 10px;
                display: block;
                margin: 5px auto 0;
                color: #000;
                text-align: center;
                font-size:$font-size;
                i {
                    font: {
                        style: normal;
                        size: $font-size - .1rem;
                    }
                }
            }
        }
        .like {
            background-color: #fff;
            padding-bottom:20px;
            padding-top:10px;
            &>div {
                width:90%;
                margin:0 auto
            }
            ul {
                @include homeUl;
                padding-bottom:$tabbar-height;
            }
        }
        .foot-btns {
            width:100%;
            height:$tabbar-height;
            position: fixed;
            bottom:0;
            left:0;
            overflow: hidden;
            a{
                width:50%;
                display: inline-block;
                text-align: center;
                background-color: $home-red-color;
                color: #fff;
                line-height: $tabbar-height;
                float: left;
            }
            a:first-child{
                background-color: #fff;
                color: $home-red-color;
                border-top:1px solid $f6-border-color;      }
        }
    }
</style>