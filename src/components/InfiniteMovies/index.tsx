import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroller'
import MovieCard from '@/components/MovieCard'
import { useAppService } from '@/context/AppProvider'
import { useRouter } from 'next/router'
import { Movie } from '@/types/movie'

function InfiniteMovies() {
  const service = useAppService()
  const router = useRouter()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery(
    ['now-playing-movies', router.query],
    ({ pageParam = 0 }) => service.movie.getNowPlayingMovies(pageParam + 1),
    {
      getNextPageParam: (lastPage) => lastPage.page || undefined,
    }
  )

  if (isLoading) return <div className="loading">Loading...</div>
  if (isError) return <div>Error! {error.toString()}</div>

  console.log('data', data)

  return (
    <>
      {isFetchingNextPage && <div className="loading">Loading...</div>}
      <InfiniteScroll
        className="mt-12 grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        loadMore={() => !isFetchingNextPage && fetchNextPage()}
        hasMore={hasNextPage}
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((movie: Movie) => {
            return <MovieCard {...movie} />
          })
        })}
      </InfiniteScroll>
    </>
  )
}

export default InfiniteMovies
