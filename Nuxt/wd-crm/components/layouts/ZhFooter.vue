<template>
  <footer>
    <p class="zh-footer">
      技术支持 <a href="https://imuntil.com" target="_blank">&nbsp; imuntil.com</a>
    </p>
  </footer>
</template>
<script>

</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/decoration";
  footer {
    height: 40px;
    padding: 0 20px;
    background-color: $bb2color;
  }
  .zh-footer {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a {
      display: inline-block;
    }
  }
</style>
