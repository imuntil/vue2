export const delay: (ms: number) => Promise<{}> = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export type Func = (s: any) => any
export const debounce = (action: Func, delay: number) => {
  let timer: number
  return (...rest: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      action.apply(null, rest)
    }, delay)
  }
}

export const throttle = (action: Func, delay: number) => {
  let statTime = 0
  return (...rest: any[]) => {
    const currTime = +new Date()
    if (currTime - statTime > delay) {
      action.apply(null, rest)
      statTime = currTime
    }
  }
}

/* 打乱数组d */
export const shuffle: (array: any[]) => any[] = (arr) => {
  return arr.sort(v => Math.random() - 0.5)
}

/* 随机字符串 */
export const asciiStr = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_'
export const random: (length?: number ) => string = (length = 12) => {
  return shuffle(asciiStr.split('')).slice(0, length).join('')
}
