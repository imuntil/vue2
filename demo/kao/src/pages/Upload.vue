<template>
  <div class="container">
  <router-link to="/vote">to vote</router-link>    
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class Upload extends Vue {
  name: 'upload'
}
</script>

<style lang="scss" scoped>

</style>
