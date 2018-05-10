<template>
  <div class="container">
    <div class="pp-12d9f">
      <h3>积分兑换
        <i class="iconfont">&#xe66b;</i>
      </h3>
      <div class="content-12d9f">
        <div v-for="i in 1" :key="i" class="ppc-12d9f" @click="handleClick(i)">
          <div class="content">
            <div class="box">
              <p class="name">兑换产品名称</p>
              <p>消费内容消费内容消费内容消费内容消费内容消费内容消费内容消费内容消费内容消费内容消费内容消费内容消费内容消费内容</p>
              <p class="points">
                <span>1200</span>
                <i class="iconfont">&#xe66b;</i>
              </p>
            </div>
            <div class="img-box">
              <img src="../assets/point-pro-thumb.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: []
      }
    },
    methods: {
      handleClick (i) {
        this.$router.push(`/detail/${i + 1}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/decoration.scss';
  .container {
    height: 100%;
  }
  .pp-12d9f {
    background-color: #f6f6f6;
    h3 {
      text-align: center;
      color: $gold;
      width: 100%;
      position: fixed;
      line-height: 45px;
      box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.1);
      z-index: 99;
      background-color: #fff;
      i {
        font-weight: normal;
      }
    }
  }
  .content-12d9f {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 55px 15px 0;
  }
  .ppc-12d9f {
    padding: 12px;
    border-radius: 3px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1em;
    background-color: #fff;
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
    }
    .img-box {
      width: 30%;
      img {
        width: 100%;
      }
    }
    .box {
      flex: 1;
      padding-right: 0.5em;
      p {
        margin: 0.4em 0;
        line-height: 1.2;
        color: #555;
      }
    }
    p.name {
      color: $gold;
      padding-bottom: 0.2em;
      font-weight: bold;
    }
    p.points {
      color: $gold;
      span {
        font-size: 0.9rem;
        padding-right: 0.5em;
      }
    }
  }
</style>
