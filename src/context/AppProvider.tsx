import { useMemo, useContext, createContext, FC, ReactNode } from 'react'
import { createAppService } from '@/services'

type AppContextValue = {
  service: ReturnType<typeof createAppService> | null
}

type AppProviderProps = {
  children: ReactNode
}

const AppContext = createContext<AppContextValue>({
  service: null,
})

AppContext.displayName = 'AppContext'

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const service = useMemo(() => createAppService(), [])

  const value = useMemo(
    () => ({
      service,
    }),
    [service]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function useAppService() {
  const context = useContext(AppContext)
  if (context === undefined || !context.service) {
    throw new Error('useAppService must be used within a AppProvider')
  }
  return context.service
}

export type AppService = ReturnType<typeof createAppService>
export { AppProvider, AppContext, useAppService }
