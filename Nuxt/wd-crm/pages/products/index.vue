<template>
  <section class="container product-index">
    <el-table :data="currentList" stripe class="pro-list-table"
              :default-sort="{prop: 'sku', order: 'ascending'}">
      <el-table-column type="index" width="30" fixed="left"></el-table-column>
      <el-table-column prop="sku" label="SKU" sortable width="100" fixed="left"></el-table-column>
      <el-table-column prop="cn" label="产品名" width="120">
        <template scope="scope">
          <el-tooltip effect="dark" content="111111" placement="top-left">
            <span slot="content">{{scope.row.cn}} <br>{{scope.row.en}}</span>
            <span :title="scope.row.cn">{{scope.row.cn}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable width="150">
        <template scope="scope">
          {{scope.row.price | currency('￥')}}
        </template>
      </el-table-column>
      <el-table-column label="是否打折" width="100">
        <template scope="scope">
          {{scope.row.setToSales === 0 ? '否' : '是'}}
        </template>
      </el-table-column>
      <el-table-column porp="truePrice" label="真实售价" sortable width="150">
        <template scope="scope">
          {{scope.row.truePrice | currency('￥')}}
        </template>
      </el-table-column>
      <el-table-column prop="sales" label="销量" sortable width="100"></el-table-column>
      <el-table-column prop="cart" label="入车" sortable width="100">
        <template scope="scope">
          {{scope.row.cart || 0}}
        </template>
      </el-table-column>
      <el-table-column prop="like" label="收藏" sortable width="100">
        <template scope="scope">
          {{scope.row.like || 0}}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" sortable width="100">
        <template scope="scope">
          <span :class="{'color--red': scope.row.stock < 10}">{{scope.row.stock}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template scope="scope">
          <router-link class="list-link" :to="{ path: `/products/${scope.row.sku}` }">查看</router-link>
          <router-link class="list-link" :to="{ path: `/products/${scope.row.sku}/edit` }">编辑</router-link>
          <el-button plain type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="品类"
        width="100"
        :filters="originTypes"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template scope="scope">
          <zh-tag :type="types[scope.row._type].c">
            {{types[scope.row._type].v}}
          </zh-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next"
                   class="text--right"
                   style="margin-top: 20px; padding-right: 0;"
                   :total="lists.length" :page-size="1"
                   @current-change="handlePageChange"
                   :current-page="currentPage"></el-pagination>
  </section>
</template>
<script>
  import { Table, TableColumn, Button, Pagination, Tooltip } from 'element-ui'
  import { mapState } from 'vuex'
  import { product } from '~/assets/lib/constant'
  import ZhTag from '~/components/common/ZhTag'
  export default {
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElButton: Button,
      ElPagination: Pagination,
      ElTooltip: Tooltip,
      ZhTag
    },
    data () {
      return {
        filter: [
          { text: '白酒', value: 1 },
          { text: '红酒', value: 2 },
          { text: '啤酒', value: 3 },
          { text: '葡萄酒', value: 4 }
        ],
        types: {
          1: { v: '白酒', c: 'gray' },
          2: { v: '红酒', c: 'danger' },
          3: { v: '啤酒', c: 'warning' },
          4: { v: '葡萄酒', c: 'success' }
        }
      }
    },
    computed: {
      ...mapState('product', ['lists', 'itemPerPage', 'currentPage', 'skuList', 'store']),
      ...mapState('config', ['originTypes']),
      currentList () {
        return this.lists.length ? this.lists[this.currentPage - 1].map(sku => this.store[sku]) : []
      }
    },
    methods: {
      filterTag (value, row) {
        return row._type === value
      },
      handleClick (scope) {
        console.log(scope)
      },
      handlePageChange (v) {
        this.$store.commit({
          type: `product/${product.UPDATE_PRO_LIST_PAGE}`,
          currentPage: v
        })
      }
    },
    async fetch ({ store }) {
      await store.dispatch({ type: `product/${product.FETCH_PRODUCT_LIST}` })
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .product-index {
    display: block;
  }
  .pro-list-table {
    margin-left: auto;
    margin-right: auto;
    .el-table__header,
    .el-table__body {
      transition: width 100ms cubic-bezier(.06,.88,.53,1);
    }
    /*.el-table__body-wrapper {*/
      /*overflow: hidden;*/
    /*}*/
    .list-link {
      margin-right: 5px;
    }
    .el-table__row .cell {
      white-space: nowrap;
    }
  }
</style>
