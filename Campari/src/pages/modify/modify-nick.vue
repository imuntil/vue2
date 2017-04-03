<template>
    <div class="main-container forget-page">
        <form action="" class="f-s f-n" name="fn">
            <p class="input-p">
                昵称
                <input required
                       name="nick"
                       v-model="nick" v-validate:nick.initial="'required|min:2'"
                       maxlength="20"
                       :class="{shaking:submit && errors.has('nick'), animated:true}"
                       type="text">
                <a href="javascript:;" class="clear" @click="nick = ''">
                    <img src="src/img/clear-1.png" alt="" width="100%">
                </a>
            </p>
            <a href="javascript:;" @click="save()">保存</a>
        </form>
    </div>
</template>
<script>
    import {user} from '../../javascripts/services'
    import swal from 'sweetalert'
    import {USER_SET_USER_M} from '../../javascripts/constant'
    export default {
        data() {
            return {
                nick:'',
                submit:false,
                phone:this.$store.state.user.user.phone,
            }
        },
        methods:{
            save() {
                let self = this;
                self.submit = true;

                self.$validator.validateAll()
                    .then(() => {
                        user.modifyNick({phone:self.phone, nickname:self.nick})
                            .then(response => {
                                //同步store

                                self.$store.commit(USER_SET_USER_M, {name: self.nick});
                                swal({
                                    title:'',
                                    text:'修改昵称成功',
                                    type:'success',
                                    timer:1500
                                }, () => {
                                    self.$router.go(-1);
                                })
                            })
                    })
                    .catch(err => {
                        if (self.timer) {
                            clearInterval(self.timer);
                            self.timer = undefined;
                        }
                        self.timer = setTimeout(() => {
                            self.submit = false;
                        }, 600);
                    })
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../stylesheets/vd";
    .forget-page {
        p.input-p.step-1 {
            font-size:$font-size;
            color: $gray-price-color;
            input {
                width:44%;
            }
        }
        form.step-2 {
            margin-top:15px;
            p {
                background-color: #fff;
                border-bottom:1px solid $home-border;
            }
            p:first-child {
                padding:17px 20px;
                color: $home-red-color;
                font-size:$font-size;
                border-top:1px solid $home-border;
            }
            div {
                height: 54px;
                line-height: 54px;
                box-sizing: border-box;
                padding-left: 20px;
                background: #fff;
                border-bottom: 1px solid $home-border;
                span {
                    width: 20%;
                    display: inline-block;
                    text-align: left;
                }
                input {
                    width: 30%;
                    display: inline-block;
                    text-align: center;
                    padding: 10px;
                    box-sizing: border-box;
                    margin-right: 5%;
                    border: none;
                }
                a {
                    width: 40%;
                    color: $home-red-color;
                    border-left: 1px solid $home-border;
                    display: inline-block;
                    text-align: center;
                }
            }
            &>a {
                @include common-btn;
                width: 90%;
                margin: 35px auto;
                position: relative;
                border-radius: 0;
            }
        }
        form.step-3 {
            .input-p input {
                width:55%;
            }
            .spe {
                position: relative;
                border-top:1px solid $home-border;
                a {
                    display: block;
                    float: right;
                    height: 54px;
                    width: 54px;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
    }
</style>