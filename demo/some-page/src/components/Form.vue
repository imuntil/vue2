<template>
  <div class="container">
    <el-form label-position="top" class="form" label-width="100px"
      size="small" :model="form" :rules="rules">
      <section class="clear">
        <span class="section-title">医院信息</span>
        <div class="content c1">
          <el-form-item label="名称:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label=" " required>
            <el-checkbox-group>
              <el-checkbox label="选项一" name="type"></el-checkbox>
              <el-checkbox label="选项二" name="type"></el-checkbox>
              <el-checkbox label="选项三" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </section>
      <section class="clear">
        <span class="section-title">申请人信息</span>
        <div class="content c2">
          <el-form-item label="申请人姓名:" required="required">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="电话:" required="required">
            <el-input></el-input>
          </el-form-item>
          <el-form-item class="mr0" label="患者主治医师:" required="required">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="传真:" required="required">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="申请日期:" required="required">
            <!-- <el-date-picker style="width: 200px" type="date" placeholder="年-月-日">
            </el-date-picker> -->
            <el-input type="date" class="date-input">
              <i class="iconfont" slot="suffix">&#xe60f;</i>
            </el-input>
          </el-form-item>
        </div>
      </section>
      <section class="clear">
        <span class="section-title">患者信息</span>
        <div class="content c3">
          <el-form-item label="患者姓名:" required="required">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="年龄:" required="required">
            <el-input></el-input>
          </el-form-item>
          <el-form-item class="mr0" label="性别:" required="required">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="体重 (kg):" required="required">
            <el-input></el-input>
          </el-form-item>
          <el-form-item class="mls" label="ABO 血型:" required="required">
            <el-radio label="1">A</el-radio>
            <el-radio label="1">B</el-radio>
            <el-radio label="1">AB</el-radio>
            <el-radio label="1">O</el-radio>
          </el-form-item>
          <el-form-item class="mr0" label="诊断 (病情):" required="required">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="HLA-A:" class="ptc">
            <el-input></el-input>
            <i>/</i>
            <el-input></el-input>
          </el-form-item>
          <br>
          <el-form-item label="HLB-B:" class="ptc">
            <el-input></el-input>
            <i>/</i>
            <el-input></el-input>
          </el-form-item>
          <br>
          <el-form-item label="HLC-DR:" class="ptc">
            <el-input></el-input>
            <i>/</i>
            <el-input></el-input>
          </el-form-item>
        </div>
      </section>
      <section class="clear">
        <span class="section-title">其他要求</span>
        <div class="content c4">
          <el-input type="textarea" :autosize="false" :rows="4"
            style="width: 100%">
          </el-input>
        </div>
      </section>
      <section class="clear">
        <span class="section-title" style="color: transparent;">x</span>
        <div class="content c5">
          <div>
            <a href="javascript:;" class="submit">提交</a>
            <p>
              <i class="iconfont">&#xe622;</i>数据更新日期：2017年6月1日 <br>
              <i class="iconfont">&#xe622;</i>请在传真件上写明您的联系方式（电话号码，传真号等），以便及时和您取得联系
            </p>
          </div>
          <div>
            <span>下载：</span> <br>
            <a href="javascript:;" class="download">脐带血移植配型申请表 脐带血移植申请</a>
          </div>
        </div>
      </section>
    </el-form>
    <div class="contract">
      <div class="split-box">
        <div class="box">
          <p class="title">了解更多脐带血移植、移植医院、移植医生等相关信息:</p>
          <p>地址 : 上海市虹桥路1191号(血液中心9楼)</p>
          <p>邮编 : 200051</p>
          <p>传真 : 86-21-3918-8911</p>
          <p>热线 : </p>
        </div>
        <div class="box">
          <img src="https://dummyimage.com/800x520?text=生命所托"
            width="400" alt="">
        </div>
      </div>
      <p>1381718-1815 (孔思静) E-mail: ksj@shanghaicordblood.org
        / 136-0179-7353 (邵夏炎) E-mail: sxy@shanghaicordblood.org</p>
      <a href="javascript:;">提示: 请通过“脐血编号”进行核对、咨询</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c-form',
    data () {
      return {
        form: {
          name: ''
        },
        rules: {
          name: [
            { required: true }
          ]
        }
      }
    }
  }
</script>
<style common lang="scss">
  .clear {
    &::after {
      content: '';
      display: block;
      clear: both;
      width: 0;
    }
    & > * {
      float: left;
    }
  }
</style>
<style lang="scss" scoped>
  .container {
    width: 1130px;
    margin: 0 auto;
    padding: 40px;
    box-sizing: border-box;
  }
  .form {
    border: 1px solid #ccc;
    padding: 80px 40px 50px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  }
  section:not(:last-child) {
    margin-bottom: 1.5em;
  }
  .section-title {
    font-size: 16px;
    color: #2ea7e0;
    line-height: 30px;
    width: 140px;
    text-align: left;
    padding-left: 2em;
    box-sizing: border-box;
  }
  .content {
    padding: 0 2em;
    width: calc(100% - 150px);
    box-sizing: border-box;
    & > * {
      display: inline-block;
      margin-right: 3.5em;
    }
    .mr0 {
      margin-right: 0;
    }
    .mls .el-radio:not(:first-child) {
      margin-left: 15px;
    }
    .date-input {
      width: 200px;
      input {
        appearance: none;
      }
    }
  }
  .c1 > *:first-child {
    width: 40%;
  }
  .c5 > div {
    * {
      display: inline-block;
      font-size: 14px;
    }
    .submit {
      text-decoration: none;
      color: #fff;
      background-color: #2ea7e0;
      line-height: 36px;
      width: 160px;
      text-align: center;
      border-radius: 5px;
    }
    p {
      margin: 0;
      line-height: 1.4;
      padding-left: 2em;
    }
    span {
      color: #2ea7e0;
    }
    .download {
      color: #666;
      padding-top: 0.5em;
      white-space: pre;
    }
  }
  .c5 > div:first-child {
    margin-bottom: 2.5em;
    & > * {
      float: left;
    }
    p {
      font-size: 13px;
    }
    i {
      font-size: 12px;
      padding-right: 0.4em;
      transform: scale(0.8);
      color: #666;
    }
  }
  .contract {
    margin: 3em 60px 0;
    font-size: 14px;
    .box {
      width: 49%;
      display: inline-block;
      p {
        padding: 1em 0;
        margin: 0;
      }
      .title {
        color: #2ea7e0;
        font-size: 15px;
      }
    }
    .box img {
      display: block;
      margin: auto;
      border-radius: 5px;
      margin-bottom: -1em;
    }
    & > p {
      white-space: pre;
    }
    a {
      display: block;
      text-decoration: none;
      text-align: center;
      line-height: 42px;
      border: 1px solid #bbb;
      border-radius: 5px;
      color: #333;
      margin-top: 3em;
    }
  }
</style>
<style lang="scss">
  .container {
    .el-form--label-top .el-form-item__label {
      padding-bottom: 0;
      line-height: 30px;
    }
    .el-form-item.is-required .el-form-item__label:before {
      display: none;
    }
    .el-form-item__content::after {
      content: '*';
      position: absolute;
      right: -1.5em;
      top: 0.2em;
      bottom: 0;
      box-sizing: border-box;
      font-size: 12px;
      color: #333;
    }
    .ptc .el-form-item__content > * {
      width: 148px;
      display: inline-block;
    }
    .ptc .el-form-item__content > i {
      width: auto;
      padding: 0 1em;
    }
  }
</style>
<style>
  @font-face {
    font-family: 'iconfont'; /* project id 660253 */
    src: url('//at.alicdn.com/t/font_660253_tq3tununxj8xgvi.eot');
    src: url('//at.alicdn.com/t/font_660253_tq3tununxj8xgvi.eot?#iefix')
        format('embedded-opentype'),
      url('//at.alicdn.com/t/font_660253_tq3tununxj8xgvi.woff') format('woff'),
      url('//at.alicdn.com/t/font_660253_tq3tununxj8xgvi.ttf') format('truetype'),
      url('//at.alicdn.com/t/font_660253_tq3tununxj8xgvi.svg#iconfont')
        format('svg');
  }
  .iconfont {
    font-family: 'iconfont';
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

