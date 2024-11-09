import { login } from "@api/auth"
import { useToastContext } from "@hooks/useToastContext"
import { useMutation } from "@tanstack/react-query"

const useLogin = () => {
  const { error: toastError } = useToastContext()
  const {
    data: token,
    mutate,
    isError,
    error,
    isSuccess
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token)
    },
    onError: () => toastError("Credenciales incorrectas")
  })

  return { token, login: mutate, isError, error, isSuccess }
}

export default useLogin
