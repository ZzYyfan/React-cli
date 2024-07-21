import axios from 'axios'
import type {
  Method,
  AxiosInstance,
  AxiosHeaders,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse
} from 'axios'

interface RequestOptions<T> {
  method: Method // 请求方法
  url: string // 请求地址
  params?: T // 请求头参数
  data?: T // 请求体参数
  headers?: AxiosHeaders // 请求头
  loading?: boolean // 是否展示loading 默认为true
  rawResponse?: boolean // 是否返回完整的response对象 默认为false
}

const request = <T>({
  method,
  url,
  params,
  data,
  headers,
  loading = true,
  rawResponse = false
}: RequestOptions<T>) => {
  // 创建 axios 实例
  const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASEURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 60000
  })
  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )
  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (err: AxiosError) => {
      return Promise.reject(err)
    }
  )
  return new Promise<T>((resolve, reject) => {
    instance
      .request({ method, url, params, data, headers })
      .then((res) => resolve(rawResponse ? res : res.data))
      .catch((err) => reject(err))
  })
}
