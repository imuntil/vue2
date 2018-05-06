<template>
  <drag-cmp :critical="0.4">
    <div slot="page-1">p1</div>
    <div slot="page-2">p2</div>
  </drag-cmp>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import DragCmpTs from '../components/DragCmp/DragCmpTs.vue'
  import DragCmp from '../components/DragCmp/DragCmp.vue'
  @Component({
    components: { DragCmpTs, DragCmp }
  })
  export default class DragPage extends Vue {
    name: 'drag-page'
  }
</script>

<style lang="scss">

</style>
