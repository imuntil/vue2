<template>
  <el-menu default-active="0"
           text-color="#fff"
           background-color="#545c64"
           active-text-color="#ffd04b"
           class="el-menu-vertical-demo"
           @open="handleOpen"
           @close="handleClose"
           router
           style="position: absolute;"
           theme="dark"
           :collapse="isCollapse">
    <el-menu-item index="0" :route="{ path: '/' }">
      <i class="el-icon-menu"></i>
      <span slot="title">系统首页</span>
    </el-menu-item>
    <el-menu-item index="1" :route="{ path: '/products' }">
      <i class="el-icon-menu"></i>
      <span slot="title">产品管理</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <span slot="title">订单管理</span>
    </el-menu-item>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">其他</span>
      </template>
      <el-menu-item index="4-1">选项1</el-menu-item>
      <el-menu-item index="4-2">选项2</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
  import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
  export default {
    props: ['isCollapse'],
    components: {
      ElMenu: Menu,
      ElSubmenu: Submenu,
      ElMenuItem: MenuItem,
      ElMenuItemGroup: MenuItemGroup
    },
    data () {
      return {
        // x
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key)
      },
      handleClose (key, keyPath) {
        console.log(key)
      }
    }
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
