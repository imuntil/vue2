<template>
  <el-tag :type="t" class="zh--tag" :class="`zh--${t}`" close-transition>
    <slot></slot>
  </el-tag>
</template>
<script>
//  import { Tag } from 'element-ui'
  export default {
    props: ['type'],
//    components: { ElTag: Tag },
    data () {
      return {
        types: ['primary', 'gray', 'success', 'warning', 'danger']
      }
    },
    computed: {
      t () {
        return this.types.indexOf(this.type) ? this.type : ''
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .zh--tag.zh--red {
    background-color: #FF33CC;
    color: #ffffff;
    border-color: #CC33CC;
  }
  .zh--tag.zh--blue {
    background-color: #33FFFF;
    color: #6600FF;
    border-color: #33CCFF;
  }
  .zh--tag.zh--green {
    background-color: #66FF66;
    color: #006600;
    border-color: #66CC66;
  }
</style>
