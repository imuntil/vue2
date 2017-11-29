<template>
  <el-autocomplete v-model="search" :trigger-on-focus="false"
                   custom-item="candidate" placeholder="输入SKU或产品名"
                   @select="handleSelect" @keyup.native.enter="handleEnter"
                   :fetch-suggestions="querySearch">
    <el-button slot="append" icon="search" @click="handleClick"></el-button>
  </el-autocomplete>
</template>
<script>
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import {
    Button,
    Autocomplete
  } from 'element-ui'
  Vue.component('candidate', {
    functional: true,
    render (h, ctx) {
      const item = ctx.props.item
      const _class = ctx.data.class
      return h('li', { ...ctx.data, class: { ..._class, candidate: true } }, [
        h('div', { attrs: { class: 'candidate-sku' } }, [item.sku]),
        h('span', { attrs: { class: 'candidate-cn' } }, [`${item.cn} | ${item.en}`])
      ])
    },
    props: {
      item: { type: Object, required: true }
    }
  })
  export default {
    components: {
      ElButton: Button,
      ElAutocomplete: Autocomplete
    },
    data () {
      return {
        search: '',
        options: [
          { label: '-', value: 0 },
          { label: 'sku', value: 1 },
          { label: '产品名', value: 2 }
        ]
      }
    },
    computed: {
      ...mapState('product', ['skuList', 'store']),
      products () {
        return Object.values(this.store)
      }
    },
    methods: {
      querySearch (queryString, cb) {
        cb(this.filterResult(queryString))
      },
      createFilter (queryString) {
        const filed = this.field(queryString)
        return pro => {
          return pro[filed].indexOf(filed === 'sku' ? queryString.toUpperCase() : queryString) >= 0
        }
      },
      filterResult (queryString) {
        const pros = this.products
        return queryString ? pros.filter(this.createFilter(queryString)) : pros
      },
      field (queryString) {
        if (/[\u4e00-\u9fa5]/.test(queryString)) return 'cn'
        else if (/^[A-z]{1}-?|\d+$/.test(queryString)) return 'sku'
        return 'en'
      },
      filterProducts () {
        console.log(this.filterResult(this.search))
      },
      handleSelect (v) {
        this.$router.push(`/products/${v.sku}`)
      },
      handleClick () {
        this.filterProducts()
      },
      handleEnter () {
        this.filterProducts()
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  @import "../../assets/style/decoration";
  .el-autocomplete .el-input__inner {
    width: 300px;
  }
  .candidate {
    text-align: right;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
    line-height: 1.5 !important;
    .candidate-sku {
      width: 100%;
      text-align: left;
      line-height: 1.2;
    }
    .candidate-cn {
      width: 90%;
      text-align: right;
      font-size: .8rem;
      display: inline-block;
      color: $font3color;
      overflow: hidden;
      line-height: 1;
    }
  }
  .candidate:not(:last-child) {
    border-bottom: 1px solid $bb2color;
  }
</style>
