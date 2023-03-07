import createAxiosInstance from '@/services/axios'
import { MovieService } from '@/services/MovieService'
import { GenreService } from '@/services/GenreService'

export function createAppService(token?: string) {
  const axios = createAxiosInstance(token)
  return {
    movie: new MovieService(axios),
    genre: new GenreService(axios),
  }
}

export type AppService = ReturnType<typeof createAppService>
