<template>
  <div class="wrapper">
    <div class="main-container">
      <div class="title">
        <img src="../assets/td-task-title.png" alt="">
      </div>
      <ul>
        <li>
          <a href="javascript:;">
            样版一
            <i>▼</i>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            样版二
            <i>▼</i>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            样版三
            <i>▼</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style type="text/scss" lang="scss" scoped>
  @import "../styles/theme";
  $size: 2.4rem;
  .main-container {
    background: url("../assets/td-task-bg.jpg") no-repeat center;
    background-size: cover;
  }
  .title {
    width: 25%;
    display: block;
    margin: 20% auto 15%;
  }
  ul {
    width: 100%;
    display: block;
    li {
      width: 70%;
      display: block;
      margin: 15% auto;

    }
    a {
      width: 100%;
      font-size: .9rem;
      color: #ffffff;
      background-color: #808080;
      display: flex;
      justify-content: center;
      align-items: center;
      height: $size;
      position: relative;
      padding-right: $size;
    }
    i {
      height:$size;
      width: $size;
      text-align: center;
      line-height: $size;
      background-color: $common-red;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
