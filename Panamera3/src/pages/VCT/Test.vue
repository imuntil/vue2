<template>
  <div class="wrapper">
    <div class="main-container" :class="[model]">
      <div class="test-box">

      </div>
      <a href="javascript:;" class="submit">提交</a>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        model: this.$route.params['model']
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import "../../styles/theme";
  .main-container {
    /*background: url("../assets/td-test-bg.jpg") no-repeat center;*/
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
  }
  .audi {
    background: url("../../assets/Audi-Test.jpg") no-repeat center;
    -webkit-background-size: cover;
  }
  .benz {
    background: url("../../assets/Benz-Test.jpg") no-repeat center;
    -webkit-background-size: cover;
  }
  .bmw {
    background: url("../../assets/BMW-Test.jpg") no-repeat center;
    -webkit-background-size: cover;
  }
  .test-box {
    height: 70%;
    width: 100%;
    overflow: scroll;
    padding: 10% 2rem;
    margin: 15% 0;
    position: relative;
    .item {
      width: 100%;
      padding: .5rem 0;
      line-height: 1.5;
      p {
        color: #d1d1d1;
        font-size: .8rem;
        padding: .1rem;
        display: block;
      }
      ul {
        width: 100%;
        padding-left: 1rem;
        margin-top: .5rem;
        li {
          width: 100%;
        }
      }
      a {
        @extend p;
        padding: .2rem;
        word-break: break-all;
      }
    }
  }
  .submit {
    padding: .8rem;
    width: 40%;
    color: #ffffff;
    margin: .4rem auto;
    text-align: center;
    background-color: $common-red;
    border-radius: .8rem;
    display: block;
    font-size: .9rem;
    border: 1px solid #676767;
  }
</style>

