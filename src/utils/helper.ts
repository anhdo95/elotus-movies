import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsResult } from 'next'
import Router from 'next/router'
import { isEmpty, omitBy } from 'lodash-es'
import {
  RouteNames,
  AppRoutesType,
  resolveRoute,
} from '@/lib/typed-route/typedRoute'
import { Genre } from '@/types/genre'
import FilterOptions from '@/types/filter-options'

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

export function updateQuery(query: ParsedUrlQuery, resetPage?: boolean) {
  const q = {
    pathname: Router.pathname,
    query: {
      ...Router.query,
      ...query,
    },
  }
  if (resetPage && q.query.page) {
    delete q.query.page
  }
  q.query = omitBy(q.query, isEmpty)
  Router.push(q, undefined, { shallow: true })
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
