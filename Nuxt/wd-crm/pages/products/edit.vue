<template>
  <section class="container">
    add product
  </section>
</template>
<script>
  export default {
    validate ({ query }) {
      return !query.sku || /^[A-z]-\d{3,4}$/.test(query.sku)
    },
    async asyncData ({ query }) {
      return { editing: !!query.sku }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  @media screen and (min-width: 768px) {

  }

  @media screen and (max-width: 767px) {

  }
</style>
