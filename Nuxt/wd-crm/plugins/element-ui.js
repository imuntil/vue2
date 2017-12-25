/* eslint-disabel no-unused-vars */
import Vue from 'vue'
import {
  Message,
  Loading,
  MessageBox,
  Notification,
  Pagination,
  Table,
  TableColumn,
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
  Button,
  Autocomplete,
  Tag,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Dialog,
  Card,
  Popover,
  DatePicker,
  Badge
} from 'element-ui'
import ZhPopover from '../components/common/ZhPopover'

Vue.use(Loading.directive)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Slider)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Autocomplete)
Vue.use(Tag)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Popover)
Vue.use(DatePicker)
Vue.use(Badge)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$zp = ZhPopover
