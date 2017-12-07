import header from '~/utils/header'

function existCookie (cookie) {
  const st = cookie.split(';').find(c => c.trim().startsWith('_st='))
  return !!st
}

export default function ({ isServer, req, redirect }) {
  if (isServer && req) {
    console.log('middleware: ', req.headers)
    const cookie = req.headers.cookie
    const is = existCookie(cookie)
    if (!is) {
      return redirect('/login')
    }
    header.cookie = cookie
    header.isServer = true
  } else {
    header.isServer = false
  }
}
