import { useRouter } from 'next/router'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroller'
import PullToRefresh from 'react-simple-pull-to-refresh'
import classNames from 'classnames'

import HorizontalMovieCard from '@/components/HorizontalMovieCard'
import VerticalMovieCard from '@/components/VerticalMovieCard'
import Spinner from '@/components/Spinner'
import { useAppService } from '@/context/AppProvider'
import { Movie } from '@/types/movie'
import queryClient, { queryKeys } from '@/react-query/queryClient'
import { SegmentedType } from '@/components/SegmentedControl'

type ComponentProps = {
  segmentedControl: SegmentedType
}

function NowPlayingMovies(props: ComponentProps) {
  const service = useAppService()
  const router = useRouter()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery(
    [queryKeys.nowPlayingMovies, router.query],
    ({ pageParam = 0 }) =>
      service.movie.getNowPlayingMovies({
        ...router.query,
        page: pageParam + 1,
      }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page >= lastPage.totalPages) {
          return undefined
        }
        return lastPage.page
      },
    }
  )

  if (isLoading) return <div className="loading">Loading...</div>
  if (isError) return null

  const isListView = props.segmentedControl === SegmentedType.ListView

  console.log('data', data)

  async function handleRefresh() {
    // queryClient.invalidateQueries([queryKeys.nowPlayingMovies], { exact: false })
    queryClient.resetQueries([queryKeys.nowPlayingMovies])
  }

  console.log('props.', props.segmentedControl)

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <InfiniteScroll
        className={classNames(
          'mt-4 grid',
          isListView
            ? 'gap-4 md:grid-cols-2'
            : 'gap-2 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
        )}
        loadMore={() => !isFetchingNextPage && fetchNextPage()}
        hasMore={hasNextPage}
        loader={
          <div key={-1} className="col-span-full">
            <Spinner className="mx-auto" />
          </div>
        }
      >
        {data.pages.map((pageData) => {
          return pageData.results.map((movie: Movie) =>
            isListView ? (
              <HorizontalMovieCard key={movie.id} {...movie} />
            ) : (
              <VerticalMovieCard key={movie.id} {...movie} />
            )
          )
        })}
      </InfiniteScroll>
    </PullToRefresh>
  )
}

export default NowPlayingMovies