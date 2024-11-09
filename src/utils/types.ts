import { z } from "zod"
import { TaskStatus } from "./enum"

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

export const createUserSchema = userSchema
  .omit({ id: true })
  .extend({
    confirmPassword: z.string().min(6)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden"
  })

export type CreateUser = z.infer<typeof createUserSchema>

export type AuthParams = z.infer<typeof authParamsSchema>
export type User = z.infer<typeof userSchema>

export type Task = z.infer<typeof taskSchema>
export type CreateTask = z.infer<typeof createTaskSchema>

export type ToastContextType = {
  toast: (message: string) => void
  error: (message: string) => void
  success: (message: string) => void
}

export type AuthContextType = {
  isLogged: boolean
  login: (user: AuthParams) => void
  logout: () => void
  isLoginSuccess: boolean
  isLoginError: boolean
}

export type ChipType = "error" | "success" | "inactive" | "warning"
