<template>
  <header class="zh-header">
    <p class="title">
      <span>WD CRM System</span>
      <a href="javascript:;" class="zh-menu" @click="handleClick">
        <span></span>
      </a>
    </p>
    <el-popover ref="logout" placement="bottom" trigger="hover">
      <p class="text--center">
        <el-button @click="handleLogout" type="text" size="small">退出登录</el-button>
      </p>
    </el-popover>
    <p class="user">
      <a v-popover:logout href="javascript:;">admin</a>
    </p>
  </header>
</template>
<script>
  import { logout } from '~/assets/lib/api'
  export default {
    props: ['isCollapse'],
    methods: {
      handleClick () {
        this.$emit('update:isCollapse', !this.isCollapse)
      },
      async handleLogout () {
        const { data } = await logout()
        if (data && data.code === 0) {
          this.$router.replace({ path: '/login' })
          this.$store.commit('auth/removeAuth')
          this.$message({ type: 'info', message: '已退出' })
        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  @import "../../assets/style/decoration";
  .zh-header {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    height: 60px;
  }
  .zh-header p {
    display: inline-block;
    font-size: 1rem;
  }
  .zh-header .title  {
    display: flex;
    align-items: center;
    span {
      font-size: 1.25rem;
    }
    .zh-menu {
      display: inline-block;
      border: 1px solid $bb1color;
      border-radius: 2px;
      padding: 12px 6px;
      font-size: 0;
      margin-left: 20px;
      position: relative;
      span {
        height: 2px;
        width: 14px;
        background-color: #333333;
        display: inline-block;
      }
      &::before, &::after {
        content: '';
        background-color: #333333;
        position: absolute;
        height: 2px;
        width: 14px;
        top: 6px;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
      &::after {
        top: auto;
        bottom: 6px;
      }
    }
  }
  .user {
    text-align: right;
    margin-right: 20px;
  }

</style>
