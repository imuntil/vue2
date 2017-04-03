<template>
    <div class="categories-layer">
        <a class="c-btn-hide c-btn"
           @click.stop="hide"
           href="javascript:void(0);">
            <!--<img src="src/img/c-btn-2.jpg" alt="" width="100%">-->
        </a>
        <img class="c-bg" src="src/img/c-all-3.png" alt="" width="100%">
        <ul class="c-btns">
            <li><router-link :to="{name:'products2', params:{flag:2, sort:1, type:1}}"></router-link></li>
            <li><router-link :to="{name:'products2', params:{flag:2, sort:1, type:2}}"></router-link></li>
            <li><router-link :to="{name:'products2', params:{flag:2, sort:1, type:3}}"></router-link></li>
            <li><router-link :to="{name:'products2', params:{flag:2, sort:1, type:4}}"></router-link></li>
            <li><router-link :to="{name:'products2', params:{flag:2, sort:1, type:5}}"></router-link></li>
            <li><router-link :to="{name:'products2', params:{flag:2, sort:1, type:6}}"></router-link></li>
            <li><router-link :to="{name:'products2', params:{flag:2, sort:1, type:7}}"></router-link></li>
        </ul>
    </div>
</template>
<script>
    export default {
        methods:{
            hide() {
                this.$emit('hide-layer');
            }
        }
    }
</script>