import { AuthParams, User } from "@utils/types"
import authApi from "./authApi"

export const login = async (data: AuthParams) => {
  const response = await authApi.post("/login", data)
  return response.data as { token: string }
}

export const registerUser = async (data: Omit<User, "id">) => {
  const response = await authApi.post("/register", data)
  return response.data
}
