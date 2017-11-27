import Vue from 'vue'
import { Message, Loading, MessageBox, Notification } from 'element-ui'

Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
