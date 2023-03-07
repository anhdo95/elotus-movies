import { TouchEvent, useMemo, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { map, reduce } from 'lodash-es'
import classNames from 'classnames'

import BottomSheet from '@/components/BottomSheet'
import FilterOptions from '@/types/filter-options'

type Genre = {
  id: number
  name: string
}

function getFilterOptions(genres: Genre[] = []): FilterOptions {
  return {
    withGenres: {
      title: 'Genres',
      choices: genres.map(({ id, name }) => ({ name, value: id.toString() })),
    },
  }
}

import styles from './index.module.scss'
import { useQuery } from '@tanstack/react-query'
import { useAppService } from '@/context/AppProvider'

export type SubmitPayload = {
  online: string[]
  withGenres: string[]
}

type OptionKey = keyof SubmitPayload
type Selection = Partial<Record<OptionKey, Record<string, boolean>>>

type Props = {
  visible: boolean
  initialSelection: Selection
  onClose: () => void
  onSubmit: (payload: SubmitPayload) => void
}

const TellerFilterPopup: React.FC<Props> = ({
  initialSelection,
  visible,
  onSubmit,
  onClose,
}) => {
  const service = useAppService()
  const { data: { genres } = {} } = useQuery(['movie-list-genres'], () =>
    service.genre.getMovieListGenres()
  )
  const options = useMemo(() => getFilterOptions(genres), [genres])
  const [selection, setSelection] = useState<Selection>(initialSelection)

  useUpdateEffect(() => setSelection(initialSelection), [visible])

  const toggleSelect = (property: OptionKey, value: string) => {
    setSelection({
      ...selection,
      [property]: {
        ...selection[property],
        [value]: !selection?.[property]?.[value],
      },
    })
  }

  const toArray = (property: OptionKey) => {
    const strings: string[] = []
    const items: string[] = reduce(
      selection[property],
      (result, value, key) => {
        if (value) result.push(key)
        return result
      },
      strings
    )

    return items
  }

  const handleReset = () => {
    setSelection(
      reduce(
        selection,
        (result, _, key) => {
          return {
            ...result,
            [key]: {},
          }
        },
        {}
      )
    )
  }

  const submit = () => {
    onSubmit({
      online: toArray('online'),
      withGenres: toArray('withGenres'),
    })
  }

  const preventScrollOutside = (e: TouchEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const renderOptions = () => {
    return map(options, ({ title, choices }, property) => (
      <div key={property} className={classes.option}>
        <span className="block text-sm text-111111">{title}</span>

        <div className="flex flex-wrap mt-3">
          {choices.map(({ name, value }) => (
            <span
              key={value}
              className={classNames(classes.choice, {
                [classes.active]: selection?.[property as OptionKey]?.[value],
              })}
              onClick={() => toggleSelect(property as OptionKey, value)}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    ))
  }

  return (
    <BottomSheet
      className="bg-white rounded-t-lg"
      visible={visible}
      onClose={onClose}
    >
      <header className={classes.header}>
        <span className={classes.title}>Filter</span>
        <div>
          <i className={classes.resetIcon} onClick={handleReset} />
          <i className={classes.closeIcon} onClick={onClose} />
        </div>
      </header>

      <div
        className={classNames(
          'px-4 pt-5 pb-6 border-b border-gray-200 overflow-y-auto max-h-[60vh]',
          styles.options
        )}
        onTouchEnd={preventScrollOutside}
        onTouchStart={preventScrollOutside}
        onTouchMove={preventScrollOutside}
        onScroll={preventScrollOutside}
      >
        {renderOptions()}
      </div>

      <footer className={classNames('px-4 py-5', styles.footer)}>
        <button className={classes.applyButton} onClick={submit}>
          Apply
        </button>
      </footer>
    </BottomSheet>
  )
}

// className="
const classes = {
  header: classNames(
    'flex items-center justify-between',
    'pt-[30px] pb-5 px-4',
    'border-b border-f4f4f4',
    styles.header
  ),
  resetIcon: classNames('cursor-pointer mr-[18px]', styles.resetIcon),
  closeIcon: classNames('cursor-pointer', styles.closeIcon),
  title: 'font-bold text-17px',
  option: 'mt-[30px] -mb-1.5 first:mt-0',
  choice:
    'inline-block px-[13px] py-[9px] text-xs text-111111 border border-solid border-dfdfdf rounded-[3px] mr-1.5 mb-1.5 cursor-pointer',
  active: classNames('!border-black bg-black', styles.active),
  applyButton: classNames(
    'w-full h-14 bg-indigo-600 text-white text-sm font-bold rounded-[5px]'
  ),
}
// "

export default TellerFilterPopup
