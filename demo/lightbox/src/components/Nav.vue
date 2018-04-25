<template>
  <div class="container">
    <div class="nav">
      <transition-group tag="p" class="logo-box" mode="out-in" :name="name" v-touch:left.stop.prevent="handlePrev" v-touch:right.stop.prevent="handleNext">
        <img v-for="i in [0,2,4,6]" v-if="i === current" :key="i" src="@/assets/logo.png" alt="">
      </transition-group>
      <div class="nav-box">
        <a href="javascript:;" @click="handlePrev"><img src="@/assets/nav-btn-left.png" alt=""></a>
        <ul class="nav-list">
          <li v-for="(v, i) in nav" :key="i" :class="{active: i === current}" @click="handleClick(i)">
            <a v-if="v" href="javascript:;">{{v}}</a>
          </li>
        </ul>
        <a href="javascript:;" @click="handleNext"><img src="@/assets/nav-btn-right.png" alt=""></a>
      </div>
    </div>
  </div>
</template>

<script>
  const delay = time => new Promise(resolve => setTimeout(() => {
    resolve()
  }, time))
  export default {
    data () {
      return {
        nav: ['品牌历史', '', '车型亮点', '', '竞品对比', '', '测试'],
        current: 0,
        name: 'fade'
      }
    },
    methods: {
      async handleClick (i) {
        if (!this.nav[i]) return
        this.current = i
        await delay(250)
        alert('x')
      },
      async handlePrev () {
        this.name = 'fade'
        await delay(50)
        const c = this.current - 2
        this.current = c < 0 ? this.nav.length - 1 : c
      },
      async handleNext () {
        this.name = 'fb'
        await delay(50)
        const c = this.current + 2
        this.current = c > this.nav.length ? 0 : c
      }
    }

  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #000;
    display: flex;
    justify-content: center;
  }
  img {
    width: 100%;
  }
  .nav {
    width: 85%;
  }
  .nav-box,
  .nav-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-list {
    list-style: none;
  }
  .nav-box > a {
    width: 10%;
    opacity: 0.5;
  }
  .nav-list {
    flex: 1;
    padding: 2%;
  }
  .nav-list a {
    color: #fff;
    text-decoration: none;
    font-size: 12px;
    display: block;
    text-align: center;
    padding: 4px;
    position: relative;
    transition: font-size 0.25s;
    white-space: nowrap;
  }
  .nav-list li:empty {
    width: 3px;
    height: 3px;
    background-color: #8e0101;
    transform: rotate(45deg);
    display: inline-block;
  }
  .nav-list .active a {
    font-size: 15px;
  }
  .logo-box {
    width: 90%;
    position: relative;
    margin: 0 5%;
    padding-top: 50%;
  }
  .logo-box img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    display: block;
  }
</style>
<style lang="scss">
/* 页面切换动画 */
$t: 30px;
.fade-enter-active,
.fade-leave-active,
.fb-enter-active,
.fb-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to,
.fb-enter,
.fb-leave-to {
  opacity: 0;
}
.fade-enter,
.fb-leave-to {
  transform: translate3d(-$t, $t, 0);
}
.fade-leave-to,
.fb-enter {
  transform: translate3d($t, $t, 0);
}
.fade-leave,
.fade-enter-to,
.fb-leave,
.fb-enter-to {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
