import { QueryClient } from '@tanstack/react-query'
import { createAppService } from '@/services'
import { redirect } from '@/utils/helper'

import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetServerSidePropsContext,
} from 'next'
import type { AppService } from '@/context/AppProvider'

type Func = (
  ctx: GetServerSidePropsContext,
  svc: { [key in keyof AppService]: AppService[key] } & {
    queryClient: QueryClient
  }
) => Promise<GetServerSidePropsResult<{}>>

type WithErrorGuard = (getServersideProps?: Func) => GetServerSideProps<{}>

export const withErrorGuard: WithErrorGuard = (func) => async (ctx) => {
  const queryClient = new QueryClient()

  try {
    const service = createAppService()

    const result = await func?.(ctx, {
      ...service,
      queryClient,
    })

    return result || { props: {} }
  } catch (error: any) {
    console.log(error)
    // TODO: redirect to error page
    const statusCode = error.response?.status ?? 0

    if (statusCode >= 500 || statusCode === 400) {
      return redirect('ServerError')
    }

    if (statusCode === 404) {
      return redirect('NotFoundError')
    }

    // Simply rethrow
    throw error
  }
}
