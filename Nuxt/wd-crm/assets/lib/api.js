import fetch from './request'

export async function request (url, options) {
  const { err, data } = await fetch(url, options)
  if (err) {
    // store.commit({
    //   type: 'error',
    //   code: -1,
    //   msg: '未知错误'
    // })
    return { err: true }
  }
  const { code, msg } = data
  if (~~code !== 0) {
    // store.commit({ type: 'error', code, msg })
    return { fail: { code, msg } }
  }
  return { data }
}

const url = 'http://localhost:3001/api/'

export function fetchProList () {
  return request(`${url}pros`)
}
