<template>
    <li :class="customClass">
        <a href="javascript:void(0);">
            <img src="src/img/home-sellings-1.jpg" alt="" width="100%">
            <p class="en">{{item.englishname || 'no name'}}</p>
            <p class="cn">{{item.proname || '无名'}}</p>
            <p class="oth">{{item.procontent || '750'}}ml <i>{{item.proprice || 180 | currency('￥', 0)}}</i></p>
        </a>
    </li>
</template>
<script>
    import {currency} from '../javascripts/filters/custom-filter'
    export default {
        props:{
            item:Object,
            customClass:String
        },
        computed:{
            price() {
                return filter.currency(this.item.proprice);
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../stylesheets/common.scss";

    li {
        width:47%;
        margin-right:6%;
        margin-top:2%;
        float: left;
        a {
            overflow: hidden;
            display: block;
            color: #000;
        }
        &:nth-last-of-type(odd) {
            margin-right: 0;
        }
        p{
            @include homePs;
        }
        p.oth {
            font-weight:500;
            margin-top:8px;
            i {
                float: right;
                color: $home-red-color;
                font-style: normal;
            }
        }
    }
</style>