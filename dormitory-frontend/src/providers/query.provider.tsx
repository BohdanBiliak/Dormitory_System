'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, useMemo, memo } from 'react'

interface QueryProviderProps {
  children: React.ReactNode;
}

const QueryProvider = memo(function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }))

  const devtools = useMemo(() => <ReactQueryDevtools initialIsOpen={false} />, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {devtools}
    </QueryClientProvider>
  )
})

export default QueryProvider