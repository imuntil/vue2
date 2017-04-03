<template>
    <div class="categories-layer">
        <img class="c-bg" src="src/img/c-all-4.jpg" alt="" width="100%">
        <ul class="c-btns">

            <li><a href="javascript:void(0);"
                   :class="{active:route_.type == 1}"
                   @click.stop="query({type:1})"></a></li>
            <li><a href="javascript:void(0);"
                   :class="{active:route_.type ==2}"
                   @click.stop="query({type:2})"></a></li>
            <li><a href="javascript:void(0);"
                   :class="{active:route_.type == 3}"
                   @click.stop="query({type:3})"></a></li>
            <li><a href="javascript:void(0);"
                   :class="{active:route_.type == 4}"
                   @click.stop="query({type:4})"></a></li>
            <li><a href="javascript:void(0);"
                   :class="{active:route_.type == 5}"
                   @click.stop="query({type:5})"></a></li>
            <li><a href="javascript:void(0);"
                   :class="{active:route_.type == 6}"
                   @click.stop="query({type:6})"></a></li>
            <li><a href="javascript:void(0);"
                   :class="{active:route_.type == 7}"
                   @click.stop="query({type:7})"></a></li>
        </ul>
    </div>
</template>
<script>
    export default {
        props:{
            replace:{
                type:Boolean,
                default:false,
            },
            route_:{
                type:Object
            }
        },
        methods:{
            query(params) {
                let router = {};
                if (this.$route.name === 'products') {
                    router = Object.assign(params, {flag:2, sort:1});
                } else {
                    router = Object.assign(this.$route.params, params, {flag: 2});
                }
                this.$emit('query', router);
            }
        }
    }
</script>