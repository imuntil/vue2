// notification

const initErr = { code: '', msg: '', ope: 0 }
const initLoad = { global: false, part: false, msg: '' }

export const state = () => ({
  error: { code: '', msg: '', ope: 0 },
  loading: { global: false, part: false, msg: '' }
})

export const mutations = {
  error (state, payload) {
    state.error = payload
  },
  resetErr (state) {
    state.error = { ...initErr }
  },
  loadBegin (state, payload) {
    state.loading = payload
  },
  loadStop (state) {
    state.loading = { ...initLoad }
  }
}
