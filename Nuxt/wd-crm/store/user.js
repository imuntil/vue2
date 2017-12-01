import { user } from '~/assets/lib/constant'
import {
  fetchUserList
} from '~/assets/lib/api'

const perPage = 20
export const state = () => ({
  // 分页总数居（二维数组）
  lists: [],
  currentPage: 1,
  itemPerPage: perPage,
  expired: false,
  // 用户id数组
  idList: [],
  // 所有用户数据
  store: {}
})

export const mutations = {
  // 保存用户列表
  [user.SAVE_USER_LIST] (state, payload) {
    const { lists } = payload
    state.lists = lists
  }
}

export const actions = {
  // 获取用户列表
  async [user.FETCH_USER_LIST] ({ commit, state }, payload) {
    if (state.lists.length) return true
    const { err, fail, data } = await fetchUserList()
    console.log(err)
    console.log(fail)
    if (err || fail) return false
    commit({ type: user.SAVE_USER_LIST, lists: data.data })
    return true
  }
}
