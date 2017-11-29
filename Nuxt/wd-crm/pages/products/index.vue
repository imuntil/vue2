<template>
  <section class="container product-index">
    <div class="search-area">
      <search-area></search-area>
    </div>
    <el-table :data="currentList" stripe class="pro-list-table" width="100%"
              :default-sort="{prop: 'sku', order: 'ascending'}">
      <el-table-column type="index"  fixed="left"></el-table-column>
      <el-table-column prop="sku" label="SKU" sortable  fixed="left" width="120"></el-table-column>
      <el-table-column prop="cn" label="产品名" width="200">
        <template scope="scope">
          <span :title="`${scope.row.cn}——${scope.row.en}`">{{scope.row.cn}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable width="150">
        <template scope="scope">
          {{scope.row.price | currency('￥')}}
        </template>
      </el-table-column>
      <el-table-column label="是否打折" >
        <template scope="scope">
          {{scope.row.setToSales === 0 ? '否' : '是'}}
        </template>
      </el-table-column>
      <el-table-column porp="truePrice" label="真实售价" sortable width="150">
        <template scope="scope">
          {{scope.row.truePrice | currency('￥')}}
        </template>
      </el-table-column>
      <el-table-column prop="sales" label="销量" sortable ></el-table-column>
      <el-table-column prop="cart" label="入车" sortable >
        <template scope="scope">
          {{scope.row.cart || 0}}
        </template>
      </el-table-column>
      <el-table-column prop="like" label="收藏" sortable >
        <template scope="scope">
          {{scope.row.like || 0}}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" sortable >
        <template scope="scope">
          <span :class="{'color--red': scope.row.stock < 10}">{{scope.row.stock}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template scope="scope">
          <router-link class="list-link" :to="{ path: `/products/${scope.row.sku}` }">查看</router-link>
          <router-link class="list-link" :to="{ path: `/products/${scope.row.sku}/edit` }">编辑</router-link>
          <el-button plain type="danger" size="mini" @click="deleteRequest(scope.row.sku)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="品类"

        :filters="originTypes"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template scope="scope">
          <zh-tag :type="types[scope.row._type].color">
            {{types[scope.row._type].text}}
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
  /* eslint-disable no-unused-vars */
  import { product, config, breads } from '~/assets/lib/constant'
  import ZhTag from '~/components/common/ZhTag'
  import SearchArea from '~/components/common/SearchArea'
  export default {
    async fetch ({ store }) {
      store.commit({ type: `bc/${breads.UPDATE_BREADS}`, bread: 'proList' })
      await store.dispatch({ type: `config/${config.FETCH_CONFIG}` })
      await store.dispatch({ type: `product/${product.FETCH_PRODUCT_LIST}` })
    },
    components: {
      ElTable: Table,
      ElTableColumn: TableColumn,
      ElButton: Button,
      ElPagination: Pagination,
      ElTooltip: Tooltip,
      ZhTag,
      SearchArea
    },
    computed: {
      ...mapState('product', ['lists', 'itemPerPage', 'currentPage', 'skuList', 'store']),
      ...mapState('config', ['originTypes', 'types']),
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
      },
      async deleteRequest (sku) {
        const res = await this.$confirm('确认删除该商品么,此操作不可撤销', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => false)
        if (!res) {
          this.$message({ type: 'info', message: '已取消删除' })
          return false
        }
        const re = await this.$store.dispatch({ type: `product/${product.DELETE_PRODUCT_A}`, sku })
        console.log(re)
        if (!re) {
          this.$message({ type: 'warning', message: '删除失败' })
        } else {
          this.$message({ type: 'success', message: '删除完成' })
        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .product-index {
    display: block;
    padding-top: 25px;
    .search-area {
      width: 400px;
      margin-bottom: 25px;
    }
  }
  .pro-list-table {
    margin-left: auto;
    margin-right: auto;
    .el-table__header,
    .el-table__body {
      transition: width 100ms cubic-bezier(.06,.88,.53,1);
    }
    .list-link {
      margin-right: 5px;
    }
    .el-table__row .cell {
      white-space: nowrap;
    }
  }
</style>
