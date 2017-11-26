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

export const url = 'http://localhost:3001/api/'

// 获取配置信息
export function fetchConfig () {
  return fetch('/config.json')
}

// 获取产品列表
export function fetchProList () {
  return request(`${url}pros`)
}
// 获取产品详细
export function fetchProDetail ({ sku }) {
  return request(`${url}pros/${sku.toUpperCase()}`)
}
