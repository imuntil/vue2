// breadcrumb
import { breads } from '~/assets/lib/constant'

function gen (name, path) {
  return { name, path }
}
const routes = {
  index: [],
  products: [gen('产品列表')],
  'products-sku': [gen('产品列表', '/products'), gen('产品详情')],
  'products-sku-edit': [gen('产品列表', '/products'), gen('产品编辑')],
  'products-add': [gen('添加产品')],
  user: [gen('用户列表')],
  order: [gen('订单列表')]
}

export const state = () => ({
  breads: []
})

export const mutations = {
  [breads.UPDATE_BREADS] (state, payload) {
    state.breads = routes[payload.bread] || []
  }
}
