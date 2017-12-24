<template>
  <ul>
    <li v-for="p in datas" :key="p">
      <a href="javascript:;">
        <figure>
          <img src="/tiny.jpg" :alt="store[p].cn" :title="store[p].cn">
          <figcaption>{{p}}</figcaption>
        </figure>
      </a>
    </li>
  </ul>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    props: ['datas'],
    computed: {
      ...mapState('product', ['store'])
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    li {
      padding: 5px;
    }
    img {
      width: 75px;
    }
    figure {
      line-height: 1.2;
      overflow: hidden;
      border-radius: 3px;
      border: 1px solid #e8e9ec;
      padding-bottom: 3px;
    }
    figcaption {
      line-height: 1;
      text-align: center;
    }
  }
</style>
