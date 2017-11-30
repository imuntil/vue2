<template>
  <section class="container product-edit">
    <detail-form :editing="true" :clone-form="form"
                 :sku="sku" @on-save="save" @on-cancel="cancel"></detail-form>
  </section>
</template>
<script>
  import DetailForm from '~/components/common/DetailForm'
  import { mapState, mapActions } from 'vuex'
  import { product, config } from '~/assets/lib/constant'

  export default {
    validate ({ params }) {
      return !params.sku || /^[A-z]-\d{3,4}$/.test(params.sku)
    },
    asyncData ({ params }) {
      return { sku: params.sku }
    },
    async fetch ({ store }) {
      await store.dispatch({ type: `config/${config.FETCH_CONFIG}` })
      await store.dispatch({ type: `product/${product.FETCH_PRODUCT_LIST}` })
    },
    components: {
      DetailForm
    },
    computed: {
      ...mapState('product', ['store']),
      form () {
        return this.store[this.sku]
      }
    },
    methods: {
      ...mapActions('product', {
        modifyProDetail: product.MODIFY_PRO_DETAIL_A
      }),
      async save (form) {
        const { ok, err, fail } = await this.modifyProDetail({ body: form, sku: this.sku })
        if (ok) {
          this.$message({ message: '提交成功', type: 'success' })
          this.$router.push('/products')
        } else {
          this.$message({ message: err ? '提交失败' : fail.message, type: 'error' })
        }
      },
      cancel () {
        console.log('cancel')
        this.$router.back()
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
  @import "../../../assets/style/decoration";
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
