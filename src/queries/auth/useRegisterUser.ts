import { registerUser } from '@api/auth'
import { useToastContext } from '@hooks/useToastContext'
import { useMutation } from '@tanstack/react-query'

type UseRegisterUser = {
  onSuccess?: () => void
}

const useRegisterUser = (options?: UseRegisterUser) => {
  const { error: toastError, success } = useToastContext()
  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      success('Usuario registrado correctamente')
      options?.onSuccess?.()
    },
    onError: (error) => {
      toastError('Error en la petición: ', {
        description: error.message
      })
    }
  })

  return { registerUser: mutate }
}

export default useRegisterUser
