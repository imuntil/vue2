<template>
       <div class="wrapper">
           <div class="main-container user-page gray">
               <header>
                   <div class="avatar-box">
                       <div class="avatar">
                           <img :src="userAvatar" alt="" width="100%">
                       </div>
                       <!--<a href="javascript:void(0);" class="edit-avatar">编辑头像</a>-->
                       <router-link to="modify-avatar" class="edit-avatar">编辑头像</router-link>
                   </div>
                   <router-link to="/modify-nick" class="nick">{{userNick}}</router-link>
               </header>
               <section>
                   <ul class="component-1">
                       <li>
                           <router-link to="/my-orders/unpaid">待付款<span>❯</span></router-link>
                       </li>
                       <li>
                           <router-link to="/my-orders/paid">待收货<span>❯</span></router-link>
                       </li>
                       <li>
                           <router-link to="/my-orders/all">全部订单<span>❯</span></router-link>
                       </li>
                   </ul>
                   <ul class="component-1">
                       <li>
                           <a href="/safe">账号安全<span>❯</span></a>
                       </li>
                       <li>
                           <!--<a href="/address">地址管理<span>❯</span></a>-->
                           <router-link to="address/user">地址管理<span>❯</span></router-link>
                       </li>
                   </ul>
               </section>
           </div>
       </div>
</template>
<script>
    import config from '../javascripts/config'
    import {USER_INFO} from '../javascripts/constant'
    export default {
        computed:{
            userAvatar() {
                let index = undefined;
                try {
                    index = this.$store.getters[USER_INFO].imgname;
                    if (parseInt(index) > 9) {
                        return config.avatarPath + index + '?' + Math.random();
                    } else {
                        return 'src/img/avatar-' + index + '.jpg';
                    }
                } catch (e) {
                    return 'src/img/float.jpg'
                }
            },
            userNick() {
                try {
                    return this.$store.getters[USER_INFO].name;
                } catch (e) {
                    return '';
                }

            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../stylesheets/common";
    .user-page{
        $size:80px;
        .avatar-box {
            overflow: hidden;
            position: relative;
        }
        header {
            @extend .avatar-box;
            background: url("../img/watermark.jpg") no-repeat;
            background-size: cover;
        }
        .avatar {
            width: $size;
            height: $size;
            display: block;
            margin:20px auto;
            overflow: hidden;
            border-radius: $size * 0.5;
        }
        .edit-avatar {
            position: absolute;
            top:0;
            bottom:0;
            margin:auto 0;
            display: block;
            font-size:.7rem;
            color: #555;
            height:20px;
            line-height:20px;
            left:66%;
        }
        .nick {
            width:100%;
            text-align: center;
            color: #000;
            font-size:1rem;
            padding:2px 0 25px;
            display: inline-block;
        }
    }
</style>