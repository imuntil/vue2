<template>
  <div class="container">
    <div class="nav">
      <p><img src="@/assets/logo.png" alt=""></p>
      <div class="nav-box">
        <a href="javascript:;"><img src="@/assets/nav-btn-left.png" alt=""></a>
        <ul class="nav-list">
          <li>
            <a href="javascript:;">品牌历史</a>
          </li>
          <li>
            <a href="javascript:;">车型亮点</a>
          </li>
          <li>
            <a href="javascript:;">竞品对比</a>
          </li>
          <li>
            <a href="javascript:;">测试</a>
          </li>
        </ul>
        <a href="javascript:;"><img src="@/assets/nav-btn-right.png" alt=""></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

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
    padding: 2.5%;
  }
  .nav-list li {
    display: block;
    width: 25%;
  }
  .nav-list a {
    color: #fff;
    text-decoration: none;
    font-size: 12px;
    display: block;
    text-align: center;
    padding: 5px 0;
    position: relative;
  }
  .nav-list a:before {
    content: '';
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: #8e0101;
    right: -2px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    transform: rotate(45deg);
  }
</style>
