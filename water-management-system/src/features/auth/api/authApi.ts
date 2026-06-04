
import { apiClient } from "../../../config/apiClient";
import type { AuthResponse, LoginInput, RegisterInput } from "../types/auth.types";

export async function loginApi ( data: LoginInput): Promise<AuthResponse>{
  const response = await apiClient.post<AuthResponse>('/auth/login', {
    username: data.username,
    password: data.password,
  })
  return response.data;
}

export async function registerApi(data: RegisterInput) {
  const response = await apiClient.post('/auth/register', data)
  return response.data
}
