import { config } from '~/assets/lib/constant'
import { normalize, schema } from 'normalizr'
import { fetchConfig } from '~/assets/lib/api'

export const state = () => ({
  types: {},
  typeValues: [],
  originTypes: [],
  origins: []
})

export const mutations = {
  [config.SAVE_CONFIG] (state, payload) {
    const { types, origins } = payload.data
    const s = new schema.Entity('types', undefined, {
      idAttribute: value => value.value
    })
    const { result, entities } = normalize(types, [s])
    state.typeValues = result
    state.types = entities.types
    state.originTypes = types
    state.origins = origins
  }
}

export const actions = {
  async [config.FETCH_CONFIG] ({ commit, state }, payload) {
    if (state.originTypes.length) return false
    const { data } = await fetchConfig()
    if (!data) return false
    commit({ type: config.SAVE_CONFIG, data })
  }
}
