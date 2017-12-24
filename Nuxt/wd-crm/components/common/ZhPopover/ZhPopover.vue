<template>
  <transition name="zh-popover-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="zh-popover" :style="style" @mouseleave="handleMouseLeave">
      ....
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        top: 0,
        left: 0,
        visible: false
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
      handleMouseLeave () {
        this.visible = false
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
    height: 150px;
    left: 0;
    right: 0;
    z-index: 999999;
    background-color: #000;
  }
</style>
