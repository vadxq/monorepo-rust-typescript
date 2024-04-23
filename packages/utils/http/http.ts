import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'

import { aesDecrypt } from '../common/encrypt'
import { handleAuthError, handleChangeRequestHeader, handleConfigureAuth, handleGeneralError, handleNetworkError } from './middware'

type Fn = (data: FcResponse<any>) => unknown

// interface IAnyObj {
//   [index: string]: unknown
// }

export interface FcResponse<T> {
  code: string
  msg?: string
  data: T
  message?: string
}

export interface CustomConfig extends AxiosRequestConfig {
  headers?: Record<string, string>
  params?: Record<string, any>
  data?: any
}

export interface CreateCustomConfig {
  disableMidware?: boolean
  needDecrypt?: boolean
  descryptSecret?: string
  signSecret?: string
}

// 创建自定义axios实例
export const createAxiosInstance = (baseURL: string, extraConfig: CreateAxiosDefaults, customConfig?: CreateCustomConfig) => {
  // 创建实例时设置baseURL和其他默认配置
  const instance = axios.create({
    baseURL,
    ...extraConfig,
  })

  instance.interceptors.request.use((config) => {
    config = handleChangeRequestHeader(config)
    config = handleConfigureAuth(config)
    return config
  })

  instance.interceptors.response.use(
    (response) => {
      console.log(response)
      if (response.status !== 200) return Promise.reject(response.data)
      if (!customConfig?.disableMidware) {
        if (customConfig?.needDecrypt) {
          try {
            response.data = aesDecrypt(response.data, customConfig?.descryptSecret || '')
          } catch (error) {
            console.log('非法加密数据')
            response.data = response.data
          }
        }
        const authResult = handleAuthError(response.data.code)
        if (!authResult) return Promise.reject(response.data)
        const generalResult = handleGeneralError(response.data.code, response.data?.msg || response.data?.message)
        if (!generalResult) return Promise.reject(response.data)
      }
      return response
    },
    (err) => {
      console.log(err)
      handleNetworkError(err.response?.status)
      Promise.reject(err.response)
    },
  )

  return instance
}

export const createRequestFunctions = (instance: AxiosInstance, prefix?: string) => {
  const get = <T>(
    url: string,
    config?: CustomConfig | {},
    clearFn?: Fn,
  ): Promise<[FcResponse<T> | undefined, any]> =>
    new Promise((resolve) => {
      instance
        .get(prefix ? url.replace(prefix, '') : url, config)
        .then((result) => {
          let res: FcResponse<T>
          if (clearFn !== undefined) {
            res = clearFn(result.data) as unknown as FcResponse<T>
          } else {
            res = result.data as FcResponse<T>
          }
          resolve([res as FcResponse<T>, null])
        })
        .catch((err) => {
          console.log(err)
          resolve([undefined, err])
        })
    })

  const post = <T>(
    url: string,
    config?: CustomConfig,
  ): Promise<[FcResponse<T> | undefined, any]> => {
    return new Promise((resolve) => {
      instance
        .post(prefix ? url.replace(prefix, '') : url, config?.data || null, config)
        .then((result) => {
          resolve([result.data as FcResponse<T>, null])
        })
        .catch((err) => {
          resolve([undefined, err])
        })
    })
  }

  const put = <T>(
    url: string,
    config?: CustomConfig,
  ): Promise<[FcResponse<T> | undefined, any]> => {
    return new Promise((resolve) => {
      instance
        .put(prefix ? url.replace(prefix, '') : url, config?.data || null, config)
        .then((result) => {
          resolve([result.data as FcResponse<T>, null])
        })
        .catch((err) => {
          resolve([undefined, err])
        })
    })
  }

  const del = <T>(
    url: string,
    config?: CustomConfig | {},
  ): Promise<[FcResponse<T> | undefined, any]> =>
    new Promise((resolve) => {
      instance
        .delete(prefix ? url.replace(prefix, '') : url, config)
        .then((result) => {
          resolve([result.data as FcResponse<T>, null])
        })
        .catch((err) => {
          resolve([undefined, err])
        })
    })

  return { get, post, put, del }
}
