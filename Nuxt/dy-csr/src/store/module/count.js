const delay = time => new Promise(resolve => setTimeout(resolve, time))
export default {
  namespaced: true,
  state: {
    count: 0,
  },
  mutations: {
    increase (state, payload) {
      state.count += (payload.count || 1)
    },
    decrease (state, payload) {
      state.count -= (payload.count || 1)
    }
  },
  actions: {
    async increaseSync ({ commit }, payload) {
      await delay(1000)
      commit({ type: 'increase', payload })
    }
  }
};
