<template>
  <div class="search-area">
    <el-autocomplete v-model="search" :trigger-on-focus="false"
                     icon="circle-close" :on-icon-click="handleIconClick"
                     custom-item="candidate" placeholder="输入SKU或产品名"
                     @select="handleSelect" @keyup.native.enter="handleEnter"
                     @keyup.native.delete="handleDelete"
                     :props="{ value: field, label: field }"
                     :fetch-suggestions="querySearch">
      <el-button slot="append" icon="search" @click="handleClick"></el-button>
    </el-autocomplete>
    <el-button type="primary" style="margin-left: 20px;" @click="handleIconClick">重置</el-button>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import { product } from '~/assets/lib/constant'
  import Vue from 'vue'
  Vue.component('candidate', {
    functional: true,
    render (h, ctx) {
      const item = ctx.props.item
      const _class = ctx.data.class
      return h('li', { ...ctx.data, class: { ..._class, candidate: true } }, [
        h('div', { attrs: { class: 'candidate-body' } }, [item.sku]),
        h('span', { attrs: { class: 'candidate-footer' } }, [`${item.cn} | ${item.en}`])
      ])
    },
    props: {
      item: { type: Object, required: true }
    }
  })
  export default {
    data () {
      return {
//        search: '',
        field: ''
      }
    },
    computed: {
      ...mapState('product', ['skuList', 'store']),
      products () {
        return Object.values(this.store)
      },
      search: {
        get () {
          return this.$store.state.product.search
        },
        set (v) {
          this.setSearch(v)
        }
      }
    },
    methods: {
      ...mapMutations('product', {
        saveFilterProducts: product.SAVE_FILTER_RESULTS,
        setSearch: product.SET_SEARCH
      }),
      querySearch (queryString, cb) {
        cb(this.filterResult(queryString))
      },
      createFilter (queryString) {
        const field = this.getField(queryString)
        this.field = field
        return pro => {
          return pro[field].indexOf(field === 'sku' ? queryString.toUpperCase() : queryString) >= 0
        }
      },
      filterResult (queryString) {
        const pros = this.products
        return queryString ? pros.filter(this.createFilter(queryString)) : pros
      },
      getField (queryString) {
        if (/[\u4e00-\u9fa5]/.test(queryString)) return 'cn'
        else if (/^[A-z]{1}-?$|^\d+$/.test(queryString)) return 'sku'
        return 'en'
      },
      filterProducts () {
        const lists = this.search.trim()
          ? this.filterResult(this.search.trim()).map(i => i.sku)
          : [...this.skuList]
        this.saveFilterProducts({ lists })
      },
      handleSelect (v) {
        this.$router.push(`/products/${v.sku}`)
      },
      handleClick () {
        this.filterProducts()
      },
      handleEnter () {
        this.filterProducts()
      },
      handleDelete () {
        if (this.search === '') {
          this.filterProducts()
        }
      },
      handleIconClick () {
        this.search = ''
        this.filterProducts()
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">

</style>
