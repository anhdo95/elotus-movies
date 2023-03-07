import { BaseService } from '@/services/BaseService'

export class GenreService extends BaseService {
  async getMovieListGenres() {
    const res = await this.axios.get(`/3/genre/movie/list`, {
      params: { api_key: 'd0018e8e0dabe7ce440c5951c6254859' },
    })
    return res.data
  }
}
