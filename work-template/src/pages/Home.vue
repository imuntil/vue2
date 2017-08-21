<template>
  <div>
    <j-header></j-header>
    <j-main>
      <j-carousel></j-carousel>
      <products></products>
      <about></about>
      <news></news>
    </j-main>
    <j-footer></j-footer>
  </div>
</template>
<script>
  import JHeader from '@/components/Header.vue'
  import JCarousel from '@/components/JCarousel.vue'
  import Products from '@/components/Products.vue'
  import About from '@/components/About.vue'
  import News from '@/components/News.vue'
  import JFooter from '@/components/Footer.vue'
  import JMain from '@/components/Main.vue'
  export default {
    components: {
      JHeader,
      JCarousel,
      Products,
      About,
      News,
      JFooter,
      JMain
    }
  }
</script>

