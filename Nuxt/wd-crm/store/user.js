import { user } from '~/assets/lib/constant'

import {
  fetchUserList
} from '~/assets/lib/api'

const perPage = 2
// user store也取消200条返回的模式。只保存当前page数据
export const state = () => ({
  currentList: {},
  currentPage: 1,
  itemPerPage: perPage,
  expired: false,
  // 用户总数
  count: 0,
  // 总页数
  totalPages: 0
})

export const mutations = {
  // 保存用户列表
  [user.SAVE_USER_LIST] (state, payload) {
    const { count, current, total, users } = payload.lists
    state.currentList = users
    state.currentPage = +current
    state.count = count
    state.totalPages = total
  },
  [user.UPDATE_USER_LIST_CURRENT_PAGE] (state, payload) {
    state.currentPage = payload.currentPage
  }
}

export const actions = {
  // 获取用户列表
  async [user.FETCH_USER_LIST] ({ commit }, payload) {
    const { err, fail, data } = await fetchUserList({ size: perPage, page: payload.currentPage })
    if (err || fail) return false
    commit({ type: user.SAVE_USER_LIST, lists: data.data })
    return true
  },
  async [user.FETCH_CURRENT_PAGE_DATA_A] ({ dispatch }, payload) {
    const currentPage = payload.currentPage
    await dispatch({ type: user.FETCH_USER_LIST, currentPage })
    return true
  }
}
