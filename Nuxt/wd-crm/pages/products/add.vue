<template>
  <section class="container product-add">
    <detail-form :editing="false" :clone-form="form"></detail-form>
  </section>
</template>
<script>
  import DetailForm from '~/components/common/DetailForm'
  export default {
    components: {
      DetailForm
    },
    data () {
      return {
        form: {}
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .product-edit {
    display: block;
  }
  .edit-form {
    width: 900px;
    display: block;
    padding: 15px;
    margin: auto;
    position: relative;
  }
</style>
<style type="text/scss" lang="scss">
  @import "../../assets/style/decoration";
  .sp-form-item .el-form-item__content {
    display: flex;
    justify-content: flex-start;
    p.sp-off {
      display: inline-block;
      margin-left: 15px;
      font-size: 1.1rem;
      span {
        color: $dangerColor;
        font-weight: 600;
      }
    }
  }
  .ql-picker-label::before {
    vertical-align: top;
  }
  .ql-picker-label > svg {
    vertical-align: top;
  }
</style>

