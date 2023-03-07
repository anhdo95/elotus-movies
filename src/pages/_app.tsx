import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Component {...pageProps} />
        <Modal />
      </AppProvider>
    </QueryClientProvider>
  )
}
