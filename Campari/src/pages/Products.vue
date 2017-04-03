<template>
       <div class="wrapper">
           <div class="outer-container">
               <div class="main-container products-page">
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
                   <div class="products" @click.stop="layer(false, false)">
                       <v-pull-load :custom-class="'p-1'"
                                    @loading-more="loadMore"
                                    :items-per-page="itemsPerPage"
                                    :canRefresh="canRefresh">
                           <li-item :custom-class="'ptl-item'"
                                    v-for="item in forShow"
                                    :key="item._id"
                                    :item="item"></li-item>

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
    import LiItem from '../components/li-item.vue'
    import FilterLayer from '../components/filter-layer@products.vue'
    import FilterLayer2 from '../components/filter-layer2@products.vue'
    import {query} from '../javascripts/services'
    import _ from 'lodash/array'

    console.log('products loaded');

    export default {
        components:{
            VPullLoad,
            LiItem,
            FilterLayer,
            FilterLayer2,
        },
        data() {
            return {
                layerShow:false,
                layer2Show:false,
                lists:[],   //全部商品（分页后）
                pages:0,    //加载的页数
                forShow:[],  //显示的商品
                canRefresh: false,
                itemsPerPage: 6,
                route_:{},
            }
        },
        methods:{
            layer(...shows) {
                [this.layerShow, this.layer2Show] = shows;
            },
            loadMore() {
                console.log('parents loading');
                if (this.pages == this.lists.length - 1) {
                    alert('no more');
                    return;
                }
                this.pages ++;
                this.forShow = this.forShow.concat(this.lists[this.pages]);
            },
            query(params) {
                this.$router.push({name:'products2', params:params})
            }
        },
        created() {
            let self = this;
            query('productShowPro.action', {flag: 1, sort:1})
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
    .products-page{
        position: relative;
        width:100%;
        display: block;
        overflow: scroll;

        div.products {
            width:90%;
            margin:0 auto;
            padding-bottom:$tabbar-height + 15px;
            overflow: hidden;
            ul.p-1 {
                @include homeUl;

                li {
                    margin-top:15px;
                    margin-right: 0;
                }
                li:nth-of-type(odd) {
                    margin-right:6%;
                }
            }
        }
        .categories-layer {
            top:45px;
            ul {
                height:100%;
            }
        }
    }
</style>