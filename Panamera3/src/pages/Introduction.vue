<template>
  <div class="wrapper">
    <div class="main-container">
      <img class="page-banner" src="../assets/introduction-header.jpg" alt="">
      <p class="bottom-shadow"></p>
      <div class="body">
        <a href="javascript:;" class="pop-trigger" @click="open = true">
          {{current}}
          <i><img src="../assets/introduction-icon.png" alt=""></i>
        </a>
        <div class="box">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
            <tr>
              <td>价格</td>
              <td>{{model[0]}}</td>
            </tr>
            <tr>
              <td>车长</td>
              <td>{{model[1]}}</td>
            </tr>
            <tr>
              <td>车宽</td>
              <td>{{model[2]}}</td>
            </tr>
            <tr>
              <td>车高</td>
              <td>{{model[3]}}</td>
            </tr>
            <tr>
              <td>轴距</td>
              <td>{{model[4]}}</td>
            </tr>
            <tr>
              <td>风阻系数</td>
              <td>{{model[5]}}</td>
            </tr>
            <tr>
              <td>气缸布置形式/气缸数</td>
              <td>{{model[6]}}</td>
            </tr>
            <tr>
              <td>排量</td>
              <td>{{model[7]}}</td>
            </tr>
            <tr>
              <td>发动机位置/驱动形式</td>
              <td>{{model[8]}}</td>
            </tr>
            <tr>
              <td>功率</td>
              <td>{{model[9]}}</td>
            </tr>
            <tr>
              <td>最大扭矩(Nm)/对应转速</td>
              <td>{{model[10]}}</td>
            </tr>
            <tr>
              <td>最高时速</td>
              <td>{{model[11]}}</td>
            </tr>
            <tr>
              <td>0-100km/h加速时间</td>
              <td>{{model[12]}}</td>
            </tr>
            <tr>
              <td>0-160km/h加速时间</td>
              <td>{{model[13]}}</td>
            </tr>
            <tr>
              <td>80-120km/h中间加速时间</td>
              <td>{{model[14]}}</td>
            </tr>
            <tr>
              <td>变速箱</td>
              <td>{{model[15]}}</td>
            </tr>
            <tr>
              <td>空载重量(德国工业标准)</td>
              <td>{{model[16]}}</td>
            </tr>
            <tr>
              <td>行李箱容积</td>
              <td>{{model[17]}}</td>
            </tr>
            <tr>
              <td>油箱</td>
              <td>{{model[18]}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer>
        <a href="javascript:;">
          <img src="../assets/competing-more.jpg" alt="">
        </a>
      </footer>
      <mu-popover :trigger="trigger" :open="open" @close="open = false">
        <mu-menu>
          <div class="popover-box">
            <a href="javascript:;" class="menu-item" v-for="(m, i) in models"
               @click="reRender(i)" :key="i">
              {{m}}
            </a>
          </div>
        </mu-menu>
      </mu-popover>
    </div>
  </div>
</template>
<script>
  import { panameraCompetingDatas } from '../lib/data'
  import popover from 'muse-components/popover'
  import menu from 'muse-components/menu/menu'
  import _ from 'lodash'
  export default {
    components: {
      muPopover: popover,
      muMenu: menu
    },
    data () {
      return {
        model: [],
        open: false,
        trigger: null,
        models: _.map(panameraCompetingDatas, item => item.models),
        current: null
      }
    },
    methods: {
      reRender (i) {
        this.model = panameraCompetingDatas[i].params
        this.current = this.models[i]
        this.open = false
      }
    },
    created () {
      this.reRender(0)
    },
    mounted () {
      this.trigger = document.querySelector('.pop-trigger')
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import "../styles/theme";
  footer {
    a {
      width: 25%;
      margin-right: 5%;
    }
  }
  .body {
    overflow: hidden;
    width: 100%;
    height:100%;
    position: relative;
    padding: 4% 3%;
    a {
      width: 100%;
      padding: .6rem;
      background-color: #f2f2f2;
      color: #444;
      border: 1px solid #A30202;
      display: flex;
      justify-content:space-between;
      align-items: center;
      font-size: .9rem;
      i {
        width: .5rem;
      }
    }
    .box {
      width: 94%;
      position: absolute;
      top: 3.8rem;
      bottom: 4%;
      display: block;
      border: 1px solid #A30202;
      overflow: scroll;
    }
  }
  table {
    tr {
      td:first-child {
        /*width: 30%;*/
        border-right: 1px solid #cbcbcb;
      }
      /*td:last-child {*/
        /*width: 70%;*/
      /*}*/
    }
    tr:nth-of-type(2n) {
      background-color: #f2f2f2;
    }
    td {
      padding: .7rem;
      text-align: center;
      font-size: .8rem;
      word-break:break-all;
      vertical-align: middle;
      line-height: 1.2rem;
    }
  }
  .popover-box {
    height: 10rem;
    overflow: scroll;
  }
</style>
