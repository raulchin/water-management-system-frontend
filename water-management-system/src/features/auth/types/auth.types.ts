export type LoginInput = {
  username: string
  password: string
}

export type AuthUser = {
  id?: string
  name?: string
  email?: string
  role?: 'admin' | 'operador' | 'socio'
}

export type AuthResponse = {
  accessToken: string
  tokenType: string
  expiresInMinutes: number
  idUsuario: number
  username: string
  email: string
  nombres: string
  roles: string[]
}

export type RegisterInput = {
  username: string
  password: string
  email: string
  nombres: string
  rol: string
}
