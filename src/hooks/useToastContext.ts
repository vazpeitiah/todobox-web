import { createContext, useContext } from 'react'

import { ToastContextType } from '@utils/types'

export const ToastContext = createContext({} as ToastContextType)
export const useToastContext = () => useContext(ToastContext)
