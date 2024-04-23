import { createAxiosInstance, createRequestFunctions } from './http'

export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

export interface FcResponse<T> {
  code: string
  msg?: string
  data: T
  message?: string
}

export { createAxiosInstance, createRequestFunctions }
