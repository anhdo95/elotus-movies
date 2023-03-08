import { Genre } from './genre'

export type Movie = {
  adult: boolean
  backdropPath: string
  genreIds: number[]
  id: number
  originalLanguage: string
  originalTitle: string
  overview: string
  popularity: number
  posterPath: string
  releaseDate: string
  title: string
  video: boolean
  voteAverage: number
  voteCount: number
}

export type DetailedMovie = {
  adult: boolean
  backdropPath: string
  belongsToCollection: null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdbId: string
  originalLanguage: string
  originalTitle: string
  overview: string
  popularity: number
  posterPath: string
  productionCompanies: {
    id: number
    logoPath: string
    name: string
    originCountry: string
  }[]
  productionCountries: {
    iso31661: string
    name: string
  }[]
  releaseDate: string
  revenue: number
  runtime: number
  spokenLanguages: {
    englishName: string
    iso6391: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  voteAverage: number
  voteCount: number
}
