import AppConfig from '@/config'
import { BaseService } from '@/services/BaseService'

export class GenreService extends BaseService {
  async getMovieListGenres() {
    const res = await this.axios.get(`/3/genre/movie/list`, {
      params: { apiKey: AppConfig.API_KEY },
    })
    return res.data
  }
}
