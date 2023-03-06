import Image, { ImageProps } from 'next/image'

const optimizedImageDomains = ['https://image.tmdb.org']

function isUnoptimizedUrl(url: string): boolean {
  return (
    /^https?:\/\//i.test(url) &&
    !optimizedImageDomains.some((domain) =>
      url.startsWith(`https://${domain}/`)
    )
  )
}

type Props = ImageProps & {
  fallbackSrc?: string
}

const NextImage: React.FC<Props> = ({ fallbackSrc, ...props }) => {
  if (!props.src) {
    if (!fallbackSrc) {
      return null
    }
    // eslint-disable-next-line no-param-reassign
    props.src = fallbackSrc
  }

  if (typeof props.src === 'string') {
    return <Image {...props} unoptimized={isUnoptimizedUrl(props.src)} />
  }

  return <Image {...props} />
}

export default NextImage
