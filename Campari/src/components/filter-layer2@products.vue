<template>
    <ul class="categories-layer-2">
    <li><a href="javascript:void(0);"
           :class="{active:route_.sort == 2}"
           @click.stop="query({sort:2})">销量最高</a></li>
    <li><a href="javascript:void(0);"
           :class="{active:route_.sort == 3}"
           @click.stop="query({sort:3})">价格最高</a></li>
    <li><a href="javascript:void(0);"
           :class="{active:route_.sort == 4}"
           @click.stop="query({sort:4})">价格最低</a></li>
    </ul>
</template>
<script>
    export default {
        props:{
            replace:{
                type:Boolean,
                default:false
            },
            route_:{
                type:Object
            }
        },
        methods:{
            query(params) {
                let router = {};
                if (this.$route.name === 'products') {
                    router = Object.assign(params, {flag:1});
                } else {
                    router = Object.assign(this.$route.params, params);
                }
                this.$emit('query', router);
            }
        }
    }
</script>