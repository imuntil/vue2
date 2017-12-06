import fetch from './request'
import header from '~/utils/header'

export async function request (url, options = {}) {
  if (header.isServer) {
    options.headers = { ...options.headers, cookie: header.cookie }
  }
  const { err, data } = await fetch(encodeURI(url), options)
  if (err) {
    // commit && commit('nt/error', { code: -1, msg: '未知错误' }, { root: true })
    console.log(err)
    return { err: true }
  }
  const { code, message } = data
  if (~~code !== 0) {
    // commit && commit('nt/error', { code, msg: message }, { root: true })
    return { fail: { code, message } }
  }
  return { data }
}

export const url = 'http://localhost:29999/api/'
export const staticUrl = 'http://localhost:3001'
export const configUrl = 'http://localhost:29999'

// 登录
export function login ({ account, password }) {
  return request(`${url}sys/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ account, password })
  })
}

// 获取配置信息
export function fetchConfig () {
  return fetch(`${configUrl}/config.json`)
}
// ——————————————————————————————————————————————产品————————————————————————————————————
// 获取产品列表
export function fetchProList (payload) {
  return request(`${url}pros/sys`, payload)
}
// 获取产品详细
export function fetchProDetail ({ sku }) {
  return request(`${url}pros/sys/${sku.toUpperCase()}`)
}
// 更新产品信息
export function modifyProDetail ({ body }) {
  return request(`${url}pros/sys/${body.sku}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
// 新增产品
export function addNewPro ({ body }) {
  return request(`${url}pros/sys/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
// 删除产品
export function deletePro ({ sku }) {
  return request(`${url}pros/sys/${sku}`, {
    method: 'DELETE'
  })
}
// 上传图片
export function uploadImage ({ fd, sku }) {
  return request(`${url}pros/sys/${sku}/upload`, {
    method: 'POST',
    body: fd
  })
}

// ——————————————————————————————————————————————用户————————————————————————————————————

// 获取用户列表
export function fetchUserList ({ size = 20, page = 1 }) {
  return request(`${url}users/sys?size=${size}&page=${page}`)
}
// 根据phone检索用户
export function filterUserByPhone ({ phoneStr }) {
  return request(`${url}users/sys/filter?ps=${phoneStr}`)
}

// ——————————————————————————————————————————————订单————————————————————————————————————
// 获取订单列表
export function fetchOrderList (params) {
  let s = ''
  for (let k in params) {
    if (k && params[k] !== undefined) {
      s += `${k}=${params[k]}&`
    }
  }
  return request(`${url}sys/orders?${s.slice(0, -1)}`)
}
// 确认发货
export function deliverGoods ({ orderNumber }) {
  return request(`${url}sys/orders/${orderNumber}/deliver-goods`, { method: 'PUT' })
}
