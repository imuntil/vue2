import fetch, { IOptions } from './fetch'

export const prefix: string = 'http://xx'

/**
 * 格式化数据
 * @param payload
 */
export function formatData(payload: { [prop: string]: any }): FormData {
  const formData = new FormData()
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      formData.append(key, payload[key])
    }
  }
  return formData
}

export interface IRes {
  data?: any,
  err?: any
}
/**
 * 处理数据，全局异常捕获
 * @param url string
 * @param options IOptions
 */
export async function request (url: string, options?: IOptions, pre?: string) {
  const { data, err }: IRes = await fetch(`${pre ? pre : prefix}${url}`, options)
  const res: { data: any, err: any, fail: any } = { data, err, fail: undefined }
  if (err) {
    // x
  } else if (+data.code !== 200) {
    res.fail = data
    res.data = undefined
  }
  return res
}
