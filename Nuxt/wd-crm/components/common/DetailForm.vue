<template>
  <el-form class="edit-form" label-width="120px">
    <el-form-item label="SKU">
      <el-input :disabled="editing" v-model="form.sku"></el-input>
    </el-form-item>
    <el-form-item label="品类">
      <el-select v-model="form._type">
        <el-option v-for="item in originTypes" :key="item.value"
                   :label="item.text" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="中文名">
      <el-input v-model="form.cn"></el-input>
    </el-form-item>
    <el-form-item label="英文名">
      <el-input v-model="form.en"></el-input>
    </el-form-item>
    <el-form-item label="图片">
      <zh-upload :sku="sku" :images.sync="form.images"></zh-upload>
    </el-form-item>
    <el-form-item label="价格">
      <el-input-number v-model="form.price" :controls="false"></el-input-number>
    </el-form-item>
    <el-form-item label="是否打折">
      <el-radio-group v-model="form.setToSales">
        <el-radio :label="0">不打折</el-radio>
        <el-radio :label="1">优惠价</el-radio>
        <el-radio :label="2">%折扣</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="优惠价" v-show="form.setToSales === 1">
      <el-input-number v-model="form.discounted" :controls="false" :min="0" :max="form.price"></el-input-number>
    </el-form-item>
    <el-form-item label="折扣额度" v-show="form.setToSales === 2" class="sp-form-item">
      <el-slider v-model="form.off" :step="0.01" :min="0.01" :max="0.99" style="width: 80%;"></el-slider>
      <p class="sp-off"><span>{{`${(form.off * 100).toFixed(0)}%`}}</span> Off</p>
    </el-form-item>
    <el-form-item label="真实售价">
      <el-input disabled :value="`￥${mf(truePrice)}`"></el-input>
    </el-form-item>
    <el-form-item label="酒精度(°)">
      <el-input-number v-model="form.alcoholic" :controls="false" :max="100"></el-input-number>
    </el-form-item>
    <el-form-item label="净含量(ml)">
      <el-input-number v-model="form.content" :controls="false"></el-input-number>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input-number v-model="form.weight" :controls="false"></el-input-number>
    </el-form-item>
    <el-form-item label="产地">
      <el-select v-model="form.origin">
        <el-option v-for="o in origins" :key="o" :value="o"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="销量" v-if="editing">
      <el-input-number v-model="form.sales" disabled :controls="false"></el-input-number>
    </el-form-item>
    <el-form-item label="收藏数" v-if="editing">
      <el-input-number v-model="form.like" disabled :controls="false"></el-input-number>
    </el-form-item>
    <el-form-item label="入车数" v-if="editing">
      <el-input-number v-model="form.cart" disabled :controls="false"></el-input-number>
    </el-form-item>
    <el-form-item label="库存">
      <el-input-number v-model="form.stock" :controls="false"></el-input-number>
    </el-form-item>
    <el-form-item label="添加日期" v-if="editing">
      <el-input :value="form.date" disabled></el-input>
    </el-form-item>
    <el-form-item label="上次更新" v-if="editing">
      <el-input :value="form.update" disabled></el-input>
    </el-form-item>
    <el-form-item label="产品介绍">
      <quill-editor :content.sync="form.introduce" :sku="sku"></quill-editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {
    Form,
    Input,
    InputNumber,
    FormItem,
    Switch,
    Radio,
    RadioGroup,
    Slider,
    Upload,
    Select,
    Option,
    Button
  } from 'element-ui'
  import ZhUpload from '~/components/common/ZhUpload'
  import QuillEditor from '~/components/common/QuillEditor'
  import { mapState } from 'vuex'
  import { moneyFormat } from '~/assets/lib/common-tools'

  export default {
    components: {
      ElForm: Form,
      ElInput: Input,
      ElInputNumber: InputNumber,
      ElSwitch: Switch,
      ElRadio: Radio,
      ElRadioGroup: RadioGroup,
      ElSlider: Slider,
      ElUpload: Upload,
      ElFormItem: FormItem,
      ElSelect: Select,
      ElOption: Option,
      ElButton: Button,
      ZhUpload,
      QuillEditor
    },
    props: ['editing', 'sku', 'clone-form'],
    data () {
      return {
        form: {}
      }
    },
    computed: {
      ...mapState('config', ['originTypes', 'origins']),
      truePrice () {
        const { setToSales, discounted, off, price } = this.form
        switch (setToSales) {
          case 0:
            return price
          case 1:
            return discounted
          case 2:
            return price * (1 - off)
          default:
            return price
        }
      }
    },
    methods: {
      mf: moneyFormat,
      save () {
        this.$emit('on-save', { ...this.form })
      },
      cancel () {
        this.$emit('on-cancel')
      }
    },
    created () {
      this.form = { ...this.cloneForm }
    }
  }
</script>
<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

</style>
