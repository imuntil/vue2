import Vue from 'vue'
import { Message, Loading, MessageBox } from 'element-ui'

Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$loading = Loading.service
