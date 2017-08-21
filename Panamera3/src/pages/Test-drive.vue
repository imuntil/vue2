<template>
  <div class="wrapper">
    <div class="main-container">
      <ul>
        <li>
          <router-link :to="{name: 'td-task'}"></router-link>
        </li>
        <li>
          <router-link :to="{name: 'td-test'}"></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style type="text/scss" lang="scss" scoped>
@import "../styles/theme";
  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    li {
      height: 50%;
      border-bottom: 5px solid $common-red;
      a {
        display: block;
        height: 100%;
      }
    }
    li:first-child {
      background: url("../assets/td-1.jpg") no-repeat left center;
      background-size: cover;
    }
    li:last-child {
      background: url("../assets/td-2.jpg") no-repeat left center;
      background-size: cover;
      border-bottom: none;
    }
  }
</style>
