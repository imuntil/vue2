<template>
  <section class="container coupon-index">
    <div>
      <coupon v-for="i in idList" :key="i" :datas="store[i]" @detail="viewDetail"></coupon>
    </div>
    <el-dialog :visible.sync="visible" custom-class="form-dialog">
      <el-form :model="form">
        <el-form-item label="ID:" label-width="150px">
          <p class="just-view">{{form.kid}}</p>
        </el-form-item>
        <el-form-item label="可用时间:" label-width="150px">
          <p v-if="editing"></p>
          <p v-else class="just-view">
            {{form.start | dtf}} —— {{form.end | dtf}}
          </p>
        </el-form-item>
        <el-form-item label="使用条件:" label-width="150px" v-if="form.method">
          <p v-if="editing">
            满 <el-input-number v-model="form.method.achieve" style="width: 150px;" :controls="false"></el-input-number>
            减 <el-input-number v-model="form.method.cut" style="width: 150px;" :controls="false"></el-input-number>
          </p>
          <p v-else class="just-view">满{{form.method.achieve}}减{{form.method.cut}}</p>
        </el-form-item>
        <el-form-item label="适用产品:" label-width="150px">

        </el-form-item>
        <el-form-item label="余量:" label-width="150px">
          <p v-if="editing">
            <el-input-number v-model="form.count" :controls="false"></el-input-number>
          </p>
          <p v-else class="just-view">{{form.count}}</p>
        </el-form-item>
        <el-form-item label="创建时间:" label-width="150px">
          <p class="just-view">{{form.created | dtf}}</p>
        </el-form-item>
        <el-form-item label="名称:" label-width="150px">
          <p v-if="editing">
            <el-input v-model="form.name" style="width: 400px;"></el-input>
          </p>
          <p v-else class="just-view">{{form.name}}</p>
        </el-form-item>
        <el-form-item label="相关描述:" label-width="150px">
          <p v-if="editing">
            <el-input type="textarea" :row="2" v-model="form.detail" style="width: 400px;"></el-input>
          </p>
          <p v-else class="just-view">{{form.detail}}</p>
        </el-form-item>
        <el-form-item class="text--center">
          <el-button>确定</el-button>
          <el-button type="primary" v-if="!editing" @click="editing = true">编辑</el-button>
          <el-button type="info" v-if="editing" @click="editing = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
  import Coupon from '~/components/common/Coupon'
  import { coupon } from '~/assets/lib/constant'
  import { mapState } from 'vuex'
  export default {
    components: {
      Coupon
    },
    async fetch ({ store }) {
      await store.dispatch({ type: `coupon/${coupon.FETCH_COUPON_LIST}` })
    },
    data () {
      return {
        form: {},
        visible: false,
        editing: false
      }
    },
    computed: {
      ...mapState('coupon', ['idList', 'store'])
    },
    methods: {
      viewDetail (kid) {
        this.form = { ...this.store[kid] }
        this.visible = true
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .coupon-index {
      display: block;
      padding-top: 25px;
    }
  .just-view {
    width: 400px;
    border-bottom: 1px solid #edeef1;
  }
</style>
<style>
  .form-dialog .el-dialog__body {
    padding: 30px 50px;
  }
</style>
