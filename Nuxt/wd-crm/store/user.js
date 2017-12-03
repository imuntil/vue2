import { user } from '~/assets/lib/constant'
// import { schema, normalize } from 'normalizr'
import _ from 'lodash'

import {
  fetchUserList
} from '~/assets/lib/api'

const perPage = 2
/*
* 用户没有查看详细功能，所有不需要idList, store也变成单纯的对象数组，且仅在all===true时有值
* 针对all === false的情况，新增pageStore对象， 结构为{ currentPage: []}
* 即key为page，value为所对应的数据数组
* */
export const state = () => ({
  pageStore: {},
  currentPage: 1,
  itemPerPage: perPage,
  expired: false,
  // 用户总数
  count: 0,
  // 总页数
  totalPages: 0,
  // 默认数据总量小于等于200时，回一次性全部拉取
  all: false,
  store: []
})

export const mutations = {
  // 保存用户列表
  [user.SAVE_USER_LIST] (state, payload) {
    const { count, current, total, users, all = true } = payload.lists
    if (all) {
      state.store = users
      state.pageStore = {..._.chunk(users, state.itemPerPage)}
    } else {
      state.pageStore = {
        ...state.pageStore,
        [current - 1]: users
      }
    }
    state.currentPage = +current
    state.count = count
    state.totalPages = total
    state.all = all
  },
  [user.UPDATE_USER_LIST_CURRENT_PAGE] (state, payload) {
    state.currentPage = payload.currentPage
  }
}

export const actions = {
  // 获取用户列表
  async [user.FETCH_USER_LIST] ({ commit, state }, payload) {
    if (state.all) return true
    const { err, fail, data } = await fetchUserList({ size: perPage, page: payload.currentPage })
    if (err || fail) return false
    commit({ type: user.SAVE_USER_LIST, lists: data.data })
    return true
  },
  /*
  * if (all 或者 store有currentPage所对应的数据) 直接更新current page
  * else to fetch data
  * */
  async [user.FETCH_CURRENT_PAGE_DATA_A] ({ commit, state, dispatch }, payload) {
    const currentPage = payload.currentPage
    const { all, totalPages } = state
    if (currentPage > totalPages) return false
    if (all || state.pageStore[currentPage - 1]) {
      commit({ type: user.UPDATE_USER_LIST_CURRENT_PAGE, currentPage })
      return true
    }
    await dispatch({ type: user.FETCH_USER_LIST, currentPage })
    return true
  }
}
