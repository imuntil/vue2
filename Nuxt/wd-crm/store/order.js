import { order } from '~/assets/lib/constant'
import {
  fetchOrderList
} from '~/assets/lib/api'

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
  totalPages: 0
})

export const mutations = {
  [order.SAVE_ORDER_LIST] (state, payload) {
    const { total, count, orders, current } = payload
    state.currentPage = ~~current
    state.currentList = orders
    state.count = count
    state.totalPages = total
  }
}

export const actions = {
  async [order.FETCH_ORDER_LIST] ({ commit, state }, payload) {
    const { currentPage } = payload
    const { currentList, currentPage: page } = state
    if (+currentPage === +page && currentList.length) return true
    const { err, fail, data } = await fetchOrderList({ page: currentPage || page, size: perPage })
    if (err || fail) return false
    commit({ type: order.SAVE_ORDER_LIST, ...data.data })
    return true
  }
}
