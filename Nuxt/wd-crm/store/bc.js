// breadcrumb
import { breads } from '~/assets/lib/constant'

function gen (name, path) {
  return { name, path }
}
const routes = {
  home: [],
  proList: [gen('产品列表')],
  proDetail: [gen('产品列表', '/products'), gen('产品详情')],
  proEdit: [gen('产品列表', '/products'), gen('产品编辑')],
  proAdd: [gen('添加产品')]
}

export const state = () => ({
  breads: []
})

export const mutations = {
  [breads.UPDATE_BREADS] (state, payload) {
    state.breads = routes[payload.bread]
  }
}
