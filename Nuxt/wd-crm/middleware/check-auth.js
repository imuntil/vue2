import header from '~/utils/header'

export default function ({ isServer, req }) {
  if (isServer && req) {
    header.cookie = req.headers.cookie
    header.isServer = true
  } else {
    header.isServer = false
  }
}
