<template>
  <div class="wrapper">
    <div class="login-container" :class="{vct: vct}">
      <div class="login-box">
        <input type="tel" placeholder="请输入您的账号" v-validate="'required|digits:4'"
               v-model="account" v-shaking="submit && errors.has('account')" name="account">
        <a href="javascript:;" class="login" @click="valid">登录</a>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { devUrl } from '../lib/config'

  export default {
    data () {
      return {
        account: null,
        submit: false,
        vct: this.$router.currentRoute.name === 'v-login'
      }
    },
    methods: {
      valid () {
        let that = this
        that.$vux.toast.show({
          text: '登录成功',
          time: 1000,
          type: 'success',
          width: '60%'
        })
        setTimeout(function () {
          !that.vct ? that.$router.push({name: 'menu'})
            : that.$router.push({name: 'v-menu'})
        }, 500)

//        that.submit = true
//        that.$validator.validateAll()
//          .then(function () {
//            that.submit = false
//            that.__login()
//          })
//          .catch(() => {
//            let errors = that.$validator.getErrors().all()
//            console.log(errors)
//            that.$vux.toast.show({
//              text: errors[0],
//              time: 1000,
//              type: 'text',
//              width: '60%'
//            })
//            that.submit = false
//          })
      },
      __login () {
        let that = this
        axios.get(devUrl + `loginUsr.action?openid=11111111&strflag=12345`)
          .then(res => {
            let data = res.data
            if (+data.resultcode === 1 || +data.resultcode === 2) {
              that.$vux.toast.show({
                text: '登录成功',
                time: 1000,
                type: 'success',
                width: '60%'
              })
              setTimeout(function () {
                that.$router.push({name: 'menu'})
              }, 500)
            } else {
              that.$vux.toast.show({
                text: data.result,
                type: 'error',
                width: '60%',
                time: 1000
              })
            }
          })
          .catch(err => {
            console.log(err)
            that.$vux.toast.show({
              text: '出错了，请稍候重试',
              type: 'error',
              width: '60%',
              time: 1000
            })
          })
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .login-container {
    background: url("../assets/bg.jpg") no-repeat center;
    background-size:cover;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .vct {
    background: url("../assets/vct-login-bg.jpg") no-repeat center;
    -webkit-background-size: cover;
    background-size: cover;
  }
  .login-box {
    width:80%;
    position: absolute;
    left:10%;
    bottom: 10%;
    /*background-color: #fff;*/
  }
  .login-box * {
    display: block;
    border-radius: 40px;
    text-align: center;
    padding: .6rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .login-box input {
    width:80%;
    margin: 0 auto;
    background-color: #3b3b3b;
    border:2px solid #676767;
    color: #ffffff;
    font-size:1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .login-box input::-webkit-input-placeholder {
    color: #ffffff;
  }
  .login-box a {
    width:80%;
    margin:1rem auto;
    border:2px solid #676767;
    color: #ffffff;
    font-size:1.1rem;
    background-color: #730c0c;
    line-height: 1;
  }
</style>
