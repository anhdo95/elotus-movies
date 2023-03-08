import { NextPage } from 'next'
import { withErrorGuard } from '@/lib/withErrorGuard/withErrorGuard'
import Image from '@/components/Image'
import { useRouter } from 'next/router'

import MainLayout from '@/layouts/MainLayout'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/react-query/constants'
import { useAppService } from '@/context/AppProvider'
import { getImageUrl } from '@/utils/helper'
import classNames from 'classnames'

import styles from './index.module.scss'

const MovieDetails: NextPage = () => {
  const router = useRouter()
  const service = useAppService()

  const movieId = Number(router.query.id as string)
  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery([queryKeys.movieDetails, router.query.id], () =>
    service.movie.getMovieById(movieId)
  )

  if (isLoading) return <div className="loading">Loading...</div>
  if (isError) return null

  console.log('movie', movie)

  return (
    <MainLayout>
      <section className="mt-2 mx-auto w-full">
        <div
          className="bg-no-repeat bg-cover bg-top"
          style={{ backgroundImage: `url(${getImageUrl(movie.backdropPath)})` }}
        >
          <div className={classNames('overflow-hidden', styles.backdrop)}>
            <div className="max-w-container mx-auto grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 text-white p-container w-full">
              <div className="md:col-span-2 lg:col-span-1">
                <Image
                  className="rounded-md"
                  src={getImageUrl(movie.posterPath)}
                  // fallbackSrc={DefaultImage.src}
                  priority
                  width={500}
                  height={750}
                />
              </div>
              <div className="md:col-span-3 lg:col-span-3 flex flex-col px-4 lg:px-8 py-4 bg-color-333">
                <h3 className="font-semibold text-2xl md:text-3xl">
                  {movie.title}
                </h3>
                <div className="mb-4">
                  <span className="">{movie.releaseDate}</span>
                  <span className="ml-4">
                    {movie.genres.map(({ name }) => name).join(', ')}
                  </span>
                </div>
                <div className="italic text-gray-300">{movie.tagline}</div>
                <div className="mt-4">
                  <h3 className="font-bold text-lg">Overview</h3>
                  <p
                    className={classNames(
                      'text-xl md:text-base lg:text-base mt-2 leading-snug truncate-overflow'
                    )}
                  >
                    {movie.overview}
                  </p>
                </div>
                <div className="flex-grow mt-4">
                  <h3 className="font-bold text-lg">Production companies</h3>
                  <ul className="grid grid-cols-2 gap-2 list-disc ml-4 mt-2">
                    {movie.productionCompanies.map(
                      ({ name, originCountry }) => (
                        <li key={name}>
                          {name} ({originCountry})
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-container mx-auto px-container">
          <div className="mt-6">
            <h3 className="font-bold text-lg">Top Billed Cast</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              fugit aut exercitationem architecto. Quibusdam consectetur amet
              quaerat nulla similique ipsum qui, esse vero facilis natus
              quisquam laborum iure recusandae ipsa.
            </p>
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-lg">Reviews</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              fugit aut exercitationem architecto. Quibusdam consectetur amet
              quaerat nulla similique ipsum qui, esse vero facilis natus
              quisquam laborum iure recusandae ipsa.
            </p>
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-lg">Discussions</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              fugit aut exercitationem architecto. Quibusdam consectetur amet
              quaerat nulla similique ipsum qui, esse vero facilis natus
              quisquam laborum iure recusandae ipsa.
            </p>
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-lg">Recommendations</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
              fugit aut exercitationem architecto. Quibusdam consectetur amet
              quaerat nulla similique ipsum qui, esse vero facilis natus
              quisquam laborum iure recusandae ipsa.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default MovieDetails

export const getServerSideProps = withErrorGuard(async () => {
  return { props: {} }
})
