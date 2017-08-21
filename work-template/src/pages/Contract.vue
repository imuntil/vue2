<template>
  <div class="main-wrapper">
    <j-header></j-header>
    <j-main>
      <div>Connection</div>
    </j-main>
    <j-footer></j-footer>
  </div>
</template>
<script>
  import JHeader from '@/components/Header.vue'
  import JFooter from '@/components/Footer.vue'
  import JMain from '@/components/Main.vue'
  export default {
    components: {
      JHeader,
      JFooter,
      JMain
    }
  }
</script>
