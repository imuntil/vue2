import { product } from '~/assets/lib/constant'
import { fetchProList } from '~/assets/lib/api'
/* eslint-disable no-unused-vars */
import { delay } from '~/assets/lib/common-tools'
import _ from 'lodash'
import { schema, normalize } from 'normalizr'

export const state = () => ({
  lists: [],
  currentPage: 1,
  itemPerPage: 6,
  expired: false
})

export const mutations = {
  [product.SAVE_PRODUCT_LIST] (state, payload) {
    state.lists = _.chunk(payload.lists, state.itemPerPage)
    state.currentPage = 1
    state.expired = false
  },
  [product.UPDATE_PRO_LIST_PAGE] (state, payload) {
    state.currentPage = payload.currentPage
  }
}

export const actions = {
  async [product.FETCH_PRODUCT_LIST] ({ commit, state }, payload) {
    if (state.lists.length) return true
    const { err, fail, data } = await fetchProList()
    if (err || fail) return false
    commit({ type: product.SAVE_PRODUCT_LIST, lists: data.data })
    return true
  }
}
