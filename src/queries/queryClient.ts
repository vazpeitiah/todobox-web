import { QueryClient } from '@tanstack/react-query'
import { STALE_TIME } from '@utils/const'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: STALE_TIME
    }
  }
})

export default queryClient
