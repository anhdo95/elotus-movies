import Axios, { AxiosError, AxiosInstance } from 'axios'
import Router from 'next/router'
import { snakeCase, mapKeys } from 'lodash-es'
import AppConfig from '@/config'
import { isClient } from '@/utils/env'
import { AppRoutes } from '@/lib/typed-route/typedRoute'

export default function createAxiosInstance(token?: string): AxiosInstance {
  const headers: Record<string, string> = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const axios = Axios.create({
    baseURL: AppConfig.API_URL,
    headers,
    timeout: 60000,
    paramsSerializer: {
      serialize(params) {
        const snakeParams = mapKeys(params, (value, key) => snakeCase(key))
        return new URLSearchParams(snakeParams).toString()
      },
    },
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
