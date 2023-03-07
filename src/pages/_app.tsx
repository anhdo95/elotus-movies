import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NProgress from 'nprogress'
import Router from 'next/router'
import { useMount } from 'react-use'

import { AppProvider } from '@/context'
import Modal from '@/components/Modal'

import '@/styles/globals.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3e3,
    },
  },
})

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
        <Modal />
      </AppProvider>
    </QueryClientProvider>
  )
}
