<template>
  <div class="wrapper">
    <div class="main-container login-page">
      <div class="log-in-box">
        <form action="" id="si" novalidate>
          <p class="form-group">
            <label for="phone">手机号：</label>
            <input id="phone"
                   name="phone"
                   :class="{'shaking':errors.has('phone') && signed, 'animated':true}"
                   v-model="phone" v-validate:phone.initial="'required|phone'"
                   type="number">
            <!--v-model="phone" v-validate:phone.initial="{rules:{required:true, phone:true}}"-->
          </p>
          <p class="form-group">
            <label for="password">密&nbsp;&nbsp;&nbsp;码：</label>
            <input type="password"
                   name="password"
                   :class="{'shaking':errors.has('password') && signed, 'animated':true}"
                   v-model="password" v-validate:password.initial="'required|alpha_dash|min:6|max:20'"
                   placeholder="长度为6-20的数字字母"
                   id="password">
          </p>
          <a href="javascript:void(0);"
             @click="valid()"
             class="log-btn">登录</a>
          <p class="forget">
            <router-link :to="{name:'login1'}">用户注册</router-link>
            <router-link :to="{name:'login1'}">忘记密码</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    import config from '../javascripts/config'
    import {user} from '../javascripts/services'
    import swal from 'sweetalert'
    import {USER_SET_USER_A} from '../javascripts/constant'

    export default {
        data() {
            return {
                phone:'',
                password:'',
                signed:false,
                timer:undefined
            }
        },
        methods:{
            valid(){
                let self = this;
                self.signed = true;

                self.$validator.validateAll()
                    .then(() => {
                        self.__sign();
                    })
                    .catch((err) => {
                        if (self.timer) {
                            clearTimeout(self.timer);
                            self.timer = undefined;
                        }
                        self.timer = setTimeout(() => {
                            self.signed = false;
                        }, 600);
                    })
            },
            __sign() {
                let self = this;
                user.signIn(
                    {phone:self.phone, password:self.password}
                ).then(response => {
                    console.log(response);

                    self.$store.dispatch(USER_SET_USER_A, response);

                    let next = self.$route.params.next;
                    if (next) {
                        self.$router.replace({name: 'user'});
                        console.log(next);
                    } else {
                        self.$router.replace({name:'user'});
                    }

                }).catch(error => {
                    console.info(error);

                    swal('', error, 'warning');
                })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
