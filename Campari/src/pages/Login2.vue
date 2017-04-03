<template>
    <div class="main-container login-page">
        <form action="" name="li">
            <div class="log-in-box">
                <p class="form-group">
                    <label for="nick">昵称:</label>
                    <input type="text" id="nick"
                           name="nick"
                           :class="{shaking:submit && errors.has('nick'), animated:true}"
                           maxlength="20"
                           v-model="nick" v-validate:nick.initial="'required|min:2'"
                           placeholder="金巴厘会员">
                    <a href="javascript:;" class="clear" @click="nick = ''">
                        <img src="src/img/clear-2.png" alt="" width="100%">
                    </a>
                </p>
                <p class="form-group">
                    <label for="password">登录密码:</label>
                    <input type="password"
                           placeholder="6-20位字母、数字组合"
                           :class="{shaking:submit && errors.has('p1'), animated:true}"
                           v-model="p1" v-validate:p1.initial="'required|alpha_dash|min:6|max:20'"
                           name="p1"
                           id="password">
                </p>
                <p class="form-group">
                    <label for="password2">确认密码:</label>
                    <input type="password"
                           name="p2"
                           :class="{shaking:submit && p1 != p2, animated:true}"
                           v-model="p2" v-validate:p2.initial="'required|confirmed:p1'"
                           placeholder="再次填写密码"
                           id="password2">
                </p>
                <a href="javascript:;" class="log-btn" @click="next(errors)">完成</a>
            </div>
        </form>
    </div>
</template>
<script>
    import swal from 'sweetalert'
    import {Validator} from 'vee-validate'
    import {user} from '../javascripts/services'
    import {USER_DELETE_PHONE_CODE_M} from '../javascripts/constant'
    export default {
        data() {
            return {
                submit:false,
                nick:'',
                p1:'',
                p2:'',
                timer: undefined,
                loginTemData: this.$store.state.user.loginTemData
            }
        },
        methods:{
            next(err) {
                console.log(err);
                let self = this;
                self.submit = true;

                self.$validator.validateAll()
                    .then(() => {
                        self.__register();
                        self.$store.commit(USER_DELETE_PHONE_CODE_M);
                    })
                    .catch(err => {
                        console.log(err);
                        if (self.timer) {
                            clearInterval(self.timer);
                            self.timer = undefined;
                        }
                        self.timer = setTimeout(() => {
                            self.submit = false;
                        }, 600);
                    })
            },
            __register() {
                let self = this;
                user.login({phone: self.loginTemData.phone, password: self.p1, nickname: self.nick})
                    .then(response => {
                        swal({
                            title:'',
                            text:'注册完成',
                            type:'success',
                            timer:1500
                        }, () => {
                            self.$router.go(-2);
                        })
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
            }
        },
        created() {
            if (!this.loginTemData || !this.loginTemData.code) {
                this.$router.replace({name:'login1'});
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../stylesheets/vd";
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