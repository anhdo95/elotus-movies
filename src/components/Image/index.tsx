import classNames from 'classnames'
import type { ImageProps } from 'next/image'
import { useState } from 'react'
import NextImage from './NextImage'

import styles from './index.module.scss'

type Props = ImageProps & {
  fallbackSrc?: string
}

const Image: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  function handleLoad() {
    setIsLoaded(true)
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.removeAttribute('srcset')

    if (props.fallbackSrc) {
      target.setAttribute('src', props.fallbackSrc)
    } else {
      target.style.display = 'none'
    }
    setIsLoaded(true)
  }

  return (
    <NextImage
      {...props}
      className={classNames(
        props.className,
        isLoaded ? styles.fadeIn : styles.fadeOut
      )}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}

export default Image
