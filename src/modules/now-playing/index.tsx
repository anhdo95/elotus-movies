import { NextPage } from 'next'
import { withErrorGuard } from '@/lib/withErrorGuard/withErrorGuard'
import InfiniteMovies from '@/components/InfiniteMovies'
import Filter from '@/components/Filter'
import SelectMenus, { SelectItem } from '@/components/SelectMenus'
import { resolveRoute } from '@/lib/typed-route/typedRoute'
import { useRouter } from 'next/router'

import MainLayout from '@/layouts/MainLayout'

const NowPlaying: NextPage = () => {
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
    <MainLayout>
      <section className="mt-4 mx-auto w-full">
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
    </MainLayout>
  )
}

export default NowPlaying

export const getServerSideProps = withErrorGuard(async () => {
  return { props: {} }
})
