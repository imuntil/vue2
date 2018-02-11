import header from '~/utils/header'
import decode from 'jwt-decode'

function existCookie(cookie) {
  const st = cookie.split(';').find(c => c.trim().startsWith('_st='))
  if (!st) return false
  try {
    const cookie = st.split('=')[1]
    if (!cookie) return false
    return decode(cookie)
  } catch (e) {
    console.log(e)
    return false
  }
}

export default function({ isServer, req, redirect, from, route, store }) {
  if (isServer && req) {
    const cookie = req.headers.cookie
    const is = cookie && existCookie(cookie)
    if (is) {
      header.cookie = cookie
      store.commit('auth/setAuth')
    } else if (route.name !== 'login') {
      redirect('/login')
    }
  } else {
    if (route.name !== 'login' && !store.state.auth.auth) {
      redirect('/login')
    }
  }
}
