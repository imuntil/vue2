import { breads } from '~/assets/lib/constant'
export default function ({ route, store }) {
  store.commit({ type: `bc/${breads.UPDATE_BREADS}`, bread: route.name })
}
