import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

function handleError(error: unknown): void {
  const title = error instanceof Error ? error.message : error

  /// ////////////////////////////
  // NOTE: no toast.closeAll() //
  /// ////////////////////////////

  toast.error(title)
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
})

export { queryKeys } from './constants'

export default queryClient
