<template>
  <div class="footBox">
    <div v-if="active==1">
      <div class="grid-content active">
        <i><img src="../assets/icon-home-a.png" alt=""></i>
        <span>首页</span>
      </div>
    </div>
    <div v-else>
      <div class="grid-content" @click="tabClick(1)">
        <i><img src="../assets/icon-home.png" alt=""></i>
        <span>首页</span>
      </div>
    </div>
    <div v-if="active==2">
      <div class="grid-content active">
        <i><img src="../assets/icon-record-a.png" alt=""></i>我的记录</div>
    </div>
    <div v-else>
      <div class="grid-content" @click="tabClick(2)">
        <i><img src="../assets/icon-record.png" alt=""></i>我的记录</div>
    </div>
    <div v-if="active==3">
      <div class="grid-content active">
        <i><img src="../assets/icon-mall-a.png" alt=""></i>积分兑换</div>
    </div>
    <div v-else>
      <div class="grid-content" @click="tabClick(3)">
        <i><img src="../assets/icon-mall.png" alt=""></i>积分兑换</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        active: 3
      }
    },
    computed: {
    },
    methods: {
      tabClick (i) {
        if (i === 1) {
          location.href = 'http://api.jtuntech.com/event/2018/Q1/campariCRM/user/#/center'
        } else if (i === 2) {
          location.href = 'http://api.jtuntech.com/event/2018/Q1/campariCRM/user/#/record'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footBox {
    width: 100%;
    position: fixed;
    bottom: 0;
    box-shadow: 0 -0.01rem 0.08rem #dddddd;
    background-color: #ffffff;
  }
  .footBox {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
  }
  .footBox > div {
    width: 33.333333%;
  }
  .grid-content {
    height: 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 3px;
    box-sizing: border-box;
  }
  .grid-content i {
    display: inline-block;
    width: 25px;
    height: 25px;
  }
  .grid-content i img {
    width: 100%;
  }
  .grid-content.active {
    color: #b2a258;
  }
</style>
