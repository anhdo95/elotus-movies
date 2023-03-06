import createAxiosInstance from '@/services/axios'
import { MovieService } from '@/services/MovieService'

export function createAppService(token?: string) {
  const axios = createAxiosInstance(token)
  return {
    movie: new MovieService(axios),
  }
}

export type AppService = ReturnType<typeof createAppService>
