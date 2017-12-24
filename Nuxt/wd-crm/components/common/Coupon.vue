<template>
  <div class="coupon-card">
    <div class="wrapper">
      <div class="main">
        <p class="cut"><span>￥</span>{{datas.method.cut}}</p>
        <p class="archive">满{{datas.method.achieve}}元可用</p>
      </div>
      <div class="detail">
        <p class="range">
          <span v-for="p in limitBy(datas.apply, 3)" :key="p" >
            <router-link :to="{ path: `/products/${p}` }">{{p}}</router-link>,
          </span>
          ...等可用
        </p>
        <p class="date">{{datas.start | dtf}} — <br> — {{datas.end | dtf}}</p>
        <p class="ope">
          <a href="javascript:;" @click="handleClick(datas.kid)">查看详细</a>
        </p>
      </div>
      <a v-if="expired" href="javascript:;" class="watermark">过期</a>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['datas'],
    computed: {
      expired () {
        return new Date() > new Date(this.datas.end)
      }
    },
    methods: {
      handleClick (kid) {
        this.$emit('detail', kid)
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .coupon-card {
    padding: 10px;
    display: inline-block;
    cursor: pointer;
  }
  .wrapper {
    display: flex;
    position: relative;
    overflow: hidden;
    box-shadow:  -1px 1px 4px 1px rgba(0, 0, 0, 0.1);
  }
  .main, .detail {
    border-radius: 3px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    p {
      line-height: 1.5;
      font-size: .9em;
    }
    .cut {
      font-size: 2rem;
      span {
        font-size: .8rem;
      }
    }
  }
  .main {
    background-color: #1dc7ff;
  }
  .detail {
    background-color: #e9e9e9;
    align-items: flex-start;
    p {
      font-size: .8rem;
    }
    .ope {
      align-self: flex-end;
      padding-left: 75px;
      a {
        padding: 2px 5px;
        margin-left: 2px;
      }
    }
    .date {
      font-size: .7rem;
    }
  }
  .watermark {
    position: absolute;
    right: -10px;
    top: 10px;
    padding: 5px 10px 5px .9rem;
    border-radius: 5px;
    border: 2px solid #444;
    font-size: 1.5rem;
    letter-spacing: .5rem;
    color: #333333;
    opacity: .3;
    transform: rotate(30deg);
  }
</style>
