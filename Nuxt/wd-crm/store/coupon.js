import { coupon } from '../assets/lib/constant'
import { fetchCouponList, updateCoupon } from '../assets/lib/api'
import { normalize, schema } from 'normalizr'

export const state = () => ({
  idList: [],
  store: {}
})

export const mutations = {
  [coupon.SAVE_COUPON_LIST] (state, { result, entities }) {
    state.idList = result
    state.store = entities.list
  },
  [coupon.UPDATE_COUPON_LOCAL] (state, { data }) {
    const { kid } = data
    state.store = { ...state.store, [kid]: data }
  }
}

export const actions = {
  async [coupon.FETCH_COUPON_LIST] ({ commit }, payload) {
    const { err, fail, data } = await fetchCouponList()
    if (err || fail) return false
    const s = new schema.Entity('list', undefined, {
      idAttribute: v => v.kid
    })
    const res = normalize(data.data, [s])
    commit({ type: coupon.SAVE_COUPON_LIST, ...res })
  },
  async [coupon.UPDATE_COUPON_A] ({ commit }, payload) {
    const { err, fail, data } = await updateCoupon(payload)
    if (err || fail) return err || fail
    commit({ type: coupon.UPDATE_COUPON_LOCAL, data: data.data })
    return true
  }
}
