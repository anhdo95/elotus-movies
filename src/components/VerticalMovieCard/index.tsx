import Image from '@/components/Image'
import { Movie } from '@/types/movie'
import AppConfig from '@/config'

function getImageUrl(url: string) {
  return `${AppConfig.IMAGE_BASE_URL}/${url}`
}

function VerticalMovieCard(movie: Movie) {
  return (
    <article className="w-100 shadow-lg border rounded-md duration-300 hover:shadow-sm">
      <a href={`movies/${movie.id}`}>
        <Image
          src={getImageUrl(movie.posterPath)}
          // fallbackSrc={DefaultImage.src}
          layout="responsive"
          width={500}
          height={750}
        />
        <div className="flex flex-col mt-2 py-4 mx-4">
          <h3 className="block text-gray-900">{movie.title}</h3>
          <span className="block text-gray-400 text-sm">
            {movie.releaseDate}
          </span>
        </div>
      </a>
    </article>
  )
}

export default VerticalMovieCard
