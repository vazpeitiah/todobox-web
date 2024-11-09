import { registerUser } from "@api/auth"
import { useMutation } from "@tanstack/react-query"

const useRegisterUser = () => {
  const { mutate } = useMutation({
    mutationFn: registerUser
  })

  return { registerUser: mutate }
}

export default useRegisterUser
