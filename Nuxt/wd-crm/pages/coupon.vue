<template>
  <section class="container coupon-index">
    <coupon></coupon>
    <coupon></coupon>
    <coupon></coupon>
  </section>
</template>
<script>
  import Coupon from '~/components/common/Coupon'
  export default {
    components: {
      Coupon
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .coupon-index {
      display: block;
      padding-top: 25px;
    }
</style>
