import { api } from "./api"
import { SignupFormData, LoginFormData } from "@/types/auth"

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

export const signup = async (data: SignupFormData): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/auth/signup", data)
  return response.data
}

export const login = async (data: LoginFormData): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>("/auth/login", data)
  return response.data
}