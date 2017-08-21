<template>
  <header>
    <ul>
      <li>
        <router-link :to="{name: 'home'}">Home</router-link>
      </li>
      <li>
        <router-link :to="{name: 'introduce'}">About Us</router-link>
      </li>
      <li>
        <router-link :to="{name: 'products'}">Products</router-link>
      </li>
      <li>
        <router-link :to="{name: 'news'}">News</router-link>
      </li>
      <li>
        <router-link :to="{name: 'contract'}">Contract Us</router-link>
      </li>
    </ul>
  </header>
</template>
<script>
  export default {

  }
</script>
<style type="text/scss" lang="scss" scoped>
  ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 5rem;
    background-color: #aaaaaa;
    li {
      padding: .5rem 1rem;
      color: #ffffff;
    }
  }
</style>
