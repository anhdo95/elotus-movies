import { NextPage } from 'next'
import { useState } from 'react'
import { withErrorGuard } from '@/lib/withErrorGuard/withErrorGuard'
import TopRatedMovies from '@/components/TopRatedMovies'
import Filter from '@/components/Filter'
import SelectMenus, { SelectItem } from '@/components/SelectMenus'
import SegmentedControl, { SegmentedType } from '@/components/SegmentedControl'
import { resolveRoute } from '@/lib/typed-route/typedRoute'
import { useRouter } from 'next/router'

import MainLayout from '@/layouts/MainLayout'

const TopRated: NextPage = () => {
  const router = useRouter()
  const sorts = [
    { text: 'Popularity Descending', value: 'popularity.desc' },
    { text: 'Popularity Ascending', value: 'popularity.asc' },
    { text: 'Rating Descending', value: 'vote_average.desc' },
    { text: 'Rating Ascending', value: 'vote_average.asc' },
  ]
  const [segmentedControl, setSegmentedControl] = useState(
    SegmentedType.GridView
  )

  function handleSortChange(selectedValue: SelectItem['value']) {
    const params = {
      ...router.query,
      sortBy: selectedValue,
    }

    router.replace(resolveRoute('Movies', params))
  }

  return (
    <MainLayout className="max-w-container px-container">
      <section className="mt-4 mx-auto w-full">
        <div className="flex justify-between items-center">
          <Filter />
          <div className="flex items-center">
            <SelectMenus
              className="mr-4"
              items={sorts}
              value={router.query.sortBy as string}
              onChange={handleSortChange}
            />
            <SegmentedControl onChange={setSegmentedControl} />
          </div>
        </div>
        <TopRatedMovies segmentedControl={segmentedControl} />
      </section>
    </MainLayout>
  )
}

export default TopRated

export const getServerSideProps = withErrorGuard(async () => {
  return { props: {} }
})
