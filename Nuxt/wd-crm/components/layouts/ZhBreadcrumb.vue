<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="zh-breadcrumb">
    <el-breadcrumb-item class="zh-bi" :to="{ path: '/'  }">首页</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
  import { Breadcrumb, BreadcrumbItem } from 'element-ui'
  export default {
    components: {
      ElBreadcrumb: Breadcrumb,
      ElBreadcrumbItem: BreadcrumbItem
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  @import "../../assets/style/decoration";
  .zh-breadcrumb {
    border-bottom: 1px solid $bb2color;
    .zh-bi {
      cursor: pointer;
      & > .el-breadcrumb__inner {
        cursor: pointer;
      }
    }
  }
</style>
