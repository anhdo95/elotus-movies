import Link from 'next/link'
import Image from '@/components/Image'
import { Movie } from '@/types/movie'
import classNames from 'classnames'
import { getImageUrl } from '@/utils/helper'

import styles from './index.module.scss'

function HorizontalMovieCard(movie: Movie) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <a className="w-full overflow-hidden shadow-lg grid xs:grid-cols-5 md:grid-cols-2 xl:grid-cols-5">
        <div className="xs:col-span-2 md:col-span-1 xl:col-span-2">
          <Image
            src={getImageUrl(movie.posterPath)}
            // fallbackSrc={DefaultImage.src}
            layout="responsive"
            width={500}
            height={750}
            sizes="
              (max-width: 414px) 50vw,
              33vw"
          />
        </div>
        <div className="xs:col-span-3 md:col-span-1 xl:col-span-3 flex flex-col px-4 lg:px-8 py-4 bg-color-333">
          <h3 className="text-3xl md:text-xl">{movie.title}</h3>
          <span className="text-sm mb-4">{movie.releaseDate}</span>
          <div className="flex-grow">
            <p
              className={classNames(
                'text-xl md:text-base lg:text-base  leading-snug truncate-overflow',
                styles.overview
              )}
            >
              {movie.overview}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default HorizontalMovieCard
