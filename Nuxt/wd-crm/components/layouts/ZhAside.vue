<template>
  <el-menu default-active="1-1"
           text-color="#fff"
           background-color="#545c64"
           active-text-color="#ffd04b"
           class="el-menu-vertical-demo"
           @open="handleOpen"
           @close="handleClose"
           style="position: absolute;"
           :collapse="isCollapse">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
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
