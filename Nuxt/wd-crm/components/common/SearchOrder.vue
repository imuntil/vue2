<template>
  <div class="order-search">
    <el-autocomplete v-model="search" icon="circle-close"
                     :on-icon-click="handleIconClick"
                     placeholder="输入手机号码" @select="handleSelect"
                     :props="{ value: field, label: field }"
                     :fetch-suggestions="querySearch"
                     :trigger-on-focus="false">
      <el-select style="width: 120px;" v-model="select" slot="prepend">
        <el-option label="订单号" value="orderNumber"></el-option>
        <el-option label="手机号码" value="phone"></el-option>
        <el-option label="用户昵称" value="nick"></el-option>
      </el-select>
      <el-button slot="append" icon="search"></el-button>
    </el-autocomplete>
    <el-button type="primary" style="margin-left: 20px;" @click="handleIconClick">重置</el-button>
  </div>
</template>
<script>
  import { order } from '~/assets/lib/constant'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        search: '',
        field: '',
        select: 'orderNumber',
        d: null
      }
    },
    methods: {
      ...mapActions('order', {
        searchOrder: order.SEARCH_ORDERS_A
      }),
      handleIconClick () {
        // x
      },
      handleSelect () {
        // x
      },
      querySearch (qs, cb) {
        const s = qs.trim()
        if (/([^\d]|^[^01])/.test(s)) {
          this.select = 'nick'
        }
        if (this.select === 'orderNumber' && !/^0\d{2,17}$/.test(s)) {
          return false
        }
        if (this.select === 'phone' && !/^1\d{2,10}$/.test(s)) {
          return false
        }
        /* eslint-disable standard/no-callback-literal */
        cb([])
//        if (this.d) {
//          clearTimeout(this.d)
//          this.d = null
//        }
//        this.d = setTimeout(async () => {
//          res = await this
//        })
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .order-search {
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start;
    .el-input__icon.el-icon-circle-close.is-clickable {
      right: 50px;
    }
  }
</style>
