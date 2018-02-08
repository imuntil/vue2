import Vue from 'vue'
import Vuex, { MutationTree, ActionTree } from 'vuex'
import eg from './modules/eg'
import { fetchOpenID } from '../utils/request';

Vue.use(Vuex)
interface IState {
  loaded: boolean,
  redirect: string,
  opendID: string
}

const state: IState = {
  loaded: false,
  redirect: '',
  opendID: ''
}

const mutations: MutationTree<IState> = {
  loaded ($state: IState): void {
    $state.loaded = true
  },
  redirect ($state: IState, payload: { path: string } ): void {
    $state.redirect = payload.path
  },
  wxAuth ($state: IState, payload: string): void {
    $state.opendID = payload
  }
}

const actions: ActionTree<IState, any> = {
  async wxAuth ({ commit, state: $state }) {
    if ($state.opendID) { return }
    const res = await fetchOpenID()
    if (res) {
      commit({ type: 'wxAuth', openID: res })
    }
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
