<template>
  <div class="wrapper">
    <div class="main-container">
      <img class="page-banner" src="../assets/space-header.jpg" alt="">
      <p class="bottom-shadow"></p>
      <div class="body">
        <!--<p></p>-->
        <img src="../assets/space-1.jpg" alt="">
      </div>
      <footer>
        <a href="javascript:;" class="active">1F</a>
        <a href="javascript:;">2F</a>
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import "../styles/theme";
  div.body {
    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80%;
      max-width: 100%;
      width: auto;
      margin:auto;
    }
  }
  footer {
    justify-content: center;
    &::before {
      content: ' ';
      position: absolute;
      width:100%;
      height:.1rem;
      top: 0;
      left: 0;
      box-shadow: 0 -1px 3px 1px #6F0202;
    }
    a {
      display: block;
      padding: .4rem 2.5rem;
      color: #ffffff;
      &:first-child {
        margin-right: 2rem;
      }
    }
    .active {
      background-color: #fff;
      border-radius: .3rem;
      color: $common-red;
    }
  }
</style>
