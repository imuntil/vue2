<template>
  <section class="container oder-to-send">
    <order-table :current-list="currentList"
                 :current-page="currentPage"
                 @current-change="handleCurrentChange"
                 @deliver-goods="handleDeliverGoods"
                 :os="1"
                 :total-pages="totalPages"></order-table>
  </section>
</template>
<script>
  import OrderTable from '~/components/common/OrderTable'
  import { deliverGoods } from '~/assets/lib/api'
  import { order } from '~/assets/lib/constant'
  import { mapActions, mapState, mapMutations } from 'vuex'
  export default {
    async fetch ({ store }) {
      store.dispatch({ type: `order/${order.FETCH_ORDER_LIST}`, status: 1, page: 1 })
    },
    components: {
      OrderTable
    },
    computed: {
      ...mapState('order', ['count', 'totalPages', 'currentPage', 'currentList'])
    },
    methods: {
      ...mapActions('order', {
        fetchOrderList: order.FETCH_ORDER_LIST
      }),
      ...mapMutations('order', {
        updateOrderList: order.UPDATE_ORDER_LIST
      }),
      handleCurrentChange (v) {
        this.fetchOrderList({ page: v, status: 1 })
      },
      async handleDeliverGoods ({ orderNumber, index }) {
        const { err, fail } = await deliverGoods({ orderNumber })
        if (err) {
          this.$message({ type: 'error', message: '操作失败' })
          return false
        }
        if (fail) {
          this.$message({ type: 'warning', message: fail.message })
          return false
        }
        this.$message({ type: 'success', message: '操作成功' })
        this.updateOrderList({ index })
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .oder-to-send {
    display: block;
    padding-top: 25px;
  }
</style>
