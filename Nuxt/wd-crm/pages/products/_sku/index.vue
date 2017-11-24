<template>
  <section class="container">
    <div class="detail-area">
      <h2 class="title text--center">
        {{data.sku}} &nbsp;&nbsp;  产品详细
        <router-link :to="{ path: `/products/${data.sku}/edit` }">编辑产品</router-link>
      </h2>
      <section class="group split-2">
        <span class="field text--right">SKU&nbsp;:</span>
        <span class="value">{{data.sku}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">品类&nbsp;:</span>
        <span class="value">{{data._type}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">中文名&nbsp;:</span>
        <span class="value">{{data.cn}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">英文名&nbsp;:</span>
        <span class="value">{{data.en}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">图片&nbsp;:</span>
        <span class="value"></span>
      </section>
      <section class="group split-2">
        <span class="field text--right">价格&nbsp;:</span>
        <span class="value color--red">￥{{mf(data.price)}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">是否打折&nbsp;:</span>
        <span class="value color--red">{{data.setToSales ? '是' : '否'}}</span>
      </section>
      <section class="group split-2" v-if="data.setToSales">
        <span class="field text--right">打折方式&nbsp;:</span>
        <span class="value">{{data.setToSales === 1 ? '优惠价' : `${data.off * 100}% off`}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">真实售价&nbsp;:</span>
        <span class="value color--red">￥{{mf(data.truePrice)}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">酒精度&nbsp;:</span>
        <span class="value">{{data.alcoholic}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">净含量&nbsp;:</span>
        <span class="value">{{data.content}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">重量&nbsp;:</span>
        <span class="value">{{data.weight}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">产地&nbsp;:</span>
        <span class="value">{{data.origin}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">销量&nbsp;:</span>
        <span class="value">{{data.sales}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">收藏数&nbsp;:</span>
        <span class="value">{{data.like}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">入车数&nbsp;:</span>
        <span class="value">{{data.cart}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">库存&nbsp;:</span>
        <span class="value">{{data.stock}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">创建时间&nbsp;:</span>
        <span class="value">{{data.date}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">上次更新&nbsp;:</span>
        <span class="value">{{data.update}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">产品介绍&nbsp;:</span>
        <span class="value">{{data.introduce}}</span>
      </section>
    </div>
  </section>
</template>
<script>
  import { fetchProDetail } from '~/assets/lib/api'
  import { moneyFormat } from '~/assets/lib/common-tools'

  export default {
    validate ({ params }) {
      return /^[A-z]-\d{3,4}$/.test(params.sku)
    },
    async asyncData ({ params }) {
      const { err, fail, data } = await fetchProDetail({ sku: params.sku })
      if (err || fail) throw new Error(err || fail)
      return { data: data.data }
    },
    methods: {
      mf: moneyFormat
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/style/decoration";
  .detail-area {
    width: 700px;
    display: block;
    padding: 15px;
    margin: auto;
    .title {
      padding: 10px 0 20px;
      position: relative;
      margin-bottom: 15px;
      a {
        display: inline-block;
        font-size: .9rem;
        position: absolute;
        bottom: 0;
        right: 10px;
      }
    }
  }
  .group.split-2 {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid $bb3color;
    &:nth-of-type(odd) {
      background-color: $bb4color;
    }
    .field {
      flex: 0 0 100px;
      margin-right: 15px;
      padding-right: 10px;
      font-weight: 600;
      color: $font3color;
    }
    .value {
      flex: 1;
      padding-left: 15px;
      font-size: 1.2rem;
    }
  }
</style>
