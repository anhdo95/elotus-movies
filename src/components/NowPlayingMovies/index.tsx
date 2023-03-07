import InfiniteMovies from '@/components/InfiniteMovies'
import Filter from '@/components/Filter'
import SelectMenus, { SelectItem } from '@/components/Select'
import { resolveRoute } from '@/lib/typed-route/typedRoute'
import { useRouter } from 'next/router'

const NowPlayingMovies = () => {
  const router = useRouter()
  const sorts = [
    { text: 'Popularity Descending', value: 'popularity.desc' },
    { text: 'Popularity Ascending', value: 'popularity.asc' },
    { text: 'Rating Descending', value: 'vote_average.desc' },
    { text: 'Rating Ascending', value: 'vote_average.asc' },
    { text: 'Release Date Descending', value: 'primary_release_date.desc' },
    { text: 'Release Date Ascending', value: 'primary_release_date.asc' },
  ]

  function handleSortChange(selectedValue: SelectItem['value']) {
    const params = {
      ...router.query,
      sortBy: selectedValue,
    }

    router.replace(resolveRoute('Movies', params))
  }

  return (
    <section className="mt-12 mx-auto max-w-screen-xl">
      <div className="flex justify-between">
        <Filter />
        <SelectMenus
          items={sorts}
          value={router.query.sortBy as string}
          onChange={handleSortChange}
        />
      </div>
      <InfiniteMovies />
    </section>
  )
}

export default NowPlayingMovies
