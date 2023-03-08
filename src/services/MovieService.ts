import { BaseService } from '@/services/BaseService'
import { DetailedMovie } from '@/types/movie'

export class MovieService extends BaseService {
  async getNowPlayingMovies(params: any) {
    const res = await this.axios.get(`/3/movie/now_playing`, {
      params: { ...params, api_key: 'd0018e8e0dabe7ce440c5951c6254859' },
    })
    return res.data
  }

  async getMovieById(id: number) {
    const res = await this.axios.get<DetailedMovie>(`3/movie/${id}`, {
      params: { api_key: 'd0018e8e0dabe7ce440c5951c6254859' },
    })
    return res.data
  }
}
