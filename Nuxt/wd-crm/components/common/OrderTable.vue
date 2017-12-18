<template>
  <div>
    <order-search :os="os"></order-search>
    <el-table :data="currentList" class="order-list-table" stripe width="100%">
      <el-table-column type="index" fixed="left"></el-table-column>
      <el-table-column fixed="left" width="200" label="订单号" prop="orderNumber"></el-table-column>
      <el-table-column label="下单用户" prop="_ownerNick" min-width="120"></el-table-column>
      <el-table-column label="用户手机号码" width="150">
        <template scope="scope">
          {{scope.row._ownerPhone.replace(/(\d{3})\d+(\d{4})/, '$1****$2')}}
        </template>
      </el-table-column>
      <el-table-column label="下单日期" width="120">
        <template scope="scope">
          <span>{{df(scope.row.date)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品" min-width="250">
        <template scope="scope">
          <div class="pro-box">
            <p v-for="p in limitBy(scope.row.products, 3)" :key="p.sku">
              <router-link :to="{ path: `/products/${p.sku}` }">
                {{p.sku}}
                <span>{{p.cn}}</span>
              </router-link>
              <em>x {{p.count}}</em>
            </p>
            <p v-if="scope.row.products.length > 3">...</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" min-width="150">
        <template scope="scope">
          <span>{{scope.row.amount | currency('￥')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单运费" width="120">
        <template scope="scope">
          <span>{{scope.row.express | currency('￥')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="150" fixed="right" v-if="!os">
        <template scope="scope">
          {{status[scope.row.status]}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址信息" min-width="180">
        <template scope="scope">
          {{scope.row.address.province}}-{{scope.row.address.city}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" :width="os ? 200 : 100">
        <template scope="scope">
          <el-button type="primary" size="mini" @click="showDetail(scope.row)">查看详细</el-button>
          <el-button v-if="os === 1 && scope.row.status === 1" type="warning"
                     @click="deliverGoods(scope.row, scope.$index)"
                     size="mini">确认发货</el-button>
          <el-button v-if="os === 1 && scope.row.status === 2"
                     size="mini" type="success">已发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="sub-pager">
      <el-pagination layout="prev, pager, next"
                     :total="totalPages" :pageSize="1"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     style="display: inline-block;"></el-pagination>
    </div>
    <el-dialog :visible.sync="visible" title="订单详细" custom-class="order-custom">
      <order-dialog :datas="order" :df="df"></order-dialog>
    </el-dialog>
  </div>
</template>
<script>
  import { dateFormat } from '~/assets/lib/common-tools'
  import OrderDialog from '~/components/common/OrderDialog'
  import OrderSearch from './SearchOrder.vue'
  export default {
    props: ['currentList', 'totalPages', 'currentPage', 'os'],
    components: {
      OrderDialog,
      OrderSearch
    },
    data () {
      return {
        status: ['未支付', '已支付(待发货)', '已发货', '已完成', '已取消', '申请退款', '已退款', '退款失败'],
        visible: false,
        order: {}
      }
    },
    methods: {
      df: dateFormat,
      handleCurrentChange (v) {
        this.$emit('current-change', v)
      },
      showDetail (order) {
        this.order = order
        this.visible = true
      },
      deliverGoods ({ orderNumber }, index) {
        this.$emit('deliver-goods', { orderNumber, index })
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/decoration";
  .pro-box {
    padding: 5px;
    & > p {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      align-items: center;
      & > a {
        max-width: 90%;
        overflow: hidden;
        margin-right: 10px;
        span {
          margin-left: 10px;
          color: $font1color;
        }
      }
      & > em {
        color: $font2color;
        font-size: .8rem;
      }
    }
  }
  .sub-pager {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>
<style>
  .order-custom {
    min-width: 900px;
  }
</style>
