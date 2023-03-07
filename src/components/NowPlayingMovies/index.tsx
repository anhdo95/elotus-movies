import { Movie } from '@/types/movie'
import InfiniteMovies from '@/components/InfiniteMovies'

type ComponentProps = { movies: Movie[] }

const NowPlayingMovies = (props: ComponentProps) => {
  if (!props.movies) return null

  return (
    <section className="mt-12 mx-auto max-w-screen-xl">
      <div className="text-center">
        <p className="mt-3 text-gray-500">Filter here</p>
      </div>
      <InfiniteMovies />
    </section>
  )
}

export default NowPlayingMovies
