/**
 * @description 获取API URL，根据环境进行判断
 */
export const getApiUrl = (originUrl: string): string => {
  // const baseUrl = import.meta.env.VITE_BASE_API_URL; // 下放到项目里
  let url: string = originUrl
  // if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'grey') {
  //   if (originUrl.includes('/api/')) {
  //     url = url.split('/api')[1]
  //   }
  //   if (originUrl.includes('/other-api/')) {
  //     url = url.split('/other-api')[1]
  //   }
  //   return baseUrl + url
  // }
  return url
}

/**
 * @description 获取queryString
 */
export const getQueryString = (name: string): string | null => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = typeof window !== 'undefined' && window.navigator ? window.location.search.substr(1).match(reg) : null
  if (r != null) return decodeURIComponent(r[2])
  return null
}

/**
 * @description 获取token
 */
export const getToken = (s?: string): string | null => {
  return getQueryString(s || 'token')
}

/**
 * @description throttle
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const throttle = function(fn: any, deplay: number) {
  let wait = false
  return function(this: any, ...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    // eslint-disable-next-line prefer-rest-params
    if (!wait) {
      wait = true
      setTimeout(() => {
        fn.apply(that, args)
        wait = false
      }, deplay)
    }
  }
}

/**
 * @description debounce
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const debounce = function(excute: any, delay: number) {
  let timer: string | number | NodeJS.Timeout | undefined
  return function(this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      excute.apply(this, args)
    }, delay)
  }
}

/**
 * @description isIos
 */
export const isIos = (): boolean => {
  if (typeof window !== 'undefined') {
    const u = navigator.userAgent
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }
  return false
}

/**
 * @description 获取平台
 */
export const getPlatform = (): string => {
  const ua = navigator.userAgent
  if (ua.match(/MicroMessenger/i)) {
    return 'MicroMessenger'
  }
  if (ua.match(/WeiBo/i)) {
    return 'WeiBo'
  }
  if (ua.match(/QQ/i)) {
    return 'QQ'
  }
  return ''
}

/**
 * @description 字符串获取时间戳，兼容ios
 */
export const getDate = (date: string): Date => {
  return new Date(date.replace(/-/g, '/'))
}

/**
 * 删除preloader
 */
export const removeLoading = () => {
  const loading = document.getElementById('preloader')
  if (loading !== null) {
    document.body.removeChild(loading)
  }
}

/**
 * 去重
 */
export const uniqueArray = (arr: any[], uniId: string) => {
  const res = new Map()
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1))
}

/**
 * 回到顶部
 */
export const scrollToTop = () => {
  let timer: any
  cancelAnimationFrame(timer)
  timer = requestAnimationFrame(function fn() {
    const oTop = document.body.scrollTop || document.documentElement.scrollTop
    if (oTop > 0) {
      document.body.scrollTo(0, oTop - 50)
      timer = requestAnimationFrame(fn)
    } else {
      cancelAnimationFrame(timer)
    }
  })
}

/**
 * 删除url中某个参数
 */
export const urlDelParameter = (name: string) => {
  if (typeof window !== 'undefined' && window.location) {
    const loca = window.location
    let baseUrl = loca.origin + loca.pathname
    const query = loca.search.substr(1)
    if (query.indexOf(name) > -1) {
      const obj: any = {}
      const arr: any[] = query.split('&')
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('=')
        obj[arr[i][0]] = arr[i][1]
      }
      delete obj[name]
      if (JSON.stringify(obj) != '{}') {
        baseUrl = baseUrl + '?'
      }
      const url = baseUrl
        + JSON.stringify(obj)
          .replace(/["{}]/g, '')
          .replace(/:/g, '=')
          .replace(/,/g, '&')
      return url
    } else {
      return baseUrl
    }
    return ''
  }
}

/**
 * 是否滚动到达底部
 */
export const isLoadBottom = (e: any) => {
  const { offsetHeight, scrollTop, scrollHeight } = e.target
  if (offsetHeight + scrollTop + 5 > scrollHeight) return true
  return false
}

/**
 * @description 对象转换&拼接参数
 */
export const addQueryString = (
  params: any,
  isQMark = true,
  isLast = false,
  isEncode = true,
): string => {
  let str = ''
  for (const key in params) {
    str += `${key}=${isEncode ? encodeURIComponent(params[key]) : params[key]}&`
  }
  if (isQMark) str = `?${str}`
  if (!isLast) str = str.substring(0, str.length - 1)
  return str
}

/**
 * @description 识别内容的地址
 */
export const urlifyText = (text: string) => {
  const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
  return text.replace(exp, "<a href='$1' rel='nofollow noopener' style='color:#1890ff;word-wrap:break-word;'>$1</a>")
}

/**
 * @description 对象转换&拼接参数
 */
export const joinUrlParams = (url: string, params: any) => {
  // 创建一个URLSearchParams对象
  const searchParams = new URLSearchParams(params)

  // 对参数进行排序
  searchParams.sort()

  // 将排序后的参数对象转换为字符串
  const queryString = searchParams.toString()

  let cacheUrl = url
  if (url.indexOf('?') > -1) {
    cacheUrl = `${url}&${queryString}`
  } else {
    cacheUrl = `${url}${queryString ? `?${queryString}` : ''}`
  }

  if (cacheUrl.endsWith('&')) {
    cacheUrl = cacheUrl.replace(/&$/, '')
  }

  return cacheUrl
}

/**
 * @description 是否是从桌面启动的
 */
export const isStandalone = () => {
  if (typeof window === 'undefined') return false
  const { standalone = '' } = window.navigator as any
  return standalone || (window.matchMedia('(display-mode: standalone)').matches) || false
}
