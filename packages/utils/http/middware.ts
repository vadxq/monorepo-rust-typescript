import { InternalAxiosRequestConfig } from 'axios'
import commonToast from '../toast'

export const handleChangeRequestHeader = (config: InternalAxiosRequestConfig<any>) => {
  return config
}

export const handleConfigureAuth = (config: InternalAxiosRequestConfig<any>) => {
  return config
}

export const handleNetworkError = (errStatus?: number): void => {
  const networkErrMap: any = {
    '400': '错误的请求', // token 失效
    '401': '未授权，请重新登录',
    '403': '拒绝访问',
    '404': '请求错误，未找到该资源',
    '405': '请求方法未允许',
    '408': '请求超时',
    '422': '请检查输入的参数是否正确',
    '429': '操作过于频繁，请稍候再试',
    '500': '服务器端出错',
    '501': '网络未实现',
    '502': '网络错误',
    '503': '服务不可用',
    '504': '网络超时',
    '505': 'http版本不支持该请求',
  }
  if (errStatus) {
    commonToast.toast({ message: networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}` })
    // showToast(networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}`)
    return
  }

  commonToast.toast({ message: '无法连接到服务器！' })
}

export const handleAuthError = (errno: string): boolean => {
  const authErrMap: any = {
    '401': '登录失效，需要重新登录', // token 失效
  }

  if (authErrMap.hasOwnProperty(errno)) {
    commonToast.toast({ message: authErrMap[errno] })
    return false
  }

  return true
}

export const handleGeneralError = (errno: string, errmsg: string): boolean => {
  if (errno !== '0000') {
    commonToast.toast({ message: errmsg ?? '未知错误' })
    return false
  }

  return true
}
