<template>
    <div class="wrapper">
        <div class="outer-container">
            <div class="main-container products2-page">
                <header class="products-header" :class="{active: layerShow, active2: layer2Show}">
                    <a class="btn-1"
                       @click.stop="layer(!layerShow, false)"
                       href="javascript:void(0);">产品分类 <span>▼</span></a>
                    <a class="btn-2"
                       @click.stop="layer(false, !layer2Show)"
                       href="javascript:void(0);">智能排序
                        <span>▼</span>
                    </a>
                </header>
                <div class="products2" @click.stop="layer(false, false)">
                    <v-pull-load :custom-class="'p-2'"
                                 @loading-more="loadMore"
                                 :items-per-page="itemsPerPage"
                                 :canRefresh="canRefresh">
                        <li-item2 :custom-class="'ptl-item'"
                                  v-for="item in forShow"
                                  :key="item._id"
                                  :item="item"></li-item2>

                    </v-pull-load>
                </div>
                <transition name="fade2">
                    <filter-layer :route_="route_" v-on:query="query" v-show="layerShow"></filter-layer>
                </transition>
                <transition name="fade2">
                    <filter-layer2 :route_="route_" v-on:query="query" v-show="layer2Show"></filter-layer2>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import VPullLoad from '../components/v-pull-load.vue'
    import LiItem2 from '../components/li-item2.vue'
    import FilterLayer from '../components/filter-layer@products.vue'
    import FilterLayer2 from '../components/filter-layer2@products.vue'
    import {query} from '../javascripts/services'
    import _ from 'lodash/array'
    export default {
        components:{
            VPullLoad,
            LiItem2,
            FilterLayer,
            FilterLayer2,
        },
        data() {
            let self = this;
            return {
                layerShow:false,
                layer2Show:false,
                lists:[],       //全部商品（分页后）
                pages:0,        //加载的页数
                forShow:[],     //显示的商品
                canRefresh: false,
                itemsPerPage: 6,
                route_: self.$route.params
            }
        },
        methods:{
            layer(...shows) {
                [this.layerShow, this.layer2Show] = shows;
            },
            loadMore() {
                console.log('parents loading');
                if (this.pages == this.lists.length - 1) {
                    console.log('no more');
                    return;
                }
                this.pages ++;
                this.forShow = this.forShow.concat(this.lists[this.pages]);
            },
            query(params) {
                this.$router.replace({name:'products2', params:params});
            }
        },
        created() {
            let self = this;
            let params = self.$route.params;
            query(
                'productShowPro.action',
                {flag: params.flag, sort:params.sort, type:params.type}
            )
                .then(data => {

                    data.forEach(item => {
                        item._id = Math.random();
                    });
                    self.lists = _.chunk(data, self.itemsPerPage);
                    self.forShow = self.lists[0];
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../stylesheets/common.scss";
    .products2-page {
        position: relative;
        width:100%;
        display: block;
        overflow: scroll;
        background-color: $f6-bg-color;
        .products2 {
            width:100%;
            padding-bottom:$tabbar-height + 15px;
        }
        .categories-layer {
            top:45px;
            ul {
                height:100%;
            }
        }
        .p-2 li {
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
                    font-size: $font-size - .1rem;
                    margin-top:2px;
                }
                p:first-child {
                    margin-top:2%;
                }
                p.last {
                    color: $home-red-color;
                    span {
                        color: #000;
                        font-size: $font-size - .2rem;
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
    }
</style>