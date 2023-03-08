import Link from 'next/link'
import Image from '@/components/Image'
import { Movie } from '@/types/movie'
import { getImageUrl } from '@/utils/helper'

function VerticalMovieCard(movie: Movie) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <a className="flex flex-col group w-100 border rounded-md shadow-md hover:shadow-xl">
        <Image
          src={getImageUrl(movie.posterPath)}
          // fallbackSrc={DefaultImage.src}
          layout="responsive"
          width={500}
          height={750}
          sizes="
              (max-width: 414px) 50vw,
              (max-width: 768px) 25vw,
              20vw"
        />
        <div className="flex flex-grow flex-col px-4 py-6 transition-colors duration-300 group-hover:bg-111111">
          <h3 className="block text-gray-900 group-hover:text-white">
            {movie.title}
          </h3>
          <span className="block text-gray-400 group-hover:text-white text-sm">
            {movie.releaseDate}
          </span>
        </div>
      </a>
    </Link>
  )
}

export default VerticalMovieCard
