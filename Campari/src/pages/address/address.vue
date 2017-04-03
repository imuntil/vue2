<template>
    <div class="wrapper">
        <div class="out-container">
            <div class="main-container address-page">
                <div class="section" v-for="adr in allAdrs" :key="adr.id" :class="{oning:chosenAdr.id == adr.id && from === 'order'}">
                    <div class="box-1" @click="setChosenAdr(adr)">
                        <p>{{adr.name}} <em>{{adr.phone}}</em></p>
                        <p>{{adr.province}}{{adr.city}}{{adr.detail}}</p>
                    </div>
                    <div class="box-2">
                        <div class="g-l">
                            <a class="default"
                               @click="setDefault(adr)"
                               :class="{yes:adr.isDefault}" href="javascript:void(0);">
                                <i></i>
                                默认地址
                            </a>
                        </div>
                        <div class="g-r">
                            <a class="editing"
                               @click="deleteAdr(adr)"
                               href="javascript:void(0);">
                                删除
                            </a>
                            <a href="javascript:void(0);"
                               @click="toEditAdr(adr)"
                               class="editing">
                                编辑
                            </a>
                        </div>
                    </div>
                </div>
                <router-link :to="{name:'editAdr', params:{status:'add'}}" class="add">添加收货地址 <span>❯</span></router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import * as type from '../../javascripts/constant'
    export default{
        data() {
            return {
                from: this.$route.params.from
            }
        },
        computed:{
            allAdrs() {
                return this.$store.state.address.all;
            },
            chosenAdr() {
                return this.$store.state.address.chosenAdr;
            }
        },
        methods:{
            setDefault(adr) {
                this.$store.commit(type.ADR_SET_DEFAULT_ADDRESS, adr)
            },
            setChosenAdr(adr) {
                if (this.from !== 'order') return;
                this.$store.commit(type.ADR_SET_CHOSEN_ADDRESS, adr);
                this.$router.go(-1);
            },
            deleteAdr(adr) {
                this.$store.commit(type.ADR_DELETE_ADDRESS, adr)
            },
            toEditAdr(adr) {
                this.$store.commit(type.ADR_SET_EDIT_ADDRESS, adr);
                this.$router.push({name:'editAdr', params:{status:'update', id: adr.id}})
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../stylesheets/common";
    .address-page {
        position: relative;
        .section{
            display: flex;
            flex-direction:column;
            padding:0 5%;
            box-sizing: border-box;
            background-color: #fff;
            margin-top:15px;
            border-top:1px solid $home-border;
            border-bottom:1px solid $home-border;
            &.oning {
                border:1px solid $home-red-color;
            }
            div.box-1, div.box-2 {
                padding:15px 0;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-size:$font-size;
            }
            .box-1 {
                flex-direction:column;
                flex:1 1 60%;
                border-bottom:1px solid $f6-border-color;
                em {
                    font-style: normal;
                    margin-left: 20px;
                }
                p {
                    margin-top:9px;
                }
            }
            .box-2 {
                flex-direction:row;
                flex:1 1 40%;
                justify-content:flex-end;
                display: flex;
                div {
                    display: flex;
                }
                div.g-l {
                    justify-content:flex-start;
                    flex:1 1 40%;
                }
                div.g-r {
                    justify-content:flex-end;
                    flex:1 1 60%
                }
                a {
                    color: #000;
                    display: inline-block;
                }
                .editing {
                    padding:5px 20px;
                    border:1px solid #000;
                    border-radius: 2px;
                    margin-left:10px;
                }
                .default {
                    display: flex;
                    justify-content:flex-start;
                    align-items: center;
                    padding:0 2px;
                    i {
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
        a.add {
            display: block;
            width: 100%;
            text-align: left;
            font-size: 0.9rem;
            color: #000;
            padding: 20px;
            background: #fff;
            margin-top: 15px;
            border: 1px solid $home-border;
            box-sizing: border-box;
            span {
                float: right;
            }
        }
    }
</style>