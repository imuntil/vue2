<template>
  <div class="zh-upload" :class="{auto: src}">
    <!-- <el-button type="text" class="add-btn" size="medium" icon="el-icon-plus"></el-button> -->
    <i class="el-icon-plus big"></i>
    <input class="file" @change="handleFileChange" type="file" accept="image/*">
    <div class="preview">
      <img :src="src" alt="">
    </div>
  </div>
</template>
<script>
export default {
  props: ['src'],
  methods: {
    async handleFileChange (e) {
      const file = e.target.files[0]
      // this.handleFile(file)
      if (file) {
        const path = await this.uploadImg(file)
        path && this.$emit('upload:src', path)
      }
    },
    async uploadImg (file) {
      // const fd = new FormData()
      // fd.append('photo', file)
      // const { err, data } = await uploadPhoto({ fd })
      // if (err || data.code !== 200) return false
      // console.log(data)
      // return baseUrl + '/upload/' + data.result
    }
  }
}
</script>
<style lang="scss" scoped>
.zh-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: 0;
  background-color: #fbfbfb;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 70px;
  line-height: 146px;
  vertical-align: top;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #3e515b;
  }
}
.file,
.preview {
  position: absolute;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  left: 0;
  top: 0;
  img {
    width: 100%;
  }
}
.file {
  z-index: 10;
  opacity: 0;
}
.add-btn {
  background-color: rgba(255, 255, 255, 0.25);
}
i.big {
  font-size: 1.5rem;
  color: #409eff;
  width: 24px;
  height: 24px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 9;
}
</style>


