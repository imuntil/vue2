<template>
  <div class="wrapper">
    <div class="main-container login-page">
      <form action="" name="li" id="li">
        <div class="log-in-box">
          <p class="form-group">
            <label for="phone">手机号：</label>
            <input type="number"
                   name="phone"
                   v-model="phone" v-validate:phone.initial="'required|phone'"
                   :class="{'shaking':errors.has('phone') && signed, 'animated':true}"
                   @blur="verifyPhone(errors.has('phone'))"
                   id="phone">
          </p>
          <p class="form-group form-group-2">
            <label for="code">验证码：</label>
            <input type="number"
                   name="code"
                   v-model="code" v-validate:code.initial="{rules:{required:true, regex:/^\d{6}$/}}"
                   :class="{'shaking':errors.has('code') && signed, 'animated':true}"
                   id="code">
          </p>
          <!--<a href="javascript:void(0);" class="v-code">发送验证码</a>-->
          <v-code @onRun="fetchCode"
                  :can="!errors.has('phone') && phone"
                  :verified="verified"
                  :text="text"
                  :limit="limit"></v-code>
          <a href="javascript:void(0);" @click="next()" class="log-btn">下一步</a>
          <router-link :to="{name:'sign-in'}" class="go-sign">用户登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import VCode from '../components/v-code.vue'
    import config from '../javascripts/config'
    import base64 from 'base-64'
    import {user} from '../javascripts/services'
    import swal from 'sweetalert'
    import {USER_SAVE_PHONE_CODE_M} from '../javascripts/constant'

    export default {
        components: {
            VCode
        },
        data() {
            return {
                limit: 5,
                text:'发送验证码',
                phone:'',
                code:'',
                timer:undefined,
                signed:false,
                base64Code:undefined,
                verified:false,     //blur时检查号码是否被注册

                verifiedPhone:undefined   //防止同一个号码多次检查（多次blur）
            }
        },
        methods: {
            next() {
                let self = this;
                self.signed = true;

                self.$validator.validateAll()
                    .then(() => {
                        if (self.__checkCode()) {
                            self.__savePhone_Code();
                            self.$router.push({name:'login2'});
                        } else  {
                            swal({
                                title:'',
                                text:'验证码有误',
                                type:'warning',
                                timer:1500
                            })
                        }
                    })
                    .catch(err => {
                        if (self.timer) {
                            clearInterval(self.timer);
                            self.timer = undefined;
                        }
                        self.timer = setTimeout(() => {
                            self.signed = false;
                        }, 600);
                    })
            },
            fetchCode() {
                console.log('fetching');
                let self = this;

                user.getCode({flag:1, phone:self.phone})
                    .then(response => {
                        self.base64Code = response;
                    })
                    .catch(error => {
                        console.info(error);

                        swal({
                            title:'',
                            text:error,
                            type:'warning',
                            timer:1500
                        })
                    })
            },
            __checkCode() {
                let code = base64.encode(this.code);
                console.log(code);
                return code === this.base64Code;
            },
            //暂存电话和短信验证码，供注册使用
            __savePhone_Code() {
                this.$store.commit(USER_SAVE_PHONE_CODE_M, {phone:this.phone, code:this.code});
            },
            //验证手机号是否已被注册
            verifyPhone(invalid) {
                let self = this;
                self.verified = false;
                console.log('blur');
                if (invalid || !self.phone) {return}
                if (self.phone === self.verifiedPhone) {return}
                user.validatePhone({phone: this.phone})
                    .then(response => {
                        if (+response['resultcode'] === 0) {
                            self.verified = true;
                            self.verifiedPhone = self.phone;
                        } else if (+response['resultcode'] === 1) {
                            swal({title:'', text:'该手机号已被注册', type:'warning', timer:1500})
                            self.verifiedPhone = self.phone;
                        } else {
                            swal({title:'', text:'出错了，请稍后重试', type:'warning', timer:1500});
                        }
                    })
                    .catch(error => {
                        swal({title:'', text:error, type:'warning', timer:1500});
                    })
            }
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../stylesheets/common.scss";
  .login-page {
    background: url("../img/log-on.jpg") no-repeat left top;
    background-size:cover;
    .log-in-box {
      width:90%;
      overflow: hidden;
      position: absolute;
      bottom:5%;
      left:0;
      right:0;
      margin:0 auto;
      //background-color: rgba(255, 255, 255, .2);
      .form-group {
        width:100%;
        border-bottom:2px solid $white-border;
        padding: 5px;
        line-height: 3rem;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        label {
          color: $white-font;
          font-size:1.1rem;
          width:30%;
          text-align: left;
          display: inline-block;
          letter-spacing: 3px;
        }
        input {
          @include appearance;
          border:none;
          -webkit-box-sizing: inherit;
          -moz-box-sizing: inherit;
          box-sizing: inherit;
          padding: 10px;
          width:68%;
          background-color: transparent;
          color: $white-font;
          text-align: left;
          font-size: 1rem;
        }
        a.clear {
          @include clear;
          right:0;
        }
      }
      .form-group.form-group-2 {
        width:65%;
        label{
          width:47%;
        }
        input {
          width:50%;
        }
      }
      .forget {
        width:100%;
        font-size: 1rem;
        text-align: right;
        margin-top:24px;
        a{
          width:24%;
          color: $white-font;
          padding:10px 0 10px 10px;
          display: inline-block;
        }
        a:first-child {
          float: left;
          text-align: left;
          padding:10px 10px 10px 0;
        }
      }
      .log-btn {
        width:100%;
        font-size:1.1rem;
        color: $white-font;
        background: $home-red-color;
        text-align: center;
        padding:15px 0;
        margin-top:40px;
        position: relative;
        display: block;
        font-weight:300;
        letter-spacing: 5px;
        border-radius:3px;
      }
      .go-sign {
        display: block;
        width: 20%;
        margin: 20px auto 0;
        color: #fff;
        padding: 10px;
        font-size: .9rem;
      }
      .v-code {
        width: 30%;
        padding:10px 0;
        text-align: center;
        color: $white-font;
        font-size: .9rem;
        display: inline-block;
        border:2px solid $white-border;
        position: absolute;
        right:0;
        top: 78px;
        border-radius:3px;
      }
      .v-code.is_running {
        background:rgba(0,0,0,0.4);
        border:2px solid #666;
        color:#aaa;
      }
    }
  }
</style>
