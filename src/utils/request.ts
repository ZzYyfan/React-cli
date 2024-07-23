import axios from 'axios'
import to from 'await-to-js'
import { updateLoading } from '@/store/system'
import store from '@/store'
import type {
  Method,
  AxiosHeaders,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse
} from 'axios'

interface RequestOptions<T> {
  method: Method // 请求方法
  url: string // 请求地址
  params?: object // 请求头参数
  data?: object // 请求体参数
  headers?: AxiosHeaders // 请求头
  loading?: boolean // 是否展示loading 默认为true
  rawResponse?: boolean // 是否返回完整的response对象 默认为false
}
// 请求实例
const requestInstance = <T>({
  method,
  url,
  params,
  data,
  headers,
  loading = true,
  rawResponse = false
}: RequestOptions<T>): Promise<T> => {
  // axios实例
  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASEURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 60000
  })
  // 请求拦截
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (loading) {
        store.dispatch(updateLoading(true))
      }
      config.headers.Authorization = import.meta.env.VITE_TOKEN
      return config
    },
    (error: AxiosError) => {
      if (loading) {
        store.dispatch(updateLoading(false))
      }
      return Promise.reject(error)
    }
  )
  // 响应拦截
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (loading) {
        store.dispatch(updateLoading(false))
      }
      const data = response.data
      const { code: resCode, data: resData, msg: resMsg } = data
      if (resCode === 1000) {
        return rawResponse ? response : data
      } else {
        return Promise.reject({
          code: resCode,
          msg: resMsg,
          data: resData
        })
      }
    },
    (error: AxiosError) => {
      if (loading) {
        store.dispatch(updateLoading(false))
      }
      return Promise.reject(error)
    }
  )
  return new Promise<T>((resolve, reject) => {
    instance
      .request({ method, url, params, data, headers })
      .then((res) => resolve(rawResponse ? res : res.data))
      .catch((err) => reject(err))
  })
}
export const request = <T>({
  method,
  url,
  params,
  data,
  headers,
  loading = true,
  rawResponse = false
}: RequestOptions<T>) => {
  return to<T>(requestInstance({ method, url, params, data, headers, loading, rawResponse }))
}
