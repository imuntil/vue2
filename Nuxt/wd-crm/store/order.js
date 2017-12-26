import { order } from '~/assets/lib/constant'
import { delay } from '~/assets/lib/common-tools'
import {
  fetchOrderList
} from '~/assets/lib/api'
import _ from 'lodash'

const perPage = 2

// 取消类似user的200条数据以内全部返回的方式，全部采用分页返回
// 且不再{ page: [order] }的形式保存orderList分页数据，只单纯的保存最后请求的
// currentPage数据
export const state = () => ({
  currentList: [],
  currentPage: 1,
  itemPerPage: perPage,
  expired: false,
  // 订单总数
  count: 0,
  // 总页数
  totalPages: 0,
  // 待发货订单数量
  toBeDelevered: 0,
  // 新付款订单信息
  remind: false
})

export const mutations = {
  [order.SAVE_ORDER_LIST] (state, payload) {
    const { total, count, orders, current } = payload
    state.currentPage = ~~current
    state.currentList = orders
    state.count = count
    state.totalPages = total
  },
  [order.UPDATE_ORDER_LIST] (state, payload) {
    const { index } = payload
    const modified = { ...state.currentList[index] }
    modified.status = 2
    state.currentList = [...state.currentList.slice(0, index), modified, ...state.currentList.slice(index + 1)]
  },
  [order.SET_TO_BE_DELEVERED] (state, payload) {
    state.toBeDelevered = payload.count
  },
  [order.UPDATE_REMIND] (state, payload) {
    state.remind = payload.remind
  }
}

export const actions = {
  async [order.FETCH_ORDER_LIST] ({ commit, state }, payload) {
    const { err, fail, data } = await fetchOrderList({ ..._.omit(payload, 'type'), size: perPage })
    if (err || fail) return false
    commit({ type: order.SAVE_ORDER_LIST, ...data.data })
    return true
  },
  async [order.SEARCH_ORDERS_A] ({ commit, state }, payload) {
    const { err, fail, data } = await fetchOrderList({ page: 1, ..._.omit(payload, 'type'), size: perPage })
    if (err || fail) return false
    return data.data
  },
  async [order.REMIND_NEW_ORDER] ({ commit }, payload) {
    commit({ type: order.UPDATE_REMIND, remind: true })
    await delay(1000)
    commit({ type: order.UPDATE_REMIND, remind: false })
  }
}
