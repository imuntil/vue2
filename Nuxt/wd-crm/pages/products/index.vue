<template>
  <section class="container product-index">
    <search-area></search-area>
    <!--<a-i></a-i>-->
    <!--<a-i w="1"></a-i>-->
    <!--<a-i w="2"></a-i>-->
    <!--<a-i w="3"></a-i>-->
    <el-table :data="currentList" stripe class="pro-list-table" width="100%">
      <el-table-column type="index"  fixed="left"></el-table-column>
      <el-table-column label="SKU" :sortable="true"
                       :sort-method="skuSort"
                       fixed="left" width="120">
        <template scope="scope">
          <p class="icons-box">
            <span class="word">{{scope.row.sku}}</span>
            <a-i v-if="scope.row.hot"></a-i>
            <a-i v-if="scope.row.recommend" w="1"></a-i>
            <a-i v-if="scope.row.onFS" w="2"></a-i>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="cn" label="产品名" width="200">
        <template scope="scope">
          <span :title="`${scope.row.cn}——${scope.row.en}`">{{scope.row.cn}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" sortable min-width="150">
        <template scope="scope">
          {{scope.row.price | currency('￥')}}
        </template>
      </el-table-column>
      <el-table-column label="是否打折" min-width="100">
        <template scope="scope">
          {{scope.row.setToSales === 0 ? '否' : '是'}}
        </template>
      </el-table-column>
      <el-table-column porp="truePrice" label="真实售价" sortable width="150">
        <template scope="scope">
          {{scope.row.truePrice | currency('￥')}}
        </template>
      </el-table-column>
      <el-table-column prop="sales" label="销量" sortable min-width="100"></el-table-column>
      <el-table-column prop="cart" label="入车" sortable min-width="100">
        <template scope="scope">
          {{scope.row.cart || 0}}
        </template>
      </el-table-column>
      <el-table-column prop="like" label="收藏" sortable min-width="100">
        <template scope="scope">
          {{scope.row.like || 0}}
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" sortable min-width="100">
        <template scope="scope">
          <span :class="{'color--red': scope.row.stock < 10}">{{scope.row.stock}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template scope="scope">
          <div class="op-wrapper" :class="{'more-op': index === scope.$index}">
            <div class="op-container">
              <p>
                <router-link class="list-link" :to="{ path: `/products/${scope.row.sku}` }">查看</router-link>
                <router-link class="list-link" :to="{ path: `/products/${scope.row.sku}/edit` }">编辑</router-link>
                <el-button plain type="danger" size="mini" @click="deleteRequest(scope.row.sku)">删除</el-button>
                <el-button plain type="info" size="mini" icon="arrow-right" @click="handleClick(scope.$index)"></el-button>
              </p>
              <p>
                <el-button plain type="info" size="mini" icon="arrow-left" @click="handleClick(-1)"></el-button>
                <el-button v-if="!scope.row.hot" type="success" size="mini" @click="set2Hot(scope.row.sku)">设为热销</el-button>
                <el-button v-else type="warning" size="mini" @click="set2Hot(scope.row.sku, false)">取消热销</el-button>
                <el-button v-if="!scope.row.recommend" type="danger" size="mini" @click="set2Recommend(scope.row.sku)">设为推荐</el-button>
                <el-button v-else type="warning" size="mini" @click="set2Recommend(scope.row.sku, false)">取消推荐</el-button>
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="100"
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
    <div class="sub-pager">
      <el-pagination layout="prev, pager, next"
                     style="display: inline-block; padding-right: 20px;"
                     :total="lists.length" :page-size="1"
                     @current-change="handlePageChange"
                     :current-page="currentPage"></el-pagination>
      <el-button type="primary" size="small" @click="viewInOne">
        {{ onePage ? '分页显示' : '在一页中显示全部' }}
      </el-button>
    </div>
  </section>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  /* eslint-disable no-unused-vars */
  import { product, config } from '~/assets/lib/constant'
  import ZhTag from '~/components/common/ZhTag'
  import SearchArea from '~/components/common/SearchArea'
  import ActivityIcon from '~/components/common/ActivityIcon'

  export default {
    async fetch ({ store, req, isServer }) {
      await Promise.all([
        store.dispatch({ type: `config/${config.FETCH_CONFIG}` }),
        store.dispatch({ type: `product/${product.FETCH_PRODUCT_LIST}` })
      ])
    },
    components: {
      ZhTag,
      SearchArea,
      AI: ActivityIcon
    },
    data () {
      return {
        index: -1
      }
    },
    computed: {
      ...mapState('product', [
        'lists', 'itemPerPage', 'currentPage', 'skuList', 'store', 'onePage'
      ]),
      ...mapState('config', ['originTypes', 'types']),
      currentList () {
        return this.lists.length ? this.lists[this.currentPage - 1].map(sku => this.store[sku]) : []
      }
    },
    methods: {
      ...mapMutations('product', {
        changeItemPerPage: product.CHANGE_ITEM_PER_PAGE
      }),
      ...mapActions('product', {
        modifyProDetail: product.MODIFY_PRO_DETAIL_A
      }),
      filterTag (value, row) {
        return row._type === value
      },
      handleClick (i) {
        this.index = i
      },
      skuSort (a, b) {
        return +(+a.sku.replace(/[A-z]{1}-0+/, '') > +b.sku.replace(/[A-z]{1}-0+/, ''))
      },
      // 翻页
      handlePageChange (v) {
        this.$store.commit({
          type: `product/${product.UPDATE_PRO_LIST_PAGE}`,
          currentPage: v
        })
      },
      // 单页/多页切换
      viewInOne () {
        this.changeItemPerPage()
      },
      // 请求删除条目
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
      },
      async set2Hot (sku, set = true) {
        console.log(sku)
        const { ok, err, fail } = await this.modifyProDetail({ body: { hot: set, sku }, sku })
        console.log(ok)
      },
      async set2Recommend (sku, set = true) {
        const { ok, err, fail } = await this.modifyProDetail({ body: { recommend: set, sku }, sku })
        console.log(ok)
      }
    },
    created () {
//      this.$store.dispatch({ type: `product/${product.FETCH_PRODUCT_LIST}` })
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .product-index {
    display: block;
    padding-top: 25px;
    .sub-pager {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
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
    .op-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      .op-container {
        width: 200%;
        display: flex;
        transition: transform .5s;
        p {
          width: 50%;
          padding-left: 5px;
        }
      }
    }
    .op-wrapper.more-op .op-container {
      transform: translate(-50%, 0);
    }
    .icons-box {
      position: relative;
      & > span:not(.word) {
        position: absolute;
      }
      & > span:nth-child(2) {
        left: 0;
      }
      & > span:nth-child(3) {
        left: 30px;
      }
      & > span:nth-child(4) {
        left: 60px;
      }
    }
  }
</style>
