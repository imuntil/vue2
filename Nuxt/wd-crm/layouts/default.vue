<template>
  <el-container class="main-body">
    <el-header class="zh-top">
      <m-header :isCollapse.sync="isCollapse" />
    </el-header>
    <el-container>
      <el-aside class="zh-aside" :width="asideWidth">
        <zh-aside :isCollapse="isCollapse" />
      </el-aside>
      <el-container direction="vertical">
        <el-main class="zh-main">
          <div class="nuxt-box">
            <nuxt />
          </div>
          <zh-footer />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
  import { Header, Footer, Aside, Container, Main } from 'element-ui'
  import MHeader from '~/components/layouts/MHeader'
  import ZhAside from '~/components/layouts/ZhAside'
  import ZhFooter from '~/components/layouts/ZhFooter'
  export default {
    components: {
      ElHeader: Header,
      ElFooter: Footer,
      ElAside: Aside,
      ElContainer: Container,
      ElMain: Main,
      MHeader,
      ZhAside,
      ZhFooter
    },
    data () {
      return {
        isCollapse: false
      }
    },
    computed: {
      asideWidth () {
        return this.isCollapse ? '70px' : '210px'
      }
    }
  }
</script>
<style type="text/scss" lang="scss">
  @import "../assets/style/decoration";

  .zh-top {
    background-color: $bb1color;
    border-bottom: 1px solid $bb1color;
  }
  .zh-aside {
    width: 210px;
    background-color: #545c64;
    transition: width 300ms cubic-bezier(.58,.31,.6,1);
    overflow: hidden;
  }
  .zh-main {
    padding: 0;
  }
  .zh-main > div {
    padding: 20px;
  }
  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>
