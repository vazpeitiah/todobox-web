import { z } from 'zod'
import { TaskStatus } from './enum'

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(3),
  description: z.string().trim().optional(),
  date: z.coerce.date().nullish(),
  status: z.nativeEnum(TaskStatus)
})

export const createTaskSchema = taskSchema.omit({ id: true })

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
})

export const authParamsSchema = userSchema.omit({ name: true, id: true })

export const decodedTokenSchema = userSchema
  .omit({ password: true, id: true })
  .extend({
    userId: z.string(),
    iat: z.number(),
    exp: z.number()
  })

export const createUserSchema = userSchema
  .omit({ id: true })
  .extend({
    confirmPassword: z.string().min(6)
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }
    return true
  })
export type DecodedToken = z.infer<typeof decodedTokenSchema>
export type CreateUser = z.infer<typeof createUserSchema>

export type AuthParams = z.infer<typeof authParamsSchema>
export type User = z.infer<typeof userSchema>

export type Task = z.infer<typeof taskSchema>
export type CreateTask = z.infer<typeof createTaskSchema>

export type ToastOptions = {
  description: string
}

export type ToastContextType = {
  toast: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  success: (message: string, options?: ToastOptions) => void
}

export type AuthContextType = {
  isLogged: boolean
  login: (user: AuthParams) => void
  logout: () => void
  isLoginSuccess: boolean
  isLoginError: boolean
  decodedToken: DecodedToken | null
}

export type ChipType = 'error' | 'success' | 'inactive' | 'warning'
