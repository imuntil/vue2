const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const state = () => ({
  count: 0
})

export const mutations = {
  increase (state, payload) {
    state.count += (payload.count || 1)
  },
  decrease (state, payload) {
    state.count -= (payload.count || 1)
  }
}

export const actions = {
  async increaseSync ({ commit }, payload) {
    await delay(1000)
    commit({ type: 'increase', payload })
  }
}