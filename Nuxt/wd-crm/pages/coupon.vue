<template>
  <section class="container coupon-index">
    <div class="top-bar">
      <el-button type="primary" @click="handleAddCouponClick" size="small">添加优惠券</el-button>
    </div>
    <div>
      <coupon v-for="i in idList" :key="i" :datas="store[i]" @detail="viewDetail"></coupon>
    </div>
    <el-dialog :visible.sync="visible" custom-class="form-dialog">
      <el-form :model="form">
        <el-form-item label="ID:" label-width="150px" v-if="!adding">
          <p class="just-view">{{form.kid}}</p>
        </el-form-item>
        <el-form-item label="可用时间:" label-width="150px">
          <p v-if="editing || adding">
            <el-date-picker :editable="false" type="datetimerange" :clearable="false" v-model="range"></el-date-picker>
          </p>
          <p v-else class="just-view">
            {{form.start | dtf}} —— {{form.end | dtf}}
          </p>
        </el-form-item>
        <el-form-item label="使用条件:" label-width="150px" v-if="form.method || editForm.method">
          <p v-if="editing || adding">
            满
            <el-input-number v-model="editForm.method.achieve" style="width: 150px;" :controls="false"></el-input-number>
            减
            <el-input-number v-model="editForm.method.cut" style="width: 150px;" :controls="false"></el-input-number>
          </p>
          <p v-if="!editing && form.method && form.method.cut" class="just-view">满{{form.method.achieve}}减{{form.method.cut}}</p>
        </el-form-item>
        <el-form-item label="适用产品:" label-width="150px">
          <p v-if="editing || adding" class="text--right">
            <pro-list :datas="proList"></pro-list>
            <el-button icon="plus" @click="mini = true"></el-button>
          </p>
          <p v-else>
            <pro-list :datas="form.apply"></pro-list>
          </p>
        </el-form-item>
        <el-form-item label="余量:" label-width="150px">
          <p v-if="editing || adding">
            <el-input-number v-model="editForm.count" :controls="false"></el-input-number>
          </p>
          <p v-else class="just-view">{{form.count}}</p>
        </el-form-item>
        <el-form-item label="创建时间:" label-width="150px" v-if="!adding">
          <p class="just-view">{{form.created | dtf}}</p>
        </el-form-item>
        <el-form-item label="名称:" label-width="150px">
          <p v-if="editing || adding">
            <el-input v-model="editForm.name" style="width: 400px;"></el-input>
          </p>
          <p v-else class="just-view">{{form.name}}</p>
        </el-form-item>
        <el-form-item label="相关描述:" label-width="150px">
          <p v-if="editing || adding">
            <el-input type="textarea" :row="2" v-model="editForm.detail" style="width: 400px;"></el-input>
          </p>
          <p v-else class="just-view">{{form.detail}}</p>
        </el-form-item>
        <el-form-item class="text--center">
          <el-button v-if="editing || adding" @click="handleUpdate">提交</el-button>
          <el-button type="primary" v-if="!editing && !adding" @click="editing = true">编辑</el-button>
          <el-button type="info" v-if="editing" @click="editing = false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="mini">
      <apc @confirm="handleConfirm" :init="proList"></apc>
    </el-dialog>
  </section>
</template>
<script>
import Coupon from '~/components/common/Coupon'
import Apc from '~/components/common/ApplyProsChosen'
import ProList from '~/components/common/ProList'
import { coupon, product, config } from '~/assets/lib/constant'
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  components: {
    Coupon,
    Apc,
    ProList
  },
  async fetch ({ store }) {
    await Promise.all([
      store.dispatch({ type: `config/${config.FETCH_CONFIG}` }),
      store.dispatch({ type: `product/${product.FETCH_PRODUCT_LIST}` }),
      store.dispatch({ type: `coupon/${coupon.FETCH_COUPON_LIST}` })
    ])
  },
  data () {
    return {
      // for view
      form: {},
      // for edit
      editForm: {},
      visible: false,
      editing: false,
      mini: false,
      chosen: null,
      /* add mode */
      adding: false
    }
  },
  computed: {
    ...mapState('coupon', ['idList', 'store']),
    range: {
      set ([s, e]) {
        this.editForm.start = s
        this.editForm.end = e
      },
      get () {
        const { start, end } = this.editForm
        return start ? [new Date(start), new Date(end)] : []
      }
    },
    proList () {
      return _.isArray(this.chosen) ? this.chosen : this.editForm.apply
    }
  },
  methods: {
    ...mapActions('coupon', {
      updateCouponServer: coupon.UPDATE_COUPON_A,
      addCouponServer: coupon.ADD_COUPON_A
    }),
    viewDetail (kid) {
      this.form = this.store[kid]
      this.editForm = _.cloneDeep(this.form)
      this.visible = true
    },
    handleConfirm ({ confirm, list }) {
      this.mini = false
      if (confirm) {
        this.chosen = list
      }
    },
    async handleUpdate () {
      const payload = { ...this.editForm, apply: this.proList }
      const res =
        this.editing
          ? await this.updateCouponServer(payload)
          : await this.addCouponServer(payload)
      if (res === true) {
        this.visible = false
        this.$message({ message: this.editing ? '更新完成' : '新增优惠券成功', type: 'success' })
      } else {
        const { message } = res
        this.$message({ message, type: 'error' })
      }
    },
    /* 添加优惠券 */
    handleAddCouponClick () {
      this.editForm = { apply: [], method: { achieve: '', cut: '' }, start: '', end: '' }
      this.visible = true
      this.adding = true
    }
  },
  watch: {
    visible (v) {
      !v && (this.editing = this.adding = false)
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
  max-width: 400px;
  border-bottom: 1px solid #edeef1;
}
.top-bar {
  padding: 10px;
}
</style>
<style>
.form-dialog .el-dialog__body {
  padding: 30px 50px;
}
</style>
