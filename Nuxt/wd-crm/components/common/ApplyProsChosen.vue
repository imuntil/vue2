<template>
  <div class="apc">
    <p class="text--right tip">Alt+左键（mac OS option+左键）可以查看产品详细</p>
    <ul>
      <li v-for="i in skuList" :key="i">
        <a href="javascript:;" @click="handleClick(i)">
          <span v-show="_in(i)">
            <i class="el-icon-check"></i>
          </span>
          <figure>
            <img src="/tiny.jpg" alt="">
            <figcaption  @click.alt.stop="handleCtrlClick">
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
  export default {
    data () {
      return {
        chosen: []
      }
    },
    computed: {
      ...mapState('product', [
        'store', 'skuList'
      ])
    },
    methods: {
      handleCtrlClick () {
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
        this.$emit('confirm', { confirm: true, list: [...this.chosen] })
        this.chosen = []
        // x
      },
      handleCancelClick () {
        this.$emit('confirm', { confirm: false })
        this.chosen = []
        // x
      },
      _in (i) {
        return this.chosen.includes(i)
      }
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
</style>
