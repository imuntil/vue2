<template>
  <div class="order-search">
    <el-autocomplete v-model="search" icon="circle-close"
                     :on-icon-click="handleIconClick"
                     :placeholder="placeholder"
                     custom-item="order-candidate"
                     :props="{ value: select, label: select }"
                     :fetch-suggestions="querySearch"
                     @select="handleSelect"
                     @keyup.native.enter="handleKeyEnter"
                     :trigger-on-focus="false">
      <el-select @change="handleSelectChange" style="width: 120px;" v-model="select" slot="prepend">
        <el-option label="订单号" value="orderNumber"></el-option>
        <el-option label="手机号码" value="_ownerPhone"></el-option>
        <el-option label="用户昵称" value="_ownerNick"></el-option>
      </el-select>
      <el-button slot="append" icon="search"></el-button>
    </el-autocomplete>
    <el-button type="primary" style="margin-left: 20px;" @click="handleIconClick">重置</el-button>
  </div>
</template>
<script>
  import { order } from '~/assets/lib/constant'
  import { mapActions, mapMutations } from 'vuex'
  import Vue from 'vue'
  Vue.component('order-candidate', {
    functional: true,
    render (h, ctx) {
      const item = ctx.props.item
      const _class = ctx.data.class
      return h('li', { ...ctx.data, class: { ..._class, candidate: true } }, [
        h('p', { attrs: { class: 'candidate-body' } }, [item.orderNumber]),
        h('span', { attrs: { class: 'candidate-footer' } }, [`${item._ownerNick} | ${item._ownerPhone}`])
      ])
    }
  })
  const ps = {
    orderNumber: '输入订单号',
    _ownerNick: '输入下单用户昵称',
    _ownerPhone: '输入下单用户手机号码'
  }
  export default {
    props: ['os'],
    data () {
      return {
        search: '',
        select: 'orderNumber',
        // debounce
        d: null,
        // keyup.enter 时间间隔
        timer: 0,
        datas: {}
      }
    },
    computed: {
      placeholder () {
        return ps[this.select]
      },
      globalQuery () {
        return this.os ? { status: this.os } : {}
      }
    },
    methods: {
      ...mapActions('order', {
        searchOrder: order.SEARCH_ORDERS_A,
        fetchOrder: order.FETCH_ORDER_LIST
      }),
      ...mapMutations('order', {
        setOrder: order.SAVE_ORDER_LIST
      }),
      handleIconClick () {
        this.search = ''
        this.fetchOrder(this.os && this.globalQuery)
      },
      handleSelect (v) {
        this.timer = +Date.now()
        this.setOrder({
          total: 1,
          count: 1,
          orders: [v],
          current: 1
        })
      },
      handleSelectChange (v) {
        this.search = ''
      },
      querySearch (qs, cb) {
        if (this.d) {
          clearTimeout(this.d)
          this.d = null
        }
        const s = qs.trim()
        if (/([^\d]|^[^01])/.test(s) && this.select !== '_ownerNick') {
          this.select = '_ownerNick'
          this.$nextTick(() => {
            this.search = s
          })
        } else if (this.select === 'orderNumber' && !/^0\d{2,17}$/.test(s)) {
          /* eslint-disable standard/no-callback-literal */
          cb([])
          return false
        } else if (this.select === '_ownerPhone' && !/^1\d{2,10}$/.test(s)) {
          /* eslint-disable standard/no-callback-literal */
          cb([])
          return false
        }
        this.d = setTimeout(async () => {
          const data = await this.searchOrder({ field: this.select, q: this.search, ...this.globalQuery })
          this.datas = data
          cb(data.orders)
        }, 250)
      },
      handleKeyEnter (e) {
        // 当用keyup.enter选择autocomplete候选项时也会触发input上keyup.enter
        // 事件，所以只好用时间间隔来区分事件是触发在input还是ac候选上
        // +Date.now - this.timer < 150 target是ac候选项
        if (+Date.now() - this.timer > 150) {
          console.log('keyup')
          const { count, current, orders, total } = this.datas
          this.setOrder({
            total: total,
            count: count,
            orders: [...orders],
            current: current
          })
        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss">
  .order-search .el-select .el-input__inner {
    width: 120px
  }
</style>
