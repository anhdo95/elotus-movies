import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroller'
import PullToRefresh from 'react-simple-pull-to-refresh'
import MovieCard from '@/components/MovieCard'
import { useAppService } from '@/context/AppProvider'
import { useRouter } from 'next/router'
import { Movie } from '@/types/movie'

function InfiniteMovies() {
  const service = useAppService()
  const router = useRouter()
  const queryClient = useQueryClient()

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
    ({ pageParam = 0 }) =>
      service.movie.getNowPlayingMovies({
        ...router.query,
        page: pageParam + 1,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page >= lastPage.total_pages) {
          return undefined
        }
        return lastPage.page
      },
    }
  )

  if (isLoading) return <div className="loading">Loading...</div>
  if (isError) return <div>Error! {error.toString()}</div>

  console.log('data', data)

  async function handleRefresh() {
    // queryClient.invalidateQueries(['now-playing-movies'], { exact: false })
    queryClient.resetQueries(['now-playing-movies'])
  }

  return (
    <>
      {/* {isFetchingNextPage && <div className="loading">Loading...</div>} */}
      <PullToRefresh onRefresh={handleRefresh}>
        <InfiniteScroll
          className="mt-4 grid gap-2 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          loadMore={() => !isFetchingNextPage && fetchNextPage()}
          hasMore={hasNextPage}
        >
          {data.pages.map((pageData) => {
            return pageData.results.map((movie: Movie) => {
              return <MovieCard key={movie.id} {...movie} />
            })
          })}
        </InfiniteScroll>
      </PullToRefresh>
    </>
  )
}

export default InfiniteMovies
