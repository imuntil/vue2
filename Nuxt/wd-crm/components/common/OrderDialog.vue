<template>
  <div class="order-dialog">
    <div class="field">
      <span>订单号</span>
      <p>{{datas.orderNumber}}</p>
    </div>
    <div class="field">
      <span>下单用户</span>
      <p>{{datas._ownerNick}}</p>
    </div>
    <div class="field">
      <span>用户手机号码</span>
      <p>{{datas._ownerPhone}}</p>
    </div>
    <div class="field">
      <span>下单日期</span>
      <p>{{df(datas.date)}}</p>
    </div>
    <div class="field">
      <span>收货地址</span>
      <div class="sub-field">
        <p><span>收件人:</span> {{datas.address.name}}</p>
        <p><span>联系方式:</span> {{datas.address.phone}}</p>
        <p><span>详细地址:</span> {{datas.address.province}}-{{datas.address.city}}-{{datas.address.detail}}</p>
      </div>
    </div>
    <div class="field">
      <span>快递费用</span>
      <p>{{datas.express | currency('￥')}}</p>
    </div>
    <div class="field">
      <span>订单金额</span>
      <p>{{datas.amount | currency('￥')}}</p>
    </div>
    <div class="field">
      <span>订单内容</span>
      <div class="sub-field">
        <el-table :data="datas.products">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="SKU" width="80">
            <template scope="scope">
              <router-link :to="{ path: `/products/${scope.row.sku}` }">
                {{scope.row.sku}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="cn" label="产品名"></el-table-column>
          <el-table-column label="原价">
            <template scope="scope">
              {{scope.row.price | currency('￥')}}
            </template>
          </el-table-column>
          <el-table-column label="成交价格">
            <template scope="scope">
              {{scope.row.truePrice | currency('￥')}}
            </template>
          </el-table-column>
          <el-table-column prop="count" label="数量"></el-table-column>
          <el-table-column prop="content" label="净含量/ml"></el-table-column>
          <el-table-column prop="weight" label="重量/g"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['datas', 'df']
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/decoration";
  .order-dialog {
    width: 100%;
    display: block;
  }
  .field {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px 0;
    justify-content: space-between;
    &:nth-of-type(odd) {
      background-color: $bb4color;
    }
    & > span {
      flex: 1 1 10%;
      text-align: right;
      margin-right: 3%;
    }
    & > p,
    & > div {
      flex: 1 1 85%;
    }
  }
  .sub-field {
    width: 100%;
    overflow-x: auto;
    & > p {
      display: flex;
      justify-content: flex-start;
      line-height: 1.5;
      align-items: center;
      span {
        width: 70px;
        padding-right: 10px;
        font-size: .8rem;
        text-align: justify;
        text-align-last: justify;
      }
    }
  }
</style>
