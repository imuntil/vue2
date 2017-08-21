<template>
  <div class="wrapper">
    <div class="main-container">
      <img class="page-banner" src="../assets/competing-header.jpg" alt="">
      <p class="bottom-shadow"></p>
      <div class="body">
        <!--<p></p>-->
        <div class="table-box">
          <table cellspacing="0" cellpadding="0" width="100%">
            <thead>
            <tr>
              <td><a href="javascript:;">技术数据</a></td>
              <td>
                <a class="a1" href="javascript:;" @click="popoverOpen(1)">
                请选择车型
                  <i><img src="../assets/competing-icon.png" alt=""></i>
                </a>
              </td>
              <td>
                <a href="javascript:;" class="a2" @click="popoverOpen(2)">
                  请选择车型
                  <i><img src="../assets/competing-icon.png" alt=""></i>
                </a>
              </td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>车型</td>
              <td>{{p1.model}}</td>
              <td>{{p2.model}}</td>
            </tr>
            <tr>
              <td>价格</td>
              <td>{{pParams[0]}}</td>
              <td>{{oParams[0]}}</td>
            </tr>
            <tr>
              <td>车长</td>
              <td>{{pParams[1]}}</td>
              <td>{{oParams[1]}}</td>
            </tr>
            <tr>
              <td>车宽</td>
              <td>{{pParams[2]}}</td>
              <td>{{oParams[2]}}</td>
            </tr>
            <tr>
              <td>车高</td>
              <td>{{pParams[3]}}</td>
              <td>{{oParams[3]}}</td>
            </tr>
            <tr>
              <td>轴距</td>
              <td>{{pParams[4]}}</td>
              <td>{{oParams[4]}}</td>
            </tr>
            <tr>
              <td>风阻系数</td>
              <td>{{pParams[5]}}</td>
              <td>{{oParams[5]}}</td>
            </tr>
            <tr>
              <td>气缸布置形式/气缸数</td>
              <td>{{pParams[6]}}</td>
              <td>{{oParams[6]}}</td>
            </tr>
            <tr>
              <td>排量</td>
              <td>{{pParams[7]}}</td>
              <td>{{oParams[7]}}</td>
            </tr>
            <tr>
              <td>发动机位置/驱动形式</td>
              <td>{{pParams[8]}}</td>
              <td>{{oParams[8]}}</td>
            </tr>
            <tr>
              <td>功率</td>
              <td>{{pParams[9]}}</td>
              <td>{{oParams[9]}}</td>
            </tr>
            <tr>
              <td>最大扭矩(Nm)/对应转速</td>
              <td>{{pParams[10]}}</td>
              <td>{{oParams[10]}}</td>
            </tr>
            <tr>
              <td>最高时速</td>
              <td>{{pParams[11]}}</td>
              <td>{{oParams[11]}}</td>
            </tr>
            <tr>
              <td>0-100km/h加速时间</td>
              <td>{{pParams[12]}}</td>
              <td>{{oParams[12]}}</td>
            </tr>
            <tr>
              <td>0-160km/h加速时间</td>
              <td>{{pParams[13]}}</td>
              <td>{{oParams[13]}}</td>
            </tr>
            <tr>
              <td>80-120km/h中间加速时间</td>
              <td>{{pParams[14]}}</td>
              <td>{{oParams[14]}}</td>
            </tr>
            <tr>
              <td>变速箱</td>
              <td>{{pParams[15]}}</td>
              <td>{{oParams[15]}}</td>
            </tr>
            <tr>
              <td>空载重量(德国工业标准)</td>
              <td>{{pParams[16]}}</td>
              <td>{{oParams[16]}}</td>
            </tr>
            <tr>
              <td>行李箱容积</td>
              <td>{{pParams[17]}}</td>
              <td>{{oParams[17]}}</td>
            </tr>
            <tr>
              <td>油箱</td>
              <td>{{pParams[18]}}</td>
              <td>{{oParams[18]}}</td>
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
      <mu-popover :trigger="p1.trigger" :open="p1.open" @close="p1.open = false">
        <mu-menu>
          <div class="popover-box">
            <a href="javascript:;" class="menu-item" v-for="(m, i) in pm" :key="i" @click="reRender(0, i)">
              {{m}}
            </a>
          </div>
        </mu-menu>
      </mu-popover>
      <mu-popover :trigger="p2.trigger" :open="p2.open" @close="p2.open = false">
        <mu-menu>
          <div class="popover-box other-box">
            <a href="javascript:;" class="menu-item" v-for="(m, i) in om" :key="i" @click="reRender(1, i)">
              {{m}}
            </a>
          </div>
        </mu-menu>
      </mu-popover>
    </div>
  </div>
</template>
<script>
  import popover from 'muse-components/popover'
  import menu from 'muse-components/menu/menu'
  import { panameraCompetingDatas, otherCompetingDatas } from '../lib/data'
  import _ from 'lodash'
  export default {
    components: {
      muPopover: popover,
      muMenu: menu
    },
    data () {
      return {
        pParams: 0,
        oParams: 0,
        p1: {
          trigger: null,
          open: false,
          model: ''
        },
        p2: {
          trigger: null,
          open: false,
          model: ''
        }
      }
    },
    computed: {
      //  panamera models
      pm () {
        return _.map(panameraCompetingDatas, item => item.models)
      },
      om () {
        return _.map(otherCompetingDatas, item => item.models)
      }
    },
    methods: {
      popoverOpen (el) {
        if (+el === 1) {
          this.p2.open = false
          this.p1.open = !this.p1.open
        } else {
          this.p1.open = false
          this.p2.open = !this.p2.open
        }
      },
      reRender (p, index) {
        if (+p === 0) {
          this.pParams = panameraCompetingDatas[index]['params']
          this.p1.model = this.pm[index]
        } else {
          this.oParams = otherCompetingDatas[index]['params']
          this.p2.model = this.om[index]
        }
        this.p1.open = false
        this.p2.open = false
      }
    },
    mounted () {
      this.p1.trigger = document.querySelector('.a1')
      this.p2.trigger = document.querySelector('.a2')
      this.reRender(0, 0)
      this.reRender(1, 0)
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  @import "../styles/theme";
  .bottom-shadow {
    height:.3rem;
  }
  div.body {
    overflow: scroll;
    .table-box {
      width: 100%;
      height:100%;
      thead tr {
        background-color: #f2f2f2;
        font-size: .9rem;
        td {
          padding:0;
        }
        a {
          display: block;
          padding: .9rem;
          color: $common-red;
          font-size: .9rem;
        }
        i {
          width: .5rem;
          display: inline-block;
          float: right;
        }
      }
      tr {
        td:first-child {
          width:30%;
        }
        td:nth-child(2) {
          border-left: 1px solid #cbcbcb;
          border-right: 1px solid #cbcbcb;
          width:35%;
        }
        td:last-child {
          width:35%;
        }
      }
      tr:nth-of-type(2n){
        background-color: #f2f2f2;
      }
      td {
        padding: .7rem;
        text-align: center;
        font-size: .8rem;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        word-break:break-all;
        vertical-align: middle;
        line-height: 1.2rem;
      }
    }
  }
  footer {
    a {
      width: 25%;
      margin-right: 5%;
    }
  }
  .popover-box {
    height: 10rem;
    overflow: scroll;
    .menu-item {
      padding: .5rem 1rem;
      color: #000;
      font-size: .8rem;
    }
  }
  .other-box {
    height: auto;
  }
</style>
