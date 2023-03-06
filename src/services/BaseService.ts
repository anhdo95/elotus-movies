import { AxiosInstance } from 'axios'

export abstract class BaseService {
  constructor(protected axios: AxiosInstance) {}
}
