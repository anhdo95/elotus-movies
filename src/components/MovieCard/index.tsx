import Image from '@/components/Image'
import { Movie } from '@/types/movie'
import AppConfig from '@/config'

function getImageUrl(url: string) {
  return `${AppConfig.IMAGE_BASE_URL}/${url}`
}

function MovieCard(movie: Movie) {
  return (
    <article
      className="w-100 shadow-lg border rounded-md duration-300 hover:shadow-sm"
      key={movie.id}
    >
      <a href={`movies/${movie.id}`}>
        <Image
          src={getImageUrl(movie.poster_path)}
          // fallbackSrc={DefaultImage.src}
          layout="responsive"
          width={500}
          height={750}
        />
        <div className="flex flex-col mt-2 py-4 mx-4">
          <span className="block text-gray-900">{movie.title}</span>
          <span className="block text-gray-400 text-sm">
            {movie.release_date}
          </span>
        </div>
      </a>
    </article>
  )
}

export default MovieCard
