<template>
  <div class="main-body">
    <zh-header class="zh-top" :isCollapse.sync="isCollapse"></zh-header>
    <div class="main-container out" :class="{ 'is-close': isCollapse }">
      <aside class="zh-aside">
        <zh-aside :isCollapse="isCollapse"></zh-aside>
      </aside>
      <div class="vertical main-container">
        <main class="zh-main">
          <zh-breadcrumb></zh-breadcrumb>
          <div class="nuxt-box">
            <nuxt />
          </div>
          <zh-footer></zh-footer>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
  import ZhHeader from '~/components/layouts/ZhHeader'
  import ZhAside from '~/components/layouts/ZhAside'
  import ZhFooter from '~/components/layouts/ZhFooter'
  import ZhBreadcrumb from '~/components/layouts/ZhBreadcrumb'
  import { mapState } from 'vuex'
  export default {
    components: {
      ZhHeader,
      ZhAside,
      ZhFooter,
      ZhBreadcrumb
    },
    data () {
      return {
        isCollapse: false
      }
    },
    computed: {
      asideWidth () {
        return this.isCollapse ? '70px' : '210px'
      },
      ...mapState('nt', ['error'])
    }
  }
</script>
<style type="text/scss" lang="scss">
  @import "../assets/style/decoration";
  .main-body {
    height: 100vh;
    min-width: 1000px;
    display: flex;
    flex-direction: column;
  }
  .main-container {
    display: flex;
    &.out {
      flex: 1;
    }
    &.vertical {
      flex-direction: column;
      flex: 1;
      width: calc(100% - 210px);
    }
    &.out.is-close {
      .zh-aside {
        width: 70px;
      }
      /*.main-container {*/
        /*width: calc(100% - 70px);*/
      /*}*/
    }
  }
  .zh-top {
    background-color: $bb1color;
    border-bottom: 1px solid $bb1color;
    height: 60px;
  }
  .zh-aside {
    width: 210px;
    height: 100%;
    background-color: #324157;
    transition: width 300ms cubic-bezier(.58,.31,.6,1);
    overflow: hidden;
  }
  .zh-main {
    padding: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .zh-main > div {
    padding: 20px;
  }
  .nuxt-box {
    flex: 1;
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
