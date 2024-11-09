import { createContext, useContext } from 'react'

import { AuthContextType } from '@utils/types'

export const AuthContext = createContext({} as AuthContextType)
export const useAuthContext = () => useContext(AuthContext)
