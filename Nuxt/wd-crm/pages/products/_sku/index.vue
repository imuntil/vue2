<template>
  <section class="container">
    <div class="detail-area">
      <h2 class="title text--center">
        {{data.sku}} &nbsp;&nbsp; 产品详细
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
        <div class="value">
          <ul class="gallery">
            <li v-for="i in data.images" :key="i">
              <a href="javascript:;" @click="handleClick(i)">
                <img :src="`${$staticURL}${i}`" :alt="i.slice(-17)">
              </a>
            </li>
          </ul>
        </div>
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
        <span class="value color--red">{{data.truePrice | currency('￥')}}</span>
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
        <span class="value">{{data.sales || 0}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">收藏数&nbsp;:</span>
        <span class="value">{{data.like || 0}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">入车数&nbsp;:</span>
        <span class="value">{{data.cart || 0}}</span>
      </section>
      <section class="group split-2">
        <span class="field text--right">库存&nbsp;:</span>
        <span class="value">{{data.stock || 0}}</span>
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
        <!--<span class="value">{{data.introduce}}</span>-->
        <div class="value introduce-value" v-html="data.introduce"></div>
      </section>
    </div>
    <el-dialog :visible.sync="visible">
      <div class="current-box">
        <img :src="`${$staticURL}${current}`" alt="" style="width: 100%;">
      </div>
    </el-dialog>
  </section>
</template>
<script>
//  import { fetchProDetail } from '~/assets/lib/api'
import { moneyFormat } from '~/assets/lib/common-tools'
//  import { Dialog } from 'element-ui'
import { product } from '~/assets/lib/constant'
import { mapState } from 'vuex'

export default {
  components: {
    //      ElDialog: Dialog
  },
  validate ({ params }) {
    return /^[A-z]-\d{3,4}$/.test(params.sku)
  },
  asyncData ({ params }) {
    return { sku: params.sku }
  },
  async fetch ({ store }) {
    await store.dispatch({ type: `product/${product.FETCH_PRODUCT_LIST}` })
  },
  data () {
    return {
      visible: false,
      current: ''
    }
  },
  computed: {
    ...mapState('product', ['store']),
    data () {
      return this.store[this.sku]
    }
  },
  methods: {
    mf: moneyFormat,
    handleClick (i) {
      this.current = i
      this.visible = true
    }
  }
}
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
@import '../../../assets/style/decoration';
.detail-area {
  width: 900px;
  display: block;
  padding: 15px;
  margin: auto;
  .title {
    padding: 10px 0 20px;
    position: relative;
    margin-bottom: 15px;
    a {
      display: inline-block;
      font-size: 0.9rem;
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
  .introduce-value {
    overflow: hidden;
  }
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style-type: none;
  padding: 10px;
  li {
    width: 22%;
    border-radius: 5px;
    box-shadow: 1px 1px 4px 1px #999;
    overflow: hidden;
    margin-bottom: 10px;
  }
  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    outline: none;
    line-height: 1;
  }
  img {
    width: 100%;
    margin: 0;
    padding: 0;
    outline: none;
  }
}
</style>
