import { useAuthStore } from '@/stores'
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

interface IResponseData<T = unknown> {
  status: 'success' | 'error'
  code: number
  data: T
  message?: string
  [key: string]: unknown
}

const createRequest = (config?: AxiosRequestConfig): AxiosInstance => {
  const { VITE_API_URL, VITE_API_PREFIX } = import.meta.env
  const baseURL = `${VITE_API_URL.endsWith('/') ? VITE_API_URL.slice(0, -1) : VITE_API_URL}${VITE_API_PREFIX}`
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    ...config,
  })

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      window.NProgress.start()

      const authStore = useAuthStore()
      const accessToken = authStore.accessToken
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    <T>(response: AxiosResponse<IResponseData<T>>) => {
      window.NProgress.done()
      const res = response.data
      const { status } = res
      if (status === 'success') {
        return res.data
      }
      // 自定义处理code
      ElNotification.error(res.message || 'Internal Server Error')
      return Promise.reject(new Error(res.message || 'Internal Server Error'))
    },
    (error: AxiosError) => {
      window.NProgress.done()
      // error handle
      if (error.message.indexOf('timeout') != -1) {
        ElNotification.error('Request Timeout')
      } else {
        ElNotification.error(error.message)
      }
      return Promise.reject(error)
    },
  )
  return instance
}

const request = createRequest()

export const http = {
  get<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return request.get(url, { params, ...config })
  },

  post<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return request.post(url, data, config)
  },

  put<T = unknown>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return request.put(url, data, config)
  },

  delete<T = unknown>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return request.delete(url, { params, ...config })
  },
}

export default request
