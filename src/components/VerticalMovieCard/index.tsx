import Link from 'next/link'
import Image from '@/components/Image'
import { Movie } from '@/types/movie'
import { getImageUrl } from '@/utils/helper'

function VerticalMovieCard(movie: Movie) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <a className="w-100 shadow-lg border rounded-md duration-300 hover:shadow-sm">
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
        <div className="flex flex-col mt-2 py-4 mx-4">
          <h3 className="block text-gray-900">{movie.title}</h3>
          <span className="block text-gray-400 text-sm">
            {movie.releaseDate}
          </span>
        </div>
      </a>
    </Link>
  )
}

export default VerticalMovieCard
