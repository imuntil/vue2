import fetch from './request'

export async function request (url, options) {
  const { err, data } = await fetch(url, options)
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

export const url = 'http://localhost:3001/api/'
export const staticUrl = 'http://localhost:3001'
export const configUrl = 'http://localhost:3000'

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
export function fetchProList () {
  return request(`${url}pros/sys`)
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
export function fetchUserList () {
  return request(`${url}users/sys`)
}
