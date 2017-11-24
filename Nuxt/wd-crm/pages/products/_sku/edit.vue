<template>
  <section class="container product-edit">
    <el-form class="edit-form" label-width="80px">
      <el-form-item label="SKU">
        <el-input disabled v-model="form.sku"></el-input>
      </el-form-item>
      <el-form-item label="品类">
        <!--<el-select v-model=""></el-select>-->
      </el-form-item>
      <el-form-item label="中文名">
        <el-input v-model="form.cn"></el-input>
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="form.en"></el-input>
      </el-form-item>
      <el-form-item label="图片"></el-form-item>
      <el-form-item label="价格">

      </el-form-item>
      <el-form-item label="是否打折"></el-form-item>
      <el-form-item label="打折方式"></el-form-item>
      <el-form-item label="真实售价"></el-form-item>
      <el-form-item label="酒精度"></el-form-item>
      <el-form-item label="净含量"></el-form-item>
      <el-form-item label="重量"></el-form-item>
      <el-form-item label="产地"></el-form-item>
      <el-form-item label="销量"></el-form-item>
      <el-form-item label="收藏数"></el-form-item>
      <el-form-item label="入车数"></el-form-item>
      <el-form-item label="库存"></el-form-item>
      <el-form-item label="添加日期"></el-form-item>
      <el-form-item label="上次更新"></el-form-item>
      <el-form-item label="产品介绍"></el-form-item>
    </el-form>
  </section>
</template>
<script>
  import {
    Form,
    Input,
    InputNumber,
    FormItem,
    Switch,
    Radio,
    Slider,
    Upload,
    Select
  } from 'element-ui'
  import { fetchProDetail } from '~/assets/lib/api'
  export default {
    validate ({ params }) {
      return !params.sku || /^[A-z]-\d{3,4}$/.test(params.sku)
    },
    async asyncData ({ params, query }) {
      const { err, fail, data } = await fetchProDetail({ sku: params.sku })
      if (err || fail) throw new Error(err || fail)
      return { form: data.data, editing: ~~query.status === 1 }
    },
    components: {
      ElForm: Form,
      ElInput: Input,
      ElInputNumber: InputNumber,
      ElSwitch: Switch,
      ElRadio: Radio,
      ElSlider: Slider,
      ElUpload: Upload,
      ElFormItem: FormItem,
      ElSelect: Select
    },
    data () {
      return {
        form: {},
        types: [
          { label: '', value: '' }
        ]
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .product-edit {
    display: block;
  }
  .edit-form {
    width: 700px;
    display: block;
    padding: 15px;
    margin: auto;
  }
</style>
