<template>
  <div class="wrapper" >
    <transition leave-active-class="animated bounceOut">
      <div class="wrapper stage" v-show="!play">
        <a href="javascript:;" class="video-play animated pulse" @click="run">
          <img src="../assets/play.png" alt="">
        </a>
        <img class="masker" src="/static/masker.jpg" alt="">
      </div>
    </transition>

    <!--<video src="http://api.jtuntech.com/event/2017/test/final.mp4" preload="auto"-->
    <!--x5-video-player-type="h5" x5-video-player-fullscreen="true"-->
    <video id="video" src="/static/v-640.mp4" preload="auto"
           x5-video-player-type="h5" x5-video-player-fullscreen="true"
           x-webkit-airplay="deny" webkit-playsinline playsinline></video>
  </div>
</template>
<script>
//  import Hammer from '../../static/vendor/hammer.min'
  export default {
    data () {
      return {
        play: false,
        video: null,
        canPlay: false,
        stage: null,
        jump: false
      }
    },
    methods: {
      run () {
        let that = this
//        that.__toggleAJ()
        that.video.play()
        setTimeout(function () {
          that.play = true
        }, 500)
      },
      __end () {
        this.play = false
        alert('end')
      },
      __start () {
        alert('start')
      },
//      __init () {
//        let stage = new Hammer(this.stage)
//        let that = this
//        stage.get('swipe').set({
//          direction: Hammer.DIRECTION_VERTICAL
//        })
//        stage.on('swipeup', function (e) {
//          e.preventDefault()
//          that.run()
//        })
//      },
      __toggleAJ () {
        let that = this
        if (!that.video.paused) return
        that.jump = true
        setTimeout(function () {
          that.jump = false
        }, 500)
      },
      __bind () {
        this.video = document.querySelector('#video')
        this.stage = document.querySelector('.stage')
        this.video.addEventListener('ended', this.__end, false)
        this.video.addEventListener('pause', () => {
          this.play = false
        }, false)
        this.video.load()
      }
    },
    mounted () {
      this.__bind()
//      this.__init()
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  img.masker {
    position: absolute;
    z-index: 11;
  }
  .wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .stage {
    position: absolute;
    z-index: 10;
  }
  video {
    /*height: 1138px;*/
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 5;
    cursor: pointer;
    background-color: #fff;
  }
  .video-play {
    width: 80px;
    height: 80px;
    position: absolute;
    z-index: 12;
    left: 0;
    top: 50%;
    right: 0;
    margin: 0 auto;
    animation-iteration-count: infinite;
    img {
      width: 100%;
    }
  }
</style>
