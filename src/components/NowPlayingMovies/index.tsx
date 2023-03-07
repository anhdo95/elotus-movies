import InfiniteMovies from '@/components/InfiniteMovies'
import Filter from '@/components/Filter'
import SelectMenus from '@/components/Select'

const NowPlayingMovies = () => {
  const sorts = [
    { text: 'Popularity Descending', value: 'popularity.desc' },
    { text: 'Popularity Ascending', value: 'popularity.asc' },
    { text: 'Rating Descending', value: 'vote_average.desc' },
    { text: 'Rating Ascending', value: 'vote_average.asc' },
    { text: 'Release Date Descending', value: 'primary_release_date.desc' },
    { text: 'Release Date Ascending', value: 'primary_release_date.asc' },
  ]

  return (
    <section className="mt-12 mx-auto max-w-screen-xl">
      <div className="flex justify-between">
        <Filter />
        <SelectMenus items={sorts} onChange={console.log} />
      </div>
      <InfiniteMovies />
    </section>
  )
}

export default NowPlayingMovies
