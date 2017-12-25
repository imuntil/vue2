<template>
  <div class="apc">
    <p class="text--right tip">Alt+左键（mac OS option+左键）文本区域可以转至产品详细</p>
    <div class="top-bar">
      <div class="filter-area">
        <el-input placeholder="请输入sku或产品中文名" :value="filter.key" @change="handleKeyChange($event)">
          <el-select slot="prepend" v-model="filter.type">
            <el-option label="全部" :value="-1"></el-option>
            <el-option v-for="v in types" :key="v.value" :label="v.text" :value="v.value"></el-option>
          </el-select>
          <el-button slot="append" icon="search"></el-button>
        </el-input>
      </div>
      <p class="btn-group">
        <el-button size="mini" type="warning" @click="handleChooseAll(false)">全不选</el-button>
        <el-button size="mini" type="success" @click="handleChooseAll(true)">全选</el-button>
      </p>
    </div>
    <ul>
      <li v-for="i in currentList" :key="i">
        <a href="javascript:;" @click="handleClick(i)">
          <span v-show="_in(i)">
            <i class="el-icon-check"></i>
          </span>
          <figure>
            <img src="/tiny.jpg" alt="">
            <figcaption  @click.alt.stop="handleCtrlClick($event, i)">
              {{i}} <br>
              {{store[i].cn}}
            </figcaption>
          </figure>
        </a>
      </li>
    </ul>
    <p class="text--right footer">
      <el-button @click="handleCancelClick">取消</el-button>
      <el-button type="primary" @click="handleConfirmClick">确定</el-button>
    </p>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import _ from 'lodash'
  let deb = null
  export default {
    props: ['init'],
    data () {
      return {
        chosen: [],
        filter: {
          // 酒的品类
          type: -1,
          // 关键字搜索(中文名或sku)
          key: ''
        },
        // 中间值，暂存filter结果
        tempList: [],
        // fixed box style
        style: { left: 0, top: 0 }
      }
    },
    computed: {
      ...mapState('product', [
        'store', 'skuList'
      ]),
      ...mapState('config', ['types']),
      currentList () {
        const k = this.filter.key
        const dt = this.dtKey(k)
        switch (dt) {
          case 'cn':
            return this.tempList.filter(v => v.cn.indexOf(k) > -1).map(v => v.sku)
          case 'sku':
            return this.tempList.filter(v => v.sku.indexOf(k) > -1).map(v => v.sku)
//          case 'en':
//            return this.tempList.filter(v => v.en.indexOf(k) > -1).map(v => v.sku)
          default:
            return this.tempList.map(v => v.sku)
        }
      }
    },
    methods: {
      handleCtrlClick (e, i) {
        const { pageX, pageY } = e
        const datas = this.store[i]
        this.$zp({ top: pageY, left: pageX, datas })
      },
      handleClick (i) {
        if (!this._in(i)) {
          this.chosen.push(i)
        } else {
          const index = this.chosen.indexOf(i)
          this.chosen.splice(index, 1)
        }
      },
      handleConfirmClick () {
        this.filter = { type: -1, key: '' }
        this.$emit('confirm', { confirm: true, list: [...this.chosen] })
      },
      handleCancelClick () {
        this.filter = { type: -1, key: '' }
        this.$emit('confirm', { confirm: false })
      },
      _in (i) {
        return this.chosen.includes(i)
      },
      // 区分关键字是产品中文名还是sku
      dtKey (s) {
        if (s.trim().length === 0) return false
        if (/[\u4e00-\u9fa5]/.test(s)) return 'cn'
        else if (/^[A-z]{1}-?$|^\d+$/.test(s)) return 'sku'
        return false
      },
      // 全选全不选（全选是追加全选当前页，即当前筛选条件下的。而全部选则是取消全部）
      handleChooseAll (v) {
        this.chosen = v
          ? [...new Set(this.chosen.concat(this.currentList))]
          : []
      },
      // filter type 变化时的handle
      handleTypeChange (t) {
        if (t === -1) {
          this.tempList = Object.values(this.store)
        } else {
          this.tempList = Object.values(this.store).filter(v => v._type === t)
        }
      },
      handleKeyChange (key) {
        if (deb) deb.cancel()
        deb = _.debounce(() => {
          this.filter.key = key
          deb = null
        }, 250)
        deb()
      }
    },
    watch: {
      'filter.type': {
        handler (n, o) {
          if (n !== o) {
            this.handleTypeChange(n)
          }
        },
        immediate: true
      }
    },
    created () {
      this.chosen = [...this.init]
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  ul {
    list-style: none;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    max-height: 500px;
    overflow: auto;
    li {
      padding: 10px;
    }
    a {
      /*border: 1px solid #d7d7d7;*/
      display: inline-block;
      box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.1);
      padding-bottom: 5px;
      position: relative;
      width: 150px;
      i {
        color: #7dff79;
        position: absolute;
        transform: rotate(-45deg);
        bottom: -25px;
        left: -10px;
      }
      span {
        $d: 30px;
        position: absolute;
        width: 0;
        height: 0;
        right: -$d;
        top: -$d;
        border: $d solid transparent;
        border-bottom-color: rgba(162, 251, 164, 0.47);
        transform-origin: center center;
        transform: rotate(45deg);
      }
    }
  }
  .tip {
    margin-top: -15px;
    margin-bottom: 10px;
    padding-right: 20px;
    font-size: .7rem;
  }
  .footer {
    padding: 15px 10px 0;
  }
  figure img {
    width: 150px;
  }
  figcaption {
    text-align: center;
    line-height: 1.4;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 5px;
    overflow: hidden;
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    padding-left: 10px;
  }
  .btn-group {
    padding-right: 20px;
  }
  .fixed-box {
    width: 100px;
    height: 100px;
    position: fixed;
    background-color: #000000;
  }
</style>
<style>
  .apc .top-bar .filter-area .el-input-group__prepend {
    width: 100px;
  }
</style>
