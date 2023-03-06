import Axios, { AxiosError, AxiosInstance } from 'axios'
import Router from 'next/router'
import AppConfig from '@/config'
import { isClient } from '@/utils/env'
import { AppRoutes, resolveRoute } from '@/lib/typed-route/typedRoute'

export default function createAxiosInstance(token?: string): AxiosInstance {
  const headers: Record<string, string> = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const axios = Axios.create({
    baseURL: AppConfig.API_URL,
    headers,
    timeout: 60000,
  })

  if (isClient()) {
    // Client Side interceptor
    axios.interceptors.response.use(undefined, (error: AxiosError) => {
      const status = error.response?.status
      switch (status) {
        case 500: {
          Router.push(AppRoutes.ServerError.path)
          break
        }
        case 404: {
          // Router.push(AppRoutes.NotFoundError.path)
          break
        }
        default:
          break
      }
      throw error
    })
  }

  return axios
}
