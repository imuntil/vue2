<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{count}}</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  computed: {
    ...mapState('count', ['count'])
  },
  methods: {
    ...mapMutations('count', ['increase'])
  },
  created () {
    this.increase({ count: 1 })
  }
};
</script>
