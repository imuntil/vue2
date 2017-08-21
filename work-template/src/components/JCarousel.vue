<template>
  <div>
    <carousel indicator-position="inside">
      <carousel-item v-for="item in 4" :key="item">
        <h3 class="carousel-item-h3">{{item}}</h3>
      </carousel-item>
    </carousel>
  </div>
</template>
<script>
  import { Carousel, CarouselItem } from 'element-ui'
  export default {
    components: {
      Carousel,
      CarouselItem
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>

</style>
<style type="text/scss">
  .carousel-item-h3 {
    background-color: #eeeeee;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
