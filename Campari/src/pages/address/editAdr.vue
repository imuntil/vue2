<template>
    <div class="wrapper gray">
        <div class="main-container edit-page">
            <form action="" class="f-s" name="ef">
                <div class="input-group">
                    <p class="input-p">收货人
                        <input type="text"
                               name="name"
                               v-model="editing.name"
                               v-validate:name.initial="'required|min:2'"
                               :class="{'shaking': errors.has('name') && submit, 'animated':true}"
                               maxlength="15"
                               placeholder="请输入收货人姓名">
                    </p>
                    <p class="input-p">手机号
                        <input type="tel"
                               name="phone"
                               v-model="editing.phone"
                               v-validate:phone.initial="'required|phone'"
                               :class="{'shaking': errors.has('phone') && submit, 'animated':true}"
                               maxlength="11"
                               placeholder="请输入收货人手机号">
                    </p>
                </div>
                <div class="address">
                    <div class="group">
                        <p class="animated"
                           :class="{shaking:submit && !editing.city}"
                           @click.stop.prevent="selectorShow = !selectorShow">所在地区
                            <span v-show="editing.city">{{editing.province}}-{{editing.city}}</span>
                            <span v-show="!editing.city">请选择&nbsp;❯</span>
                        </p>
                        <textarea placeholder="请填写详细地址"
                                  v-model="editing.detail"
                                  maxlength="50"
                                  v-validate:address.initial="'required'"
                                  :class="{'shaking':submit && errors.has('address'), 'animated':true}"
                                  name="address" id="" cols="30" rows="4">

                        </textarea>
                    </div>
                    <a href="javascript:;"
                       @click="editing.isDefault ? editing.isDefault = 0 : editing.isDefault = 1"
                       :class="{yes: editing.isDefault, default:true}">
                        <i></i>
                        设为默认地址
                    </a>
                </div>
                <a href="javascript:void(0);" @click="save()">保存</a>
                <a href="javascript:void(0);"
                   @click="cancel()"
                   style="background: #969696;margin-bottom: 0;">取消</a>
            </form>
            <transition name="selectorIn"
                        leave-active-class="animated bounceOutRight"
                        enter-active-class="animated bounceInRight">
                <city-selector v-on:selectorHide="selectorHide" v-show="selectorShow"></city-selector>
            </transition>
        </div>
    </div>
</template>
<script>
    import CitySelector from '../../components/city-selector.vue'
    import _ from 'lodash'
    import * as type from '../../javascripts/constant'
    export default{
        components:{
            CitySelector
        },
        data() {
            return {
                editing:{
                    isDefault:0,
                    id:Math.random()
                },
                submit:false,
                cc:{},
                timer:undefined,
                selectorShow:false,
                mode: this.$route.params.status
            }
        },
        methods:{
            save() {
                let self = this;
                this.submit = true;
                this.$validator.validateAll()
                    .then(function () {
                        if (self.mode === 'add') {
                            self.$store.commit(type.ADR_ADD_ADDRESS, self.editing);
                        } else {
                            self.$store.commit(type.ADR_EDIT_ADDRESS, self.editing);
                        }

                        if (self.editing.isDefault) {
                            self.$store.commit(type.ADR_SET_DEFAULT_ADDRESS, self.editing);
                        }
                        clearEditing.bind(self)();
                        self.$router.go(-1);
                    })
                    .catch(err => {
                        console.log(err);
                        if (self.timer) {
                            console.log('timer');
                            clearInterval(self.timer);
                            self.timer = undefined;
                        }
                        self.timer = setTimeout(() => {
                            self.submit = false;
                        }, 600);
                    })
            },
            cancel() {
                clearEditing.bind(this)();
                this.$router.go(-1);
            },
            selectorHide(data) {
                this.editing = Object.assign(this.editing, data);
                this.selectorShow = false;
            },
        },
        created() {
            if (this.mode === 'update') {
                this.editing = this.$store.state.address.editingAdr;
            }
        }
    }

    function clearEditing() {
        this.$store.commit(type.ADR_SET_EDIT_ADDRESS, {});
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../stylesheets/animate.min.css";
    @import "../../stylesheets/common";
    .edit-page {
        .address {
            display: flex;
            flex-direction: column;
            margin-top: 15px;
            justify-content: center;
            .group {
                background: #fff;
                display: flex;
                flex-direction: column;
                border-bottom:1px solid $home-border;
            }
            p {
                padding:20px;
                border-top:1px solid $home-border;
            }
            textarea {
                width: 80%;
                align-self: center;
                margin: 10px 0;
                resize: none;
                border: none;
                padding: 5px;
                font:{
                    size:$font-size;
                    family: '微软雅黑', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                }
            }
            .default {
                margin-top: 15px;
                padding:18px;
                background: #fff;
                font-size: $font-size;
                border-bottom: 1px solid $home-border;
                border-top: 1px solid $home-border;
                display: flex;
                align-items:center;
                color: #000;
                i{
                    width: 25px;
                    height: 25px;
                    display: inline-block;
                    background: url(../../img/icons.png) no-repeat -53px 0px;
                    margin-right: 10px;
                }
            }
            .default.yes {
                i {
                    background-position: -8px 0;
                }
            }
        }
    }
</style>