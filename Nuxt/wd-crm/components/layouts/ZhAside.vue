<template>
  <el-menu default-active="0"
           text-color="#fff"
           background-color="#545c64"
           active-text-color="#ffd04b"
           class="el-menu-vertical"
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
        <el-badge v-show="!!toBeDelevered" is-dot style="margin-left: 5px;" />
      </template>
      <el-menu-item index="/orders">全部订单</el-menu-item>
      <el-menu-item index="/orders/to-send">
        待发货
        <el-badge class="mark" :value="toBeDelevered" :max="9" v-show="!!toBeDelevered" />
      </el-menu-item>
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
  import { mapState } from 'vuex'
  import { AudioCtx, notification } from '~/assets/lib/h5-api'
  export default {
    props: ['isCollapse'],
    computed: {
      ...mapState('order', ['toBeDelevered', 'remind'])
    },
    data () {
      return {
        audio: null
      }
    },
    methods: {
      notification () {
        const message = '有新的待发货订单，请前往查看'
        this.$message({ message, type: 'info' })
        if (!this.audio) this.audio = new AudioCtx()
        this.audio.run()
        notification(message)
      }
    },
    watch: {
      remind (v) {
        if (v) this.notification()
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border-right: none;
  }
</style>
<style>
  .el-menu-vertical .el-badge__content {
    line-height: 16px;
  }
</style>

