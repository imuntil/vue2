<template>
  <section class="container user-index">

  </section>
</template>
<script>
  import { user } from '~/assets/lib/constant'
  export default {
    async fetch ({ store }) {
      store.dispatch({ type: `user/${user.FETCH_USER_LIST}` })
    },
    created () {
//      this.$store.dispatch({ type: `user/${user.FETCH_USER_LIST}` })
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
</style>
