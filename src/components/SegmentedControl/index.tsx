import React from 'react'
import classNames from 'classnames'

import styles from './index.module.scss'

export enum SegmentedType {
  GridView = 'GridView',
  ListView = 'ListView',
}

type ComponentProps = {
  onChange(segmentedType: SegmentedType): void
}

function SegmentedControl(props: ComponentProps) {
  function handleClick(selected: SegmentedType) {
    return () => props.onChange(selected)
  }

  return (
    <div className="flex">
      <span className="w-8 h-8">
        <i
          className={classNames('cursor-pointer mt-[2px]', styles.gridView)}
          onClick={handleClick(SegmentedType.GridView)}
        />
      </span>
      <span className="w-8 h-8">
        <i
          className={classNames('cursor-pointer -mt-[2px]', styles.listView)}
          onClick={handleClick(SegmentedType.ListView)}
        />
      </span>
    </div>
  )
}

export default SegmentedControl
