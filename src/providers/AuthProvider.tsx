import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";

import { AuthContext } from "@hooks/useAuthContext"
import { useLocalStorage } from "@hooks/useLocalStorage"
import { useLogin } from "@queries/auth"
import { decodedTokenSchema } from "@utils/types";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  
  const { login, isError, isSuccess } = useLogin()
  const { get, remove } = useLocalStorage("token")
  const [isLogged, setIsLogged] = useState(true)
  const token = get()

  const decodedToken = (token: string | null) => {
    try {
      if (!token) return null
      return decodedTokenSchema.parse(jwtDecode(token))
    } catch (_error) {
      return null
    }
  }

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
        isLoginSuccess: isSuccess,
        decodedToken: decodedToken(token)
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
