import { config } from '~/assets/lib/constant'
import { normalize, schema } from 'normalizr'

export const state = () => ({
  types: {},
  typeValues: []
})

export const mutations = {
  [config.SAVE_CONFIG] (state, payload) {
    const data = payload.data
    const s = new schema.Entity('types', undefined, {
      idAttribute: value => value.value
    })
    const { result, entities } = normalize(data, [s])
    state.typeValues = result
    state.types = entities.types
  }
}
