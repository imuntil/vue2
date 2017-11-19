<template>
  <section class="container">
    <div>
      <logo />
      about hello world
    </div>
  </section>
</template>
<script>
  import Logo from '~/components/Logo.vue'
  export default {
    components: {
      Logo
    },
    transition: 'test'
  }
</script>
<!--<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>-->
<style>
    @media screen and (min-width: 768px) {

    }

    @media screen and (max-width: 767px) {

    }
</style>
