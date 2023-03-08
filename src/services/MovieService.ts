import { BaseService } from '@/services/BaseService'
import { DetailedMovie } from '@/types/movie'
import AppConfig from '@/config'

export class MovieService extends BaseService {
  async getNowPlayingMovies(params: any) {
    const res = await this.axios.get(`/3/movie/now_playing`, {
      params: { ...params, apiKey: AppConfig.API_KEY },
    })
    return res.data
  }

  async getTopRatedMovies(params: any) {
    const res = await this.axios.get(`/3/movie/top_rated`, {
      params: { ...params, apiKey: AppConfig.API_KEY },
    })
    return res.data
  }

  async getMovieById(id: number) {
    const res = await this.axios.get<DetailedMovie>(`3/movie/${id}`, {
      params: { apiKey: AppConfig.API_KEY },
    })
    return res.data
  }
}
