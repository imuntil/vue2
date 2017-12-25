<template>
  <transition name="zh-popover-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="zh-popover" :style="style" @mouseleave="closePopover">
      <i class="el-icon-circle-close" @click="closePopover"></i>
      <div class="inner">
        <p class="sku">{{datas.sku}}</p>
        <p class="cn">{{datas.cn}}</p>
        <p class="en">{{datas.en}}</p>
        <p class="origin">产地: {{datas.origin}}</p>
        <p class="content">净含量: {{datas.content}}ml</p>
        <p class="true-price">售价: {{datas.truePrice | currency('￥')}}</p>
        <p class="stock">库存: {{datas.stock}}</p>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        top: 0,
        left: 0,
        visible: false,
        datas: {}
      }
    },
    computed: {
      style () {
        return { top: this.top - 20 + 'px', left: this.left - 20 + 'px' }
      }
    },
    methods: {
      handleAfterLeave () {
        this.$emit('after-leave')
      },
      closePopover () {
        this.close()
      }
    },
    beforeDestroy () {
      console.log('before')
    },
    destroyed () {
      console.log('destroy')
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .zh-popover {
    position: fixed;
    width: 150px;
    left: 0;
    right: 0;
    z-index: 999999;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
    & > i {
      position: absolute;
      right: 5px;
      top: 5px;
    }
  }
  .inner {
    width: 100%;
    padding: 10px;
    p {
      font-size: .8rem;
      line-height: 1.5;
      border-bottom: 1px solid #eee;
      padding: 3px 0;
      white-space: normal;
      color: #444;
      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }
  }
</style>
