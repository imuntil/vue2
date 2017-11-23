import { product } from '~/assets/lib/constant'
import { fetchProList } from '~/assets/lib/api'
/* eslint-disable no-unused-vars */
import { delay } from '~/assets/lib/common-tools'
import { schema, normalize } from 'normalizr'

export const state = () => ({
  list: []
})

export const mutations = {
  [product.SAVE_PRODUCT_LIST] (state, payload) {
    state.list = payload.list
  }
}

export const actions = {
  async [product.FETCH_PRODUCT_LIST] ({ commit, state }, payload) {
    if (state.list.length) return true
    const { err, fail, data } = await fetchProList()
    if (err || fail) return false
    commit({ type: product.SAVE_PRODUCT_LIST, list: data.data })
    return true
  }
}
