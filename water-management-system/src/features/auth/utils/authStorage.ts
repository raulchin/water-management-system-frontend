const AUTH_TOKEN_KEY = 'wms_auth_token';
const AUTH_USER_KEY = 'wms_auth_user';
const listeners = new Set<() => void>()

function notifyAuthChange() {
  listeners.forEach((listener) => listener())
}

export function saveAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  notifyAuthChange()
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  notifyAuthChange();
}

export function subscribeAuthToken(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function saveAuthUser(user: AuthUserSession) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
  notifyAuthChange()
}

export function getAuthUser(): AuthUserSession | null {
  const value = localStorage.getItem(AUTH_USER_KEY)
  return value ? JSON.parse(value) : null
}

export type AuthUserSession = {
  idUsuario: number
  username: string
  email: string
  nombres: string
  roles: string[]
  roleId?: number
}
