<template>
    <div class="iscroll-wrapper">
        <div class="iscroll-scroller">
            <div class="pullDown" v-if="canRefresh">
                <span class="pullDownIcon">&nbsp;</span>
                <span class="pullDownLabel">Pull down to refresh...</span>
            </div>
            <ul :class="['ptl-container', customClass]">
                <slot></slot>
            </ul>
            <div class="pullUp">
                <span class="pullUpIcon">&nbsp;</span>
                <span class="pullUpLabel">Pull up to load...</span>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
//    import $ from 'jquery'
    import IScroll from '../javascripts/modules/iscroll-probe'

    export default {
        props:{
            //默认只有上拉加载更多，为true时，打开下拉刷新功能
            canRefresh:{
                type:Boolean,
                default:false
            },
            //单页有多少内容
            itemsPerPage:{
                type:Number,
                required:true
            },
            //自定义class
            customClass:{
                type:String
            },
            //条目class
            itemClass:{
                type:String
            }
        },
        mounted() {
            let self = this,
                el = $(this.$el);
            let pullUpEl = el.find('.pullUp'),
                pullDownEl = undefined,
                itemsPerPage = self.itemsPerPage || 8,
                pullDownOffset = undefined,
                pullUpOffset = undefined,
                myScroll = undefined,
                scrollInProgress = false,
                currentPage = 1,
                itemClass = self.itemClass || 'ptl-item';

            if (self.canRefresh) {
                pullDownEl = el.find('.pullDown');
            }


            function triggerMyScroll(offset) {
                pullDownOffset = pullDownEl ? pullDownEl[0].offsetHeight : 0;
                pullUpOffset = pullUpEl ? pullUpEl[0].offsetHeight : 0;

                if (el.find('.' + itemClass).length < itemsPerPage) {
                    pullUpEl.hide();
                    pullDownEl && pullDownEl.hide();
                    offset = 0;
                } else if (!offset) {
                    offset = pullDownOffset;
                }

                myScroll = new IScroll(el[0], {
                    probeType:1,
                    tap:true,
                    click:false,
                    preventDefaultException:{tagName: /.*/},
                    scrollbars:true,
                    fadeScrollbars:true,
                    interactiveScrollbars:false,
                    keyBindings:false,
                    deceleration:0.0002,
                    startY:(parseInt(offset) * (-1))
                });

                myScroll.on('scrollStart', () => {
                    scrollInProgress = true;
                });
                myScroll.on('scroll', function () {
                    scrollInProgress = true;

                    if (el.find('.' + itemClass).size() >= itemsPerPage) {
                        if (this.y > 5 && pullDownEl && !pullDownEl.is('.flip')) {
                            pullDownEl.attr('class', 'pullDown flip');
                            pullDownEl.find('.pullDownLabel').html('Release to refresh');
                        }
                        if (this.y < this.maxScrollY && !pullUpEl.is('.flip')) {
                            pullUpEl.attr('class', 'pullUp flip');
                            pullUpEl.find('.pullUpLabel').html('Release to load');
                        }
                    }
                });
                myScroll.on('scrollEnd', () => {
                    setTimeout(function () {
                        scrollInProgress = false;
                    }, 100);
                    if (el.find('.' + itemClass).size() >= itemsPerPage) {
                        if (pullDownEl && pullDownEl.is('.flip')) {
                            pullDownEl.attr('class', 'pullDown iscroll-loading');
                            pullDownEl.find('.pullDownLabel').html('Loading');
                            pullDownAction();
                        }
                        else if (pullUpEl && pullUpEl.is('.flip')) {
                            pullUpEl.attr('class', 'pullUp iscroll-loading');
                            pullUpEl.find('.pullUpLabel').html('iscroll-loading');
                            pullUpAction();
                        }
                    }
                });
            }

            function pullDownAction() {
                setTimeout(function () {
                    loadContent('refresh');
                }, 500);
                currentPage = 1;
                $('.iscroll-wrapper > .iscroll-scroller').css({top:0});
            }

            function pullUpAction() {
                currentPage += 1;
                setTimeout(function () {
                    loadContent('load');
                }, 500);
            }

            function loadContent(action) {
                if (action === 'load') {
                    self.$emit('loading-more');
                } else {
                    self.$emit('refreshing');
                }

                setTimeout(() => {
                    myScroll.refresh();
                    pullActionCallback();
                },0)
            }

            function pullActionCallback() {
                if (pullDownEl && pullDownEl.is('.iscroll-loading')) {
                    pullDownEl.attr('class', 'pullDown')
                        .find('.pullDownLabel').html('Pull down to refresh');
                    myScroll.scrollTo(0, parseInt(pullUpOffset)*(-1), 200);
                } else if (pullUpEl && pullUpEl.is('.iscroll-loading')) {
                    pullUpEl.attr('class', 'pullUp')
                        .find('.pullUpLabel').html('Pull up to load');
                }
            }

            setTimeout(triggerMyScroll, 200);
        }
    }
</script>
<style scoped>
    .iscroll-wrapper {
        position: absolute;
        z-index: 1;
        /*top: 45px;*/
        /*bottom: 48px;*/
        /*left: 9999px; /!* Not a must - can be 0 - but it makes the appearance of the content a bit nicer *!/*/
        width: 90%;
        height: 85%;
        /*background: #ccc;*/
        overflow: hidden;
    }

    .iscroll-scroller {
        position: absolute;
        z-index: 1;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        width: 100%;
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-text-size-adjust: none;
        -moz-text-size-adjust: none;
        -ms-text-size-adjust: none;
        -o-text-size-adjust: none;
        text-size-adjust: none;
    }

    /*.iscroll-scroller ul {*/
    /*list-style: none;*/
    /*padding: 0;*/
    /*margin: 0;*/
    /*width: 100%;*/
    /*text-align: left;*/
    /*}*/

    /*.iscroll-scroller li {*/
    /*padding: 0 10px;*/
    /*height: 80px;*/
    /*line-height: 80px;*/
    /*border-bottom: 1px solid #ccc;*/
    /*border-top: 1px solid #fff;*/
    /*background-color: #fafafa;*/
    /*font-size: 14px;*/
    /*}*/

    .pullDownLabel, .pullUpLabel {
        color: #999
    }

    .pullDown, .pullUp {
        background: #fff;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 0.8em;
        color: #888
    }

    .pullDown .pullDownIcon, .pullUp .pullUpIcon {
        display: block;
        float: left;
        opacity: 0.4;
        width: 40px;
        height: 40px;
        background: url(../../src/img/pull_to_refresh.png) 0 0 no-repeat;

        background-size: 40px 80px;
        -webkit-transition: transform 250ms;
        -moz-transition: transform 250ms;
        -ms-transition: transform 250ms;
        -o-transition: transform 250ms;
        transition: transform 250ms;
    }

    .pullDown .pullDownIcon {

        -webkit-transform: rotate(0deg) translateZ(0);
        -moz-transform: rotate(0deg) translateZ(0);
        -ms-transform: rotate(0deg) translateZ(0);
        -o-transform: rotate(0deg) translateZ(0);
        transform: rotate(0deg) translateZ(0);
    }

    .pullUp .pullUpIcon {

        -webkit-transform: rotate(-180deg) translateZ(0);
        -moz-transform: rotate(-180deg) translateZ(0);
        -ms-transform: rotate(-180deg) translateZ(0);
        -o-transform: rotate(-180deg) translateZ(0);
        transform: rotate(-180deg) translateZ(0);
    }

    .pullDown.flip .pullDownIcon {
        -webkit-transform: rotate(-180deg) translateZ(0);
        -moz-transform: rotate(-180deg) translateZ(0);
        -ms-transform: rotate(-180deg) translateZ(0);
        -o-transform: rotate(-180deg) translateZ(0);
        transform: rotate(-180deg) translateZ(0);
    }

    .pullUp.flip .pullUpIcon {
        -webkit-transform: rotate(0deg) translateZ(0);
        -moz-transform: rotate(0deg) translateZ(0);
        -ms-transform: rotate(0deg) translateZ(0);
        -o-transform: rotate(0deg) translateZ(0);
        transform: rotate(0deg) translateZ(0);
    }

    .pullDown.iscroll-loading .pullDownIcon,
    .pullUp.iscroll-loading .pullUpIcon {
        background-position: 0 100%;

        /*-webkit-transform: rotate(0deg) translateZ(0);*/
        /*-moz-transform: rotate(0deg) translateZ(0);*/
        /*transform: rotate(0deg) translateZ(0);*/

        /*-webkit-transition-duration: 0ms;*/
        /*-moz-transition-duration: 0ms;*/
        /*transition-duration: 0ms;*/

        -webkit-animation: loading 1s linear infinite;
        -o-animation: loading 1s linear infinite;
        animation: loading 1s linear infinite;
    }

    .pullUp .pullUpIcon {

        -webkit-transform: rotate(-180deg) translateZ(0);
        -moz-transform: rotate(-180deg) translateZ(0);
        -ms-transform: rotate(-180deg) translateZ(0);
        -o-transform: rotate(-180deg) translateZ(0);
        transform: rotate(-180deg) translateZ(0);
    }

    @-webkit-keyframes loading {
        from {
            -webkit-transform: rotate(0deg) translateZ(0)
        }
        to {
            -webkit-transform: rotate(360deg) translateZ(0)
        }
    }


    @-o-keyframes loading {
        from {
            -o-transform: rotate(0deg) translateZ(0);
        }
        to {
            -o-transform: rotate(360deg) translateZ(0);
        }
    }
    @keyframes loading {
        from {
            transform: rotate(0deg) translateZ(0);
        }
        to {
            transform: rotate(360deg) translateZ(0);
        }
    }

    .ptl-container {
        height:100%;
        overflow: hidden;
    }

</style>