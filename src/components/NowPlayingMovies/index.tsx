import { Movie } from '@/types/movie'
import MovieCard from '@/components/MovieCard'

type ComponentProps = { movies: Movie[] }

const NowPlayingMovies = (props: ComponentProps) => {
  if (!props.movies) return null

  return (
    <section className="mt-12 mx-auto max-w-screen-xl">
      <div className="text-center">
        <p className="mt-3 text-gray-500">Filter here</p>
      </div>
      <div className="mt-12 grid gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {props.movies.map((movie) => (
          <MovieCard {...movie} />
        ))}
      </div>
    </section>
  )
}

export default NowPlayingMovies
