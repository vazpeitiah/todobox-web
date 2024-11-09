import { useEffect, useState } from "react"

import { AuthContext } from "@hooks/useAuthContext"
import { useLocalStorage } from "@hooks/useLocalStorage"
import { useLogin } from "@queries/auth"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { login, isError, isSuccess } = useLogin()
  const { get, remove } = useLocalStorage("token")
  const [isLogged, setIsLogged] = useState(true)
  const token = get()

  useEffect(() => {
    if (token) {
      setIsLogged(true)
      return
    }
    setIsLogged(false)
  }, [token])

  const logout = () => {
    remove()
    setIsLogged(false)
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        isLogged,
        logout,
        isLoginError: isError,
        isLoginSuccess: isSuccess
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
