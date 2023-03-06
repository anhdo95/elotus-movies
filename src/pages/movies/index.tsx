import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { withErrorGuard } from '@/lib/withErrorGuard/withErrorGuard'
import { useAppService } from '@/context/AppProvider'
import { useQuery } from '@tanstack/react-query'

import { useState } from 'react'
import NowPlayingMovies from '@/components/NowPlayingMovies'

enum Tab {
  NowPlaying,
  TopRated,
}

const Movies: NextPage = () => {
  const service = useAppService()
  const router = useRouter()

  const { data: movies } = useQuery(['now-playing-movies'], () =>
    service.movie.getNowPlayingMovies()
  )

  const tabItems = [
    { key: Tab.NowPlaying, label: 'Now Playing' },
    { key: Tab.TopRated, label: 'Top Rated' },
  ]
  const [selectedTab, setSelectedItem] = useState(Tab.NowPlaying)

  return (
    <div className="px-4 md:px-8">
      <ul
        role="tablist"
        className="max-w-screen-xl mx-auto border-b flex items-center gap-x-3 overflow-x-auto text-sm"
      >
        {tabItems.map(({ key, label }) => (
          <li
            key={key}
            className={`py-2 border-b-2 ${
              selectedTab == key
                ? 'border-indigo-600 text-indigo-600'
                : 'border-white text-gray-500'
            }`}
          >
            <button
              role="tab"
              aria-selected={selectedTab == key ? true : false}
              aria-controls={`tabpanel-${key + 1}`}
              className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
              onClick={() => setSelectedItem(key)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div>
        {selectedTab === Tab.NowPlaying && (
          <NowPlayingMovies movies={movies?.results} />
        )}
      </div>
    </div>
  )
}

export default Movies

export const getServerSideProps = withErrorGuard(async (ctx, service) => {
  await service.queryClient.prefetchQuery(['now-playing-movies'], () =>
    service.movie.getNowPlayingMovies()
  )

  return { props: {} }
})
