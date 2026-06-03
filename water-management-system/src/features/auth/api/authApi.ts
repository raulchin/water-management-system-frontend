import type { AuthResponse, LoginInput } from '../types/auth.types'

const DEMO_USERS = [
  { id: 'usr-001', username: 'admin', password: 'Abc123..', name: 'Administrador Demo', email: 'admin@wms.local', role: 'admin' as const },
  { id: 'usr-002', username: 'operador', password: 'operador123', name: 'Operador Demo', email: 'operador@wms.local', role: 'operador' as const },
  { id: 'usr-003', username: 'socio', password: 'socio123', name: 'Socio Demo', email: 'socio@wms.local', role: 'socio' as const },
]

export async function loginApi(data: LoginInput): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  const user = DEMO_USERS.find((item) => item.username === data.username && item.password === data.password)

  if (!user) {
    throw new Error('Usuario o contrasena incorrectos')
  }

  return {
    token: `demo-token-${user.role}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}
