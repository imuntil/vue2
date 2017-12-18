<template>
  <el-menu default-active="0"
           text-color="#fff"
           background-color="#545c64"
           active-text-color="#ffd04b"
           class="el-menu-vertical-demo"
           router
           style="position: absolute;"
           theme="dark"
           :collapse="isCollapse">
    <el-menu-item index="/">
      <i class="el-icon-fa-home"></i>
      <span slot="title">系统首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">产品管理</span>
      </template>
      <el-menu-item index="/products">产品列表</el-menu-item>
      <el-menu-item index="/products/add">添加产品</el-menu-item>
    </el-submenu>
    <el-menu-item index="/user">
      <i class="el-icon-fa-user-o"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-fa-list"></i>
        <span slot="title">订单管理</span>
      </template>
      <el-menu-item index="/orders">全部订单</el-menu-item>
      <el-menu-item index="/orders/to-send">待发货</el-menu-item>
    </el-submenu>
    <el-menu-item index="/coupon">
      <i class="el-icon-fa-ticket"></i>
      <span slot="title">优惠券</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-fa-cog"></i>
        <span slot="title">其他</span>
      </template>
      <el-menu-item index="4-1">选项1</el-menu-item>
      <el-menu-item index="4-2">选项2</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
  export default {
    props: ['isCollapse']
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border-right: none;
  }
</style>
