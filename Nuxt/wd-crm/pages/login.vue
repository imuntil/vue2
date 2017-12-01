<template>
  <section class="container">
    <el-card class="login-box">
      <h2 class="text--center">WD CRM System</h2>
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="账号:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" :loading="loading">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>
<script>
//  import { Card, Form, FormItem, Input, Button } from 'element-ui'
  /* eslint-disable no-unused-vars */
  import { delay } from '~/assets/lib/common-tools'
  import { login } from '~/assets/lib/api'
  export default {
    layout: 'login',
//    transition: 'page',
//    components: {
//      Card, ElForm: Form, ElFormItem: FormItem, ElInput: Input, ElButton: Button
//    },
    data () {
      return {
        form: { name: '', password: '' },
        loading: false
      }
    },
    methods: {
      async submitForm () {
        this.loading = true
        const { data, fail } = await login({ account: this.form.name, password: this.form.password })
        await delay(200)
        this.loading = false
        if (data) {
          this.$message({ type: 'success', message: '登录成功' })
        } else {
          this.$message({ type: 'error', message: (fail && fail.message) || '登录失败' })
          return false
        }
        this.$router.push('/')
      },
      resetForm () {
        // x
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
/*  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }*/
  .login-box {
    /*width: 480px;*/
    padding: 40px 50px 0;
    h2 {
      margin-bottom: 30px;
    }
  }
</style>
