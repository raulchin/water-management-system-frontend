export type LoginInput = {
  username: string
  password: string
}

export type AuthUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'operador' | 'socio'
}

export type AuthResponse = {
  token: string
  user: AuthUser
}
