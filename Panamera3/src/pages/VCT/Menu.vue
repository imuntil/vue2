<template>
  <div class="wrapper">
    <div class="main-container">
      <ul>
        <li>
          <router-link :to="{name: 'v-test', params: {model: 'audi'}}"></router-link>
        </li>
        <li>
          <router-link :to="{name: 'v-test', params: {model: 'bmw'}}"></router-link>
        </li>
        <li>
          <router-link :to="{name: 'v-test', params: {model: 'benz'}}"></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style type="text/scss" lang="scss" scoped>
  @import "../../styles/theme";
  ul {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    li {
      height: 33.3333333333%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border-bottom: 5px solid $common-red;
      a {
        display: block;
        height: 100%;
      }
    }
    li:first-child {
      background: url("../../assets/vct-menu-1.jpg") no-repeat left center;
      background-size: cover;
    }
    li:nth-child(2) {
      background: url("../../assets/vct-menu-2.jpg") no-repeat left center;
      background-size: cover;
    }
    li:nth-child(3) {
      background: url("../../assets/vct-menu-3.jpg") no-repeat left center;
      background-size: cover;
      border-bottom: none;
    }
  }
</style>
