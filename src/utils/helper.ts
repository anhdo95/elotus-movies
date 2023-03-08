import { GetServerSidePropsResult } from 'next'
import {
  RouteNames,
  AppRoutesType,
  resolveRoute,
} from '@/lib/typed-route/typedRoute'
import { Genre } from '@/types/genre'
import FilterOptions from '@/types/filter-options'
import AppConfig from '@/config'

export function redirect(
  to: RouteNames,
  params?: AppRoutesType[RouteNames]['_']
): GetServerSidePropsResult<any> {
  return {
    redirect: {
      destination: resolveRoute(to, params),
      permanent: false,
    },
  }
}

export function toQueries(query: string | string[]): string[] {
  return Array.isArray(query) ? query : [query]
}

export function getFilterOptions(genres: Genre[] = []): FilterOptions {
  return {
    withGenres: {
      title: 'Genres',
      choices: genres.map(({ id, name }) => ({ name, value: id.toString() })),
    },
  }
}

export function getImageUrl(url: string) {
  return `${AppConfig.IMAGE_BASE_URL}/${url}`
}
