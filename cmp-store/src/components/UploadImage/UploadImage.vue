<template>
  <div :class="['zh-upload', size]">
    <i class="icon-plus" :class="{transparent: !!src}"></i>
    <input type="file" class="file" @change="handleFileChange" accept="image/*">
    <div class="preview">
      <img ref="img" :class="{v: vertical}" :src="src" alt="" @load="handleImageLoad">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    // 上传图片的方法
    upload: {
      type: Function,
      required: true
    },
    size: {
      type: String,
      defalut: 'big'
    }
  },
  data () {
    return {
      vertical: false
    }
  },
  methods: {
    handleFileChange (e) {
      const file = e.target.files[0]
      if (file) {
        this.upload(file)
      }
    },
    handleImageLoad (e) {
      const img = this.$refs.img
      const { naturalWidth, naturalHeight } = img
      this.vertical = naturalWidth > naturalHeight
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
  height: 148px;
  vertical-align: top;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #3e515b;
    .icon-plus {
      opacity: 1;      
    }
    .icon-plus::before, .icon-plus::after {
      background-color: #3e515b;
    }
  }
}
.zh-upload.small {
  width: 100px;
  height: 100px;
}
.zh-upload.mini {
  width: 60px;
  height: 60px;
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
    height: auto;
  }
  img.v {
    height: 100%;
    width: auto;
  }
}
.file {
  z-index: 10;
  opacity: 0;
}
.icon-plus {
  // background: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDAwMDAwIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSAxM2gtNnY2aC0ydi02SDV2LTJoNlY1aDJ2Nmg2djJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==) no-repeat center center;
  // background-size: cover;
  width: 30px;
  height: 30px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  &::before, &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: #c0ccda;
    top: 0;
    left: 0;
  }
  &::before {
    height: 2px;
    top: 14px;
  }
  &::after {
    width: 2px;
    left: 14px;
  }
  &.transparent {
    opacity: 0;
  }
}
</style>


