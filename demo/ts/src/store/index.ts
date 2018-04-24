import Vue from 'vue'
import Vuex, { MutationTree, ActionTree } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import eg from './modules/eg'
import { fetchOpenID } from '../utils/weixin'

Vue.use(Vuex)

interface IState {
  loaded: boolean
  path: string
  openID: string
}

const state: IState = {
  loaded: false,
  path: '',
  openID: ''
}

const mutations: MutationTree<IState> = {
  loaded($state: IState): void {
    $state.loaded = true
  },
  redirect($state: IState, payload: { path: string }): void {
    $state.path = payload.path
  }
}

const actions: ActionTree<IState, any> = {
  async wxAuth({ commit, state: $state }) {
    if ($state.openID) {return}
    const res = await fetchOpenID()
    console.log(res)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    eg
  }
})
