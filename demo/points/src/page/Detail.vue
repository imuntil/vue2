<template>
  <div class="container">
    <div class="ppd-s09w2">
      <p class="banner">
        <img src="../assets/point-pro.jpg" alt="">
      </p>
      <div class="content-s09w2">
        <div key="0" class="top">
          <span>兑换产品名称</span>
          <span>
            <i class="iconfont">&#xe66b;</i>
            1200
            <i>积分</i>
          </span>
        </div>
        <p key="1" class="detail">
          产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述 <br>
          产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述产品详细产品描述
        </p>
        <div key="2" class="bottom">
          <span>当前积分：12345</span>
          <a href="javascript:;" class="charge">积分兑换</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
  }
  @import '../styles/decoration.scss';
  .ppd-s09w2 {
    .banner img {
      width: 100%;
    }
  }

  .content-s09w2 {
    padding: 15px;
    .top {
      font-size: 1.05rem;
      padding: 0.2rem 0.5rem;
      &::after {
        content: '';
        display: block;
        width: 0;
        clear: both;
      }
      span {
        float: left;
      }
      span:last-child {
        float: right;
        color: $gold;
      }
      i {
        font-style: normal;
        font-size: 0.8rem;
        font-style: normal;
        padding: 0 0.2em;
      }
    }
    .detail {
      padding: 1em;
      font-size: 0.8rem;
      line-height: 1.5;
      margin-top: 1.8em;
      background-color: #f2f2f2;
    }
    .bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      // height: 80px;
      text-align: center;
      background-color: #f2f2f2;
      box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
      span {
        line-height: 28px;
        font-size: 0.9rem;
      }
    }
    .charge {
      display: block;
      font-size: 1rem;
      padding: 0.9em 0;
      text-align: center;
      color: #fff;
      background-color: $red;
      box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
    }
    .charge:active {
      opacity: 0.8;
    }
  }
</style>
