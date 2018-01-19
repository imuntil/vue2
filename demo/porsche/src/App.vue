<template>
  <div id="app">
    <show></show>
    <upload :src.sync="src"></upload>
    <!-- <upload-file :src="src" :upload="upload" size="mini"></upload-file> -->
    <upload-image :src="src" :upload="upload" size="mini"></upload-image>
    <a href="javascript:;" @click="handleClick">change</a>
    <br>
    <upload-file :on-change="handleChange"></upload-file>
  </div>
</template>

<script>
import Show from "./components/Show.vue"
import Upload from "./components/Upload.vue"
// import UploadFile from './components/UploadFile/UploadFile.vue'

import blue from "./assets/blue.jpg"
import v from "./assets/sh-takigen.jpg"
export default {
  name: "app",
  data () {
    return {
      // src: 'http://101.37.117.111:8080/takigenApi/upload/9deac877-2bc8-47e4-9c2a-33b3966b3cea.jpeg'
      src: blue
    }
  },
  components: {
    Show,
    Upload
    // ,
    // UploadFile
  },
  methods: {
    upload (file) {
      console.log(file)
    },
    handleClick () {
      this.src = v
    },
    handleChange (file) {
      console.log(file)
    }
  }
}
</script>

<style>
html,
body {
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  outline: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
