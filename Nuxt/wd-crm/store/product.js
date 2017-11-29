import { product } from '~/assets/lib/constant'
import { fetchProList, modifyProDetail, addNewPro, deletePro } from '~/assets/lib/api'
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
    const { lists, resetPage } = payload
    const s = new schema.Entity('pros', undefined, {
      idAttribute: value => value.sku
    })
    const { result, entities: { pros } } = normalize(lists, [s])
    state.lists = _.chunk(result, state.itemPerPage)
    state.skuList = result
    state.store = pros
    if (resetPage) state.currentPage = 1
    state.expired = false
  },
  [product.UPDATE_PRO_LIST_PAGE] (state, payload) {
    state.currentPage = payload.currentPage
  },
  [product.SAVE_PRO_DETAIL] (state, payload) {
    const { sku, data } = payload
    state.store = { ...state.store, [sku]: data }
  },
  [product.EXPIRE_PRODUCTS] (state, payload) {
    state.expired = true
  }
}

export const actions = {
  async [product.FETCH_PRODUCT_LIST] ({ commit, state }, payload) {
    if (!state.expired && state.lists.length) return true
    const { err, fail, data } = await fetchProList()
    if (err || fail) return false
    commit({ type: product.SAVE_PRODUCT_LIST, lists: data.data, resetPage: true })
    return true
  },
  async [product.MODIFY_PRO_DETAIL_A] ({ commit }, payload) {
    const { body, sku } = payload
    const { err, fail, data } = await modifyProDetail({ body })
    if (err || fail) return { err, fail }
    commit({
      type: product.SAVE_PRO_DETAIL,
      data: data.data,
      sku: sku
    })
    return { ok: true }
  },
  async [product.ADD_PRO_A] ({ commit }, payload) {
    const { err, fail } = await addNewPro({ body: payload.body, commit })
    if (err || fail) return { err, fail }
    commit({ type: product.EXPIRE_PRODUCTS })
    return { ok: true }
  },
  async [product.DELETE_PRODUCT_A] ({ commit, state }, payload) {
    const {err, fail} = await deletePro({sku: payload.sku})
    if (err || fail) return false
    const { sku } = payload
    const store = { ...state.store }
    delete store[sku]
    commit({ type: product.SAVE_PRODUCT_LIST, lists: Object.values(store) })
    return true
  }
}
