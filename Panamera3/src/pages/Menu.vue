<template>
  <div class="wrapper">
    <div class="main-container">
      <ul class="menu-list">
        <li>
          <a href="javascript:;"></a>
        </li>
        <li>
          <router-link :to="{name: 'schedule'}"></router-link>
        </li>
        <li>
          <router-link :to="{name: 'activity'}"></router-link>
        </li>
        <li>
          <router-link :to="{name: 'introduction'}"></router-link>
        </li>
        <li>
          <router-link :to="{name: 'competing'}"></router-link>
        </li>
        <li>
          <router-link :to="{name: 'pictures'}"></router-link>
        </li>
        <li>
          <router-link :to="{name: 'drive'}"></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .main-container {
    padding:0;
    background: url("../assets/menu.jpg") no-repeat center;
    background-size:100% 100%;
    height:100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
  }
  .menu-list {
    width:100%;
    height:100%;
    position: relative;
    display: flex;
    flex-direction:column;
    li {
      height: 14.2857143%;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
