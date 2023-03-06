const AppConfig = {
  API_URL: process.env.NEXT_PUBLIC_SSO_URL || 'https://api.themoviedb.org',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5001',
}

export default AppConfig
