<template>
  <section class="container">
    <el-table :data="list" stripe class="pro-list-table"
              :default-sort="{prop: 'sku', order: 'ascending'}">
      <el-table-column type="index" width="30"></el-table-column>
      <el-table-column prop="sku" label="SKU" sortable width="100"></el-table-column>
      <el-table-column prop="cn" label="产品名"></el-table-column>
      <el-table-column prop="price" label="价格" sortable></el-table-column>
      <el-table-column prop="sales" label="销量" sortable></el-table-column>
      <el-table-column prop="cart" label="入车" sortable></el-table-column>
      <el-table-column prop="like" label="收藏" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <router-link class="list-link" :to="{ path: `/products/${scope.row.sku}` }">查看</router-link>
          <router-link class="list-link" :to="{ path: `/products/edit?sku=${scope.row.sku}` }">编辑</router-link>
          <el-button plain type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="品类"
        width="100"
        :filters="filter"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template scope="scope">
          <zh-tag :type="types[scope.row._type].c">
            {{types[scope.row._type].v}}
          </zh-tag>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
  import { Table, TableColumn, Button } from 'element-ui'
  import { mapState } from 'vuex'
  import { product } from '~/assets/lib/constant'
  import ZhTag from '~/components/common/ZhTag'
  export default {
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElButton: Button,
      ZhTag
    },
    data () {
      return {
        filter: [
          { text: '白酒', value: 1 },
          { text: '红酒', value: 2 },
          { text: '啤酒', value: 3 }
        ],
        types: {
          1: { v: '白酒', c: 'gray' },
          2: { v: '红酒', c: 'danger' },
          3: { v: '啤酒', c: 'warning' }
        }
      }
    },
    computed: {
      ...mapState('product', ['list'])
    },
    methods: {
      filterTag (value, row) {
        return row._type === value
      },
      handleClick (scope) {
        console.log(scope)
      }
    },
    async fetch ({ store }) {
      const res = await store.dispatch({ type: `product/${product.FETCH_PRODUCT_LIST}` })
      console.log(res)
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .pro-list-table {
    margin-left: auto;
    margin-right: auto;
    .el-table__header,
    .el-table__body {
      transition: width 100ms cubic-bezier(.06,.88,.53,1);
    }
    .el-table__body-wrapper {
      overflow: hidden;
    }
    .list-link {
      margin-right: 5px;
    }
  }
</style>
