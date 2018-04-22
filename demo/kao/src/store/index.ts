import Vue from 'vue'
import Vuex, { MutationTree, ActionTree } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import eg from './modules/eg'

Vue.use(Vuex)

interface IState {
  loaded: boolean
  path: string
}

const state: IState = {
  loaded: false,
  path: ''
}

const mutations: MutationTree<IState> = {
  loaded($state: IState): void {
    $state.loaded = true
  },
  redirect($state: IState, payload: { path: string }): void {
    $state.path = payload.path
  }
}

const actions: ActionTree<IState, any> = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    eg
  }
})
