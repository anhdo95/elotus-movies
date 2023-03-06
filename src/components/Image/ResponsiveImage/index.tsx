import { HTMLAttributes } from 'react'
import classNames from 'classnames'

type Props = {
  width?: number | string
  height?: number | string
  className?: string
  src: string
  onError: HTMLAttributes<HTMLImageElement>['onError']
}

const Image: React.FC<Props> = ({ className, src, width, height, onError }) => {
  const ratio = (Number(height) / Number(width)) * 100

  return (
    <div className="relative block overflow-hidden">
      <div className="block" style={{ paddingTop: `${ratio || 100}%` }}>
        <img
          className={classNames(
            'absolute top-0 right-0 bottom-0 left-0',
            'block m-auto',
            'w-0 h-0',
            'min-w-full min-h-full',
            'max-w-full max-h-full',
            className
          )}
          src={src}
          alt=""
          onError={onError}
        />
      </div>
    </div>
  )
}

export default Image
