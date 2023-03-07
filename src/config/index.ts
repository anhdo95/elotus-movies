const AppConfig = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.themoviedb.org',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  IMAGE_BASE_URL:
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
    'https://image.tmdb.org/t/p/w500/',
}

export default AppConfig
