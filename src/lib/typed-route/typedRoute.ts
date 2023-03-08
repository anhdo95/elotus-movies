import qs from 'querystring'

export type RouteObject<T = never> = { path: string; _?: T }

const createRoute = <T = never>(path: string): RouteObject<T> => ({ path })

export const AppRoutes = {
  Home: createRoute('/'),
  NowPlayingMovies: createRoute<{}>('/movies/now-playing'),
  TopRatedMovies: createRoute<{}>('/movies/top-rated'),
  NotFoundError: createRoute('/error/not-found'),
  ServerError: createRoute('/error/server-error'),
}

export type AppRoutesType = typeof AppRoutes

export type RouteNames = keyof AppRoutesType

export function joinQueryString(
  query: Record<string, string | number | string[] | undefined>
): string {
  const built = qs.stringify(query)
  return built ? `?${built}` : ''
}

export function resolveRoute<T extends keyof AppRoutesType>(
  route: T,
  params?: AppRoutesType[T]['_']
): string {
  const { path } = AppRoutes[route]
  const p = { ...((params as object) || {}) } as Record<string, string>

  const href = path.replace(/\[[a-zA-Z_]+]/g, (matched) => {
    const segment = matched.substr(1, matched.length - 2)
    if (typeof p[segment] === 'undefined') {
      throw new Error(`Segment "${segment}" was not provided`)
    } else {
      const subst = String(p[segment])
      delete p[segment]
      return subst
    }
  })

  return `${href}${joinQueryString(p)}`
}
