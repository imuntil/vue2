<template>
  <header class="zh-header">
    <p class="title">
      <span>WD CRM System</span>
      <a href="javascript:;" class="zh-menu" @click="handleClick">
        <span></span>
      </a>
    </p>
    <p class="user">
      <a href="javascript:;">admin</a>
    </p>
  </header>
</template>
<script>
  export default {
    props: ['isCollapse'],
    methods: {
      handleClick () {
        this.$emit('update:isCollapse', !this.isCollapse)
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
  }

</style>
