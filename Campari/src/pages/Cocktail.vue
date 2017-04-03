<template>
    <div class="wrapper">
        <div class="out-container">
            <div class="main-container cocktail-page">
                <ul :class="{grow: loaded}">
                    <li v-for="item in forShow" :key="item.id">
                        <a href="javascript:void(0)">
                            <img :src="item.src" alt="" width="100%">
                            <p class="en">{{item.en}}</p>
                            <p class="cn">{{item.cn}}</p>
                            <p class="info">查看详情></p>
                        </a>
                    </li>
                </ul>
                <a href="javascript:void(0);"
                   v-show="!loaded"
                   @click="loadMore()"
                   class="load-more">加载更多</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                forShow:[
                    cocktail('', 1, 'NEGRONI', '内格罗尼'),
                    cocktail('', 2, 'AMERICANO', '美国佬'),
                    cocktail('', 3, 'APEROL SPRITZ', '阿佩罗橙色气泡'),
                    cocktail('', 4, 'SWEET CAJUN', '甜蜜的后裔'),
                    cocktail('', 5, 'SKYY PASSION PLAY', '激情游戏'),
                    cocktail('', 6, 'GRAND MARGARITA', '了不起的玛格丽特'),
                    cocktail('', 7, 'APEROL SPRITZ FLOAT', '阿佩罗漂流'),
                    cocktail('', 8, 'URBAN APEROL SPRITZ', '上东区阿佩罗')
                ],
                loaded:false,
                more:[
                    cocktail('', 9, 'POPCORN NEGRONI', '爆米花内格罗尼 '),
                    cocktail('', 10, 'C & C SPRITZ', 'C C 女郎 '),
                    cocktail('', 11, 'PINKY PRETTY ', '柚子系'),
                    cocktail('', 12, 'PINE BITTER PUNCH', '黑凤梨'),
                    cocktail('', 13, 'FRUITY AMERICANO', '恋爱中的美国佬')
                ]
            }
        },
        methods:{
            loadMore() {
                console.log('loading');
                this.forShow = this.forShow.concat(this.more);
                this.loaded = true;
            }
        }
    }

    function cocktail() {
        return {
            href:arguments[0],
            src:'src/img/cocktail-' + arguments[1] + '.jpg',
            en:arguments[2],
            cn:arguments[3]
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../stylesheets/common.scss";
    .cocktail-page {
        position: relative;
        width:100%;
        display: block;
        overflow-y: scroll;
        overflow-x: hidden;
        ul {
            @include homeUl;
            width:90%;
            margin:0 auto;
            padding-bottom:25px;
            li a {
                margin-top:20px;
                img {
                    margin-bottom: 10px;
                }
            }
            li p {
                text-align: center;
                &.info {
                    color: $gray-price-color;
                    font-size: $font-size - 0.2rem;
                    margin-top:5px;
                    transform-origin: 50% 50%;
                    transform: scale(0.9);
                }
            }
        }
        ul.grow {
            padding-bottom:25px + $tabbar-height;
        }
    }
</style>