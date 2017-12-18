<template>
  <span class="word-icon" :class="[c]">{{word}}</span>
</template>
<script>
  export default {
    props: ['w'],
    data () {
      return {
        icons: ['热', '推', '邮', '券']
      }
    },
    computed: {
      word () {
        return ~~this.w <= 3 ? this.icons[~~this.w] : this.icons[0]
      },
      c () {
        switch (~~this.w) {
          case 1:
            return 'icon-recommend'
          case 2:
            return 'icon-free'
          case 3:
            return 'icon-discount'
          default:
            return 'icon-hot'
        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .word-icon {
    font-size: .9rem;
    border-radius: 50%;
    display: inline-block;
    border: 2px solid;
    padding: 3px;
    opacity: .3;
    transform: rotate(30deg);
    font-weight: 600;
    line-height: 1;
    transition: all .2s;
    &.icon-recommend {
      color: #0070d0;
      border-color: #0070d0;
    }
    &.icon-free {
      color: #00d05c;
      border-color: #00d05c;
    }
    &.icon-discount {
      color: #ffc900;
      border-color: #ffc900;
    }
    &.icon-hot {
      color: #ff0000;
      border-color: #ff0000;
    }
    &:hover {
      opacity: 1;
      z-index: 10;
      transform: scale(1.2);
    }
  }
</style>
