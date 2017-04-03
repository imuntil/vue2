<template>
    <div class="main-container avatar-page">
        <div class="a-group">
            <ul>
                <li>
                    <a href="javascript:;" :class="{chosen: chosen == 1}" @click="choose(1)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img src="src/img/avatar-1.jpg" alt="" width="100%">
                    </a>
                </li>
                <li>
                    <a href="javascript:;" :class="{chosen: chosen == 2}" @click="choose(2)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img src="src/img/avatar-2.jpg" alt="" width="100%">
                    </a>
                </li>
                <li>
                    <a href="javascript:;" :class="{chosen: chosen == 3}" @click="choose(3)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img src="src/img/avatar-3.jpg" alt="" width="100%">
                    </a>
                </li>
                <li>
                    <a href="javascript:;" :class="{chosen: chosen == 4}" @click="choose(4)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img src="src/img/avatar-4.jpg" alt="" width="100%">
                    </a>
                </li>
            </ul>
        </div>
        <div class="a-group">
            <ul>
                <li>
                    <a href="javascript:;" :class="{chosen: chosen == 5}" @click="choose(5)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img src="src/img/avatar-5.jpg" alt="" width="100%">
                    </a>
                </li>
                <li>
                    <a href="javascript:;" :class="{chosen: chosen == 6}" @click="choose(6)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img src="src/img/avatar-6.jpg" alt="" width="100%">
                    </a>
                </li>
                <li>
                    <a href="javascript:;" :class="{chosen: chosen == 7}" @click="choose(7)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img src="src/img/avatar-7.jpg" alt="" width="100%">
                    </a>
                </li>
                <li>
                    <a href="javascript:;" :class="{chosen: chosen == 8}" @click="choose(8)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img src="src/img/avatar-8.jpg" alt="" width="100%">
                    </a>
                </li>
            </ul>
        </div>
        <div class="a-group">
            <ul>
                <li>
                    <a href="javascript:;" :class="{chosen: chosen == 9}" @click="choose(9)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img src="src/img/avatar-9.jpg" alt="" width="100%">
                    </a>
                </li>
                <li v-show="base64Data">
                    <a href="javascript:;" :class="{chosen: chosen == 10}" @click="choose(10)">
                        <img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">
                        <img :src="base64Data" alt="" width="100%">
                    </a>
                </li>
                <!--<li class="customed" ng-show="avatar.length > 2">-->
                    <!--<a href="javascript:;"-->
                       <!--@click="choose(-1)"-->
                       <!--:class="{chosen: chosen == -1 && avatar.length > 2 }">-->
                        <!--<img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">-->
                        <!--<img ng-src="{{avatar}}" alt="" width="100%">-->
                    <!--</a>-->
                <!--</li>-->
                <!--<li class="custom" ng-show="chosen === 0 || base64s">-->
                    <!--<a href="javascript:;"-->
                       <!--ng-repeat="item in uploader.queue" ng-thumb="item" thumb-size="'150'" base64s="base64s"-->
                       <!--:class="{chosen: chosen == 0}" @click="chosen = 0">-->
                        <!--&lt;!&ndash;<img class="img-chosen" src="src/img/avatar-chosen.png" alt="" width="100%">&ndash;&gt;-->
                        <!--&lt;!&ndash;<img class="custom-avatar" src="" alt="" width="100%">&ndash;&gt;-->
                    <!--</a>-->
                <!--</li>-->
                <li>
                    <a href="javascript:;" @click="cropperShow = true">
                        <img src="src/img/add-avatar.png" alt="" width="100%">
                    </a>
                </li>
            </ul>
        </div>

        <!--<vue-core-image-upload-->
                <!--crop-ratio="1:1"-->
                <!--:max-height="maxHeight"-->
                <!--:max-width="maxWidth"-->
                <!--v-bind:class="['pure-button','pure-button-primary','js-btn-crop']"-->
                <!--v-bind:crop="true"-->
                <!--extensions="png,gif,jpeg,jpg"-->
                <!--v-on:transcodinged="transcodinged"-->
                <!--v-on:imageuploaded="imageuploaded">-->
        <!--</vue-core-image-upload>-->
        <transition name="fadeInOut" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
            <cropper-avatar v-show="cropperShow"
                            :size="200"
                            v-on:base64Data="gotData"
                            v-on:closeCropper="cropperShow = false"></cropper-avatar>
        </transition>

        <a href="javascript:;" class="save" @click="save()">保存</a>
    </div>
</template>
<script>
    import VueCoreImageUpload   from '../../components/vue.core.image.upload.vue'
    import CropperAvatar from '../../components/cropper-avatar.vue'
    import {USER_MODIFY_AVATAR_A} from '../../javascripts/constant'

    export default {
        components:{
            VueCoreImageUpload ,
            CropperAvatar,
        },
        data() {
            return {
                chosen: this.$store.state.user.user.imgname || 1,
                src:'src/img/avatar-9.jpg',
                maxHeight: 200,
                maxWidth: 220,

                cropperShow:false,
                base64Data:undefined,
            }
        },
        methods:{
            choose(index) {
                this.chosen = index;
            },
            save() {
                let avatar = this.$store.state.user.user.usersid + '.png';
                if (this.chosen <= 9) {
                    avatar = this.chosen;
                }
                this.$store.dispatch(USER_MODIFY_AVATAR_A, avatar);
                this.$router.replace('user');
            },
//            imageuploaded() {
//
//            },
//            transcodinged(data) {
//                this.src = data;
//            },
            gotData(data) {
                this.base64Data = data;
                this.cropperShow = false;
                this.chosen = 10;
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../stylesheets/common";
    @import '../../stylesheets/animate.min.css';
    .avatar-page {
        .a-group {
            width:100%;
            &:first-child {
                margin-top:20px;
            }
            border-bottom:1px solid $order-border-color;
            border-top:1px solid $order-border-color;
            background-color: #fff;
        }
        ul {
            width:90%;
            display: flex;
            flex-wrap: wrap;
            justify-content:flex-start;
            margin:0 auto;
            padding:15px 0;
        }
        li {
            width: 25%;
            padding: 1%;
            box-sizing: border-box;
            position: relative;
            a {
                display: block;
                width: 100%;
                border-radius: 50%;
                overflow: hidden;
                &.chosen .img-chosen {
                    display: block;
                }
            }
        }
        img {
            width:100%;
            &.img-chosen {
                position: absolute;
                margin:-3% 0 0 -3%;
                display: none;
            }
        }

        a.save {
            @include common-btn;
            width: 90%;
            margin: 35px auto;
            position: relative;
            border-radius: 0;
        }
    }
</style>