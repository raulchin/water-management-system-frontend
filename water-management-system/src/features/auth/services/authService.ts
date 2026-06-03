import { apiClient } from "../../../config/apiClient";

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse{
    token: string
    tokenType: string
    expiresIn: number
}

export const authService = {

    login: async (request: LoginRequest): Promise<LoginResponse> =>{
        const response = await apiClient.post<LoginResponse> ('/ms-auth-server/api/v1/auth/login', request)
        return response.data
    },

    register: async (request: unknown) => {
    const response = await apiClient.post('/auth/register', request)
    return response.data
    },

}