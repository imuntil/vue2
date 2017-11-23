<template>
  <section class="container">
    product detail
  </section>
</template>
<script>
  import { fetchProDetail } from '~/assets/lib/api'

  export default {
    validate ({ params }) {
      return /^[A-z]-\d{3,4}$/.test(params.sku)
    },
    async asyncData ({ params }) {
      const { err, fail, data } = await fetchProDetail({ sku: params.sku })
      if (err || fail) throw new Error(err || fail)
      return { data: data.data }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  @media screen and (min-width: 768px) {

  }

  @media screen and (max-width: 767px) {

  }
</style>
