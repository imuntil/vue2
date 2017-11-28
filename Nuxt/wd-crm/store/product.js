import { product } from '~/assets/lib/constant'
import { fetchProList, modifyProDetail } from '~/assets/lib/api'
/* eslint-disable no-unused-vars */
import { delay } from '~/assets/lib/common-tools'
import _ from 'lodash'
import { schema, normalize } from 'normalizr'

export const state = () => ({
  lists: [],
  currentPage: 1,
  itemPerPage: 6,
  expired: false,
  skuList: [],
  store: {}
})

export const mutations = {
  [product.SAVE_PRODUCT_LIST] (state, payload) {
    const s = new schema.Entity('pros', undefined, {
      idAttribute: value => value.sku
    })
    const { result, entities: { pros } } = normalize(payload.lists, [s])
    state.lists = _.chunk(result, state.itemPerPage)
    state.skuList = result
    state.store = pros
    state.currentPage = 1
    state.expired = false
  },
  [product.UPDATE_PRO_LIST_PAGE] (state, payload) {
    state.currentPage = payload.currentPage
  },
  [product.SAVE_PRO_DETAIL] (state, payload) {
    const { sku, data } = payload
    state.store = { ...state.store, [sku]: data }
  }
}

export const actions = {
  async [product.FETCH_PRODUCT_LIST] ({ commit, state }, payload) {
    if (state.lists.length) return true
    const { err, fail, data } = await fetchProList()
    if (err || fail) return false
    commit({ type: product.SAVE_PRODUCT_LIST, lists: data.data })
    return true
  },
  async [product.MODIFY_PRO_DETAIL_A] ({ commit, state }, payload) {
    const { body, sku } = payload
    const { err, fail, data } = await modifyProDetail({ body })
    if (err || fail) return false
    commit({
      type: product.SAVE_PRO_DETAIL,
      data: data.data,
      sku: sku
    })
    return true
  }
}
