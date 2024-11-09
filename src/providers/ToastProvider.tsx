import { Toaster, toast as sonnerToast } from "sonner"

import { useQueryClient } from "@tanstack/react-query"
import { ToastContext } from "@hooks/useToastContext"

const ToastProvider = (props: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()

  const toast = (message: string) => {
    sonnerToast(message)
  }

  const error = (message: string) => {
    sonnerToast.error(message)
  }

  const success = (message: string) => {
    sonnerToast.success(message)
  }

  queryClient.getQueryCache().config.onError = (errorObject, qk) => {
    sonnerToast.error("Error al hacer la petición", {
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
