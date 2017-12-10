export const state = () => ({
  auth: false
})
export const mutations = {
  setAuth (state, payload) {
    state.auth = true
  },
  removeAuth (state, payload) {
    state.auth = false
  }
}
