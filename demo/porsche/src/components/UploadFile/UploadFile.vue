<template>
  <div class="upload-file-wrapper">
    <a href="javascript:;" class="upload-btn">
      选取文件
      <input type="file" class="input" @change="handleFileChange" :accept="accept">
    </a>
    <span class="file-name">
      {{file.name}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: '*'
    },
    onChange: {
      type: Function,
      require: true
    }
  },
  data () {
    return {
      file: {}
    }
  },
  methods: {
    handleFileChange (e) {
      this.file = e.target.files[0]
      this.onChange(this.file)
    }
  }
}
</script>

<style lang="scss" scoped>
div.upload-file-wrapper {
  display: inline-block;
}
a.upload-btn {
  position: relative;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #2b9cfa;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  display: inline-block;
  input.input {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.file-name {
  font-size: .8rem;
  font-weight: normal;
  margin-left: 10px;
}
</style>

