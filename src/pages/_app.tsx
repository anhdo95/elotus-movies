import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useMount } from 'react-use'
import { ToastContainer } from 'react-toastify'

import { AppProvider } from '@/context'
import queryClient from '@/react-query/queryClient'

import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  useMount(() => {
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AppProvider>
    </QueryClientProvider>
  )
}
