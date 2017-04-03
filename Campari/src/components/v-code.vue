<template>
    <a class="v-code"
       @click="handle"
       :style="style"
       href="javascript:void(0);">
        {{running ? time : text}}
    </a>
</template>
<script>
    import config from '../javascripts/config'
    import swal from 'sweetalert'
    export default {
        props:{
            limit:{
                type:Number,
                default:60
            },
            can:{
                required:true
            },
            verified:[Boolean],
            text:{
                type:String,
                default:'发送验证码'
            }
        },
        data() {
            return {
                requesting: false,   //开始请求接口
                running: false,       //开始倒计时
                inLimit:0,
                style:{}
            }
        },
        computed: {
            time() {
                return this.inLimit + 's'
            }
        },
        methods:{
            handle() {
                let self = this;
                if (!self.can) {
                    swal('', '请输入正确的手机号', 'warning');
                    return
                }
                if (!self.verified) {
                    //正在验证手机号
                    self.$toasted.show('正在验证手机号码，请稍等', {
                        theme: "outline",
                        position: "top-center",
                        duration : 1200
                    });
                    return;
                }

                if (self.running) {return;}
                self.running = true;

                self.$emit('onRun');
                self.stopWatch();

            },
            stopWatch() {
                let self = this;
                self.inLimit = self.limit;

                //按钮不可点击
                self.style = {
                    background:'rgba(0,0,0,0.4)',
                    border:'2px solid #666',
                    color:'#aaa'
                };

                let interval = setInterval(() => {
                    self.inLimit --;
                    if (self.inLimit === 0) {
                        clearInterval(interval);

                        self.running = false;
                        self.style = {};
                    }
                    console.log(self.inLimit);
                }, 1000);
            }
        }
    }
</script>
