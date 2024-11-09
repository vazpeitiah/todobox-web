import { Toaster, toast as sonnerToast } from 'sonner'

import { useQueryClient } from '@tanstack/react-query'
import { ToastContext } from '@hooks/useToastContext'
import { ToastOptions } from '@utils/types'

const ToastProvider = (props: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()

  const toast = (message: string, options?: ToastOptions) => {
    sonnerToast(message, options)
  }

  const error = (message: string, options?: ToastOptions) => {
    sonnerToast.error(message, options)
  }

  const success = (message: string, options?: ToastOptions) => {
    sonnerToast.success(message, options)
  }

  queryClient.getQueryCache().config.onError = (errorObject, qk) => {
    sonnerToast.error('Error al hacer la petición', {
      description: `${qk.queryKey} : ${errorObject.message}`
    })
  }

  return (
    <ToastContext.Provider value={{ toast, error, success }}>
      <Toaster position="top-center" richColors />
      {props.children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
