<template>
  <div id="app">
    <transition enterActiveClass="animated fadeInDown"
                leaveActiveClass="animated fadeOutDown"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'
  import { wechatAuth, localKeys } from './lib/config'
  import { Ls } from './lib/common-tools'
  export default {
    name: 'app',
    methods: {
      __getOpenId () {
        let openid = Ls.getValue(localKeys)
        console.log(openid)
        if (!openid) {
          this.__auth()
        }
      },
      __auth () {
        let that = this
        axios.get(wechatAuth + '/output.php')
          .then(function (response) {
            let data = response.data
            if (data.msg && data.msg['UserOpenId']) {
              alert(data.msg['UserOpenId'])
              Ls.putValue(localKeys, data.msg['UserOpenId'])
              return
            }
            that.__requestAuth()
          })
          .catch(function (error) {
            console.log(error)
            that.__requestAuth()
          })
      },
      __requestAuth () {
        location.href = wechatAuth + '/login.php?url=' + location.href
      }
    },
    created () {
//      this.__getOpenId()
    }
  }
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
