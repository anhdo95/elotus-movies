import type { ImageProps } from 'next/image'
import NextImage from './NextImage'

type Props = ImageProps & {
  fallbackSrc?: string
}

const Image: React.FC<Props> = (props) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.removeAttribute('srcset')

    if (props.fallbackSrc) {
      target.setAttribute('src', props.fallbackSrc)
    } else {
      target.style.display = 'none'
    }
  }

  return <NextImage {...props} onError={handleError} />
}

export default Image
