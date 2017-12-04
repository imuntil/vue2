<template>
  <section class="container oder-to-send">
    <order-table :current-list="currentList"
                 :current-page="currentPage"
                 @current-change="handleCurrentChange"
                 :os="1"
                 :total-pages="totalPages"></order-table>
  </section>
</template>
<script>
  import OrderTable from '~/components/common/OrderTable'
  import { fetchOrderList } from '~/assets/lib/api'
  const f = async function (page = 1) {
    const { err, data, fail } = await fetchOrderList({ status: 1, size: 20, page })
    if (err || fail) return { currentList: [] }
    const { total, count, orders, current } = data.data
    return { currentList: orders, currentPage: ~~current, totalPages: total, count }
  }
  export default {
    async asyncData () {
      const res = await f()
      return res
    },
    components: {
      OrderTable
    },
    data () {
      return {
        currentList: [],
        currentPage: 1,
        count: 0,
        totalPages: 0
      }
    },
    methods: {
      async handleCurrentChange (v) {
        const { currentList, currentPage, count, totalPages } = await f(v)
        this.currentList = currentList
        this.currentPage = currentPage
        this.count = count
        this.totalPages = totalPages
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
