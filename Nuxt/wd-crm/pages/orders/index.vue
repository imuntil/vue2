<template>
  <section class="container order-index">
    <order-table :current-list="currentList"
                 :current-page="currentPage"
                 @current-change="handleCurrentChange"
                 :total-pages="totalPages"></order-table>
  </section>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import { order } from '~/assets/lib/constant'
  import OrderTable from '~/components/common/OrderTable'
  export default {
    async fetch ({ store, isServer, req }) {
      await store.dispatch({ type: `order/${order.FETCH_ORDER_LIST}`, page: 1 })
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
      handleCurrentChange (v) {
        this.fetchOrderList({ page: v })
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .order-index {
    display: block;
    padding-top: 25px;
  }
</style>
