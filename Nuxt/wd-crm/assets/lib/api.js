import fetch from './request'

export async function request (url, options) {
  const { err, data } = await fetch(url, options)
  if (err) {
    // commit && commit('nt/error', { code: -1, msg: '未知错误' }, { root: true })
    return { err: true }
  }
  const { code, message } = data
  if (~~code !== 0) {
    // commit && commit('nt/error', { code, msg: message }, { root: true })
    return { fail: { code, message } }
  }
  return { data }
}

export const url = 'http://localhost:3001/api/s/'
export const staticUrl = 'http://localhost:3001'
export const configUrl = 'http://localhost:3000'

// 获取配置信息
export function fetchConfig () {
  return fetch(`${configUrl}/config.json`)
}

// 获取产品列表
export function fetchProList () {
  return request(`${url}pros`)
}
// 获取产品详细
export function fetchProDetail ({ sku }) {
  return request(`${url}pros/${sku.toUpperCase()}`)
}
// 更新产品信息
export function modifyProDetail ({ body }) {
  return request(`${url}pros/${body.sku}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
// 新增产品
export function addNewPro ({ body }) {
  return request(`${url}pros/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
// 删除产品
export function deletePro ({ sku }) {
  return request(`${url}pros/${sku}`, {
    method: 'DELETE'
  })
}
// 上传图片
export function uploadImage ({ fd, sku }) {
  return request(`${url}pros/${sku}/upload`, {
    method: 'POST',
    body: fd
  })
}
