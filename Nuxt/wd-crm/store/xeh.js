// xhr or fetch error handle

export const state = () => ({
  err: '',
  unAuth: false
})

export const mutations = {
  error (state, payload) {
    const err = payload.err
    state.err = err
    state.unAuth = err && err.message === 'Unauthorized'
  }
}
