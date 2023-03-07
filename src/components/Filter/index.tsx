import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useBoolean } from 'react-use'
import classNames from 'classnames'
import { reduce, pickBy, omit } from 'lodash-es'

import { resolveRoute } from '@/lib/typed-route/typedRoute'
import { toQueries } from '@/utils/helper'
import FilterPopup, { SubmitPayload } from '../FilterPopup'

import styles from './index.module.scss'

const mapKeys = (query: string | string[] | undefined) => {
  if (query === undefined) return {}

  return reduce(
    toQueries(query as string),
    (queries, key) => ({
      ...queries,
      [key]: true,
    }),
    {}
  )
}

const Filter: React.FC = () => {
  const router = useRouter()
  const [filterSheet, setFilterSheet] = useBoolean(false)

  const initialSelection = useMemo(
    () => ({
      withGenres: mapKeys(router.query.withGenres),
      online: mapKeys(router.query.online),
    }),
    [router.query]
  )

  const handleSubmit = (payload: SubmitPayload) => {
    setFilterSheet(false)

    const params = {
      ...omit(router.query, Object.keys(payload)), // Avoid getting payload params
      ...pickBy(payload, (value) => value.length), // Remove empty array params
    }

    router.replace(resolveRoute('Movies', params))
  }

  return (
    <>
      <span
        className="flex items-center text-xs font-bold cursor-pointer"
        onClick={() => setFilterSheet(true)}
      >
        <i className={classNames('mr-1', styles.filterIcon)} />
        Filter
      </span>

      <FilterPopup
        visible={filterSheet}
        initialSelection={initialSelection}
        onClose={() => setFilterSheet(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default Filter
