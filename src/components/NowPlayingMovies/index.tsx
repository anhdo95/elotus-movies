import { Movie } from '@/types/movie'

type ComponentProps = { movies: Movie[] }

const NowPlayingMovies = (props: ComponentProps) => {
  if (!props.movies) return null

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <p className="mt-3 text-gray-500">Filter here</p>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {props.movies.map((movie) => (
          <article
            className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={movie.id}
          >
            <a href={`movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                loading="lazy"
                alt={movie.title}
                className="w-full h-48 rounded-t-md"
              />
              <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <div className="flex-none w-10 h-10 rounded-full">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    className="w-full h-full rounded-full"
                    alt={movie.title}
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-gray-900">{movie.title}</span>
                  <span className="block text-gray-400 text-sm">
                    {movie.release_date}
                  </span>
                </div>
              </div>
              <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-xl text-gray-900">{movie.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{movie.overview}</p>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default NowPlayingMovies
