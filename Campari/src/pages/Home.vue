<template>
    <div class="wrapper">
        <div class="out-container">
            <div class="main-container home-page" @click.stop="layerShow=false">

                <header>
                    <div class="style-group">
                        <div class="title">
                            <span>假字假字</span>
                            <em>每周福利、精选指南</em>
                        </div>
                        <a class="c-btn-show c-btn"
                           @click.stop="layerShow = !layerShow"
                           v-show="!layerShow"
                           href="javascript:void(0);">
                            <img src="src/img/c-btn.jpg" alt="" width="100%">
                        </a>
                    </div>
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img src="src/img/home-swiper.jpg" width="100%" alt="">
                                <div class="info">
                                    <p class="en">Campari</p>
                                    <p class="cn">金巴利苦味利口酒</p>
                                    <p class="tip"><i>热卖推荐</i>独一无二的意大利红色烈酒/满350送酒杯套装</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <img src="src/img/home-swiper.jpg" width="100%" alt="">
                                <div class="info">
                                    <p class="en">Campari</p>
                                    <p class="cn">金巴利苦味利口酒</p>
                                    <p class="tip"><i>热卖推荐</i>独一无二的意大利红色烈酒/满350送酒杯套装</p>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <img src="src/img/home-swiper.jpg" width="100%" alt="">
                                <div class="info">
                                    <p class="en">Campari</p>
                                    <p class="cn">金巴利苦味利口酒</p>
                                    <p class="tip"><i>热卖推荐</i>独一无二的意大利红色烈酒/满350送酒杯套装</p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination" id="pagination"></div>
                    </div>
                </header>
                <div class="selling">
                    <div class="style-group">
                        <div class="title">
                            <span>热卖排行</span>
                            <em>大家都在买什么</em>
                        </div>
                        <div class="menu">
                            <a href="javascript:void(0);">产看更多 <i>❯</i></a>
                        </div>
                    </div>
                    <ul>
                        <li-item v-for="item in sellingLists" :key="item.id" :item="item"></li-item>
                    </ul>
                </div>
                <div class="classic">
                    <div class="style-group">
                        <div class="title">
                            <span>经典鸡尾酒</span>
                            <em>详细配方全知道</em>
                        </div>
                        <div class="menu">
                            <a href="javascript:void(0);">产看更多<i>❯</i></a>
                        </div>
                    </div>
                    <div class="c-item">
                        <a href="javascript:void(0);">
                            <div class="words">
                                <p class="en">FRUITY AMERICANO</p>
                                <p class="cn">恋爱中的美国佬</p>
                                <p class="oth">领略鸡尾酒魅力，享受纷繁生活</p>
                            </div>
                            <img src="src/img/home-cocktail-1.jpg" alt="">
                        </a>
                    </div>
                    <div class="c-item">
                        <a href="javascript:void(0);">
                            <div class="words">
                                <p class="en">FRUITY AMERICANO</p>
                                <p class="cn">恋爱中的美国佬</p>
                                <p class="oth">领略鸡尾酒魅力，享受纷繁生活</p>
                            </div>
                            <img src="src/img/home-cocktail-1.jpg" alt="">
                        </a>
                    </div>
                </div>
                <div class="discount">
                    <div class="style-group">
                        <div class="title">
                            <span>折扣</span>
                            <em>重中之重作者咳咳</em>
                        </div>
                        <div class="menu">
                            <a href="javascript:void(0);">产看更多<i>❯</i></a>
                        </div>
                    </div>
                    <ul>
                        <li-item v-for="item in discountLists" :key="item.id" :item="item"></li-item>
                    </ul>
                </div>
            </div>
            <transition name="fade">
                <filter-layer v-show="layerShow" v-on:hide-layer="hideLayer"></filter-layer>
            </transition>

        </div>
    </div>
</template>
<script>
    import swiper from '../javascripts/modules/swiper.min'
    import {query} from '../javascripts/services'
    import liItem from '../components/li-item.vue'
    import FilterLayer from '../components/filter-layer@home.vue'
    import _ from  'lodash/array'

    export default {
        components: {
            liItem,
            FilterLayer,
        },
        data() {
            return {
                layerShow: false,
                sellingLists:[],
                discountLists:[]
            }
        },
        methods:{
            hideLayer() {
                this.layerShow = false;
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
            query('productShowPro.action', {flag: 1, sort:2})
                .then(data => {
                    self.sellingLists = _.take(data, 2);
                })
                .catch(error => {
                    console.log(error);
                });

            query('productShowPro.action', {flag:3, sort:1})
                .then(data => {
                    self.discountLists = _.take(data, 2);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>
<style>
    @import "../stylesheets/swiper.min.css";
    #pagination .swiper-pagination-bullet {
        background: #ffffff;
        width:5px;
        height:5px;
        opacity:1;
    }
    #pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
        border:1px solid #e41035;
    }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../stylesheets/common";

    .home-page {
        position: relative;
        width:90%;
        margin:0 auto;
        display: block;
        overflow-y: scroll;
        overflow-x: hidden;
        header {
            @include homeSections;
            .swiper-container {
                width:100%;
                clear: both;
                margin-top:6%;
                position: relative;
                .swiper-slide {
                    .info {
                        margin-top:6px;
                    }
                    p{
                        width:100%;
                        font:{
                            size: $font-size - .1rem;
                            weight: 600;
                        }
                    }
                    .tip {
                        font: {
                            size: $font-size - .4rem;
                            weight: 500;
                        }
                        color: $gray-price-color;
                        margin-top:6px;
                        white-space:nowrap;
                        i{
                            font-style: normal;
                            color: $home-red-color;
                            padding-right: 10px;
                        }
                        transform-origin: 0% 50%;
                        transform: scale(0.9);
                    }
                }
                .swiper-pagination {
                    text-align: left;
                    padding-left: 10px;
                    bottom:30%;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                }
            }
        }
        .selling {
            @include homeSections;
            ul {
                @include homeUl;
            }
        }
        .classic {
            @include homeSections;
            padding-bottom:0;
            .c-item {
                overflow: hidden;
                border-bottom:1px solid $home-border;
                a {
                    display: block;
                    overflow: hidden;
                    padding:20px 0 ;
                    width:100%;
                    color: #000;
                }
                &:last-child {
                    border: none;
                }
                .words {
                    width:70%;
                    float: left;
                    p {
                        @include homePs;
                    }
                    p.oth {
                        margin-top: 4px;
                        color: $gray-price-color;
                        font:{
                            weight: normal;
                            size: $font-size - .2rem;
                        }
                    }
                }
                img {
                    width:20%;
                    float: right;
                }
            }
        }
        .discount {
            @include homeSections;
            padding-bottom: $tabbar-height;
            ul {
                @include homeUl;
            }
        }
    }

</style>