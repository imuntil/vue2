<template>
  <section class="container">
    hello world
    <p>{{vv}}</p>
  </section>
</template>

<script>
// import axios from 'axios'
const delay = time => new Promise(resolve => setTimeout(resolve, time));
export default {
  data() {
    return {
      vv: '',
    };
  },
  async created() {
    await delay(1000);
    this.vv = Math.random();
  },
};
</script>

<style scoped>
</style>
