<template>
  <section class="container product-add">
    <detail-form :editing="false" :clone-form="form" @on-save="save" @on-cancel="cancel"></detail-form>
  </section>
</template>
<script>
  import DetailForm from '~/components/common/DetailForm'
  import { mapActions } from 'vuex'
  import { product, config } from '~/assets/lib/constant'

  export default {
    async fetch ({ store }) {
      await store.dispatch({ type: `config/${config.FETCH_CONFIG}` })
    },
    components: {
      DetailForm
    },
    data () {
      return {
        form: {
          setToSales: 0,
          discounted: 0,
          off: 0.01,
          _type: '',
          origin: ''
        }
      }
    },
    methods: {
      ...mapActions('product', {
        addNewPro: product.ADD_PRO_A
      }),
      async save (form) {
        const { ok, err, fail } = await this.addNewPro({ body: form })
        if (ok) {
          this.$message({ message: '提交成功', type: 'success' })
          this.$router.push('/products')
        } else {
          this.$message({ message: err ? '提交失败' : fail.message, type: 'error' })
        }
      },
      cancel () {
        this.$router.go(-1)
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

