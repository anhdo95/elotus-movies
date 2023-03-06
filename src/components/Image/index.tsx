import type { ImageProps } from 'next/image'
// import { useAppState } from '@/shared/components/AppState'
// import ResponsiveImage from './ResponsiveImage'
import NextImage from './NextImage'

type Props = ImageProps & {
  fallbackSrc?: string
}

const Image: React.FC<Props> = (props) => {
  // const appState = useAppState()

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.removeAttribute('srcset')

    if (props.fallbackSrc) {
      target.setAttribute('src', props.fallbackSrc)
    } else {
      target.style.display = 'none'
    }
  }

  // if (
  //   (appState.device.iPhone5 || appState.device.android) &&
  //   typeof props.src === 'string'
  // ) {
  //   return <ResponsiveImage {...props} src={props.src} onError={handleError} />
  // }

  return <NextImage {...props} onError={handleError} />
}

export default Image
