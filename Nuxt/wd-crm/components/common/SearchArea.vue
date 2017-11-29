<template>
  <el-input placeholder="输入SKU,关键字等检索" v-model="search">
    <el-select slot="prepend" v-model="field">
      <el-option label="-" value="0"></el-option>
      <el-option label="sku" value="1"></el-option>
      <el-option label="产品名" value="2"></el-option>
    </el-select>
    <el-button slot="append" icon="search"></el-button>
  </el-input>
</template>
<script>
  import {
    Form,
    FormItem,
    Button,
    Input,
    Select,
    Option
  } from 'element-ui'
  export default {
    components: {
      ElForm: Form,
      ElFormItem: FormItem,
      ElButton: Button,
      ElInput: Input,
      ElSelect: Select,
      ElOption: Option
    },
    data () {
      return {
        search: '',
        field: 0
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

</style>
