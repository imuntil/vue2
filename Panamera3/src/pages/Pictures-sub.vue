<template>
  <div class="wrapper">
    <div class="main-container">
      <img v-if="sub === 1" class="page-banner" src="../assets/pics-sub-header1.jpg" alt="">
      <img v-if="sub === 2" class="page-banner" src="../assets/pics-sub-header2.jpg" alt="">
      <img v-if="sub === 3" class="page-banner" src="../assets/pics-sub-header3.jpg" alt="">
      <p class="bottom-shadow"></p>
      <div class="body"></div>
      <footer>
        <a href="javascript:;">
          <!--<img src="../assets/competing-more.jpg" alt="">-->
        </a>
      </footer>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        sub: this.$route.params['sub'] || 1
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  footer {
    padding: 1rem 0;
    a {
      width: 25%;
      margin-right: 5%;
    }
  }
</style>
