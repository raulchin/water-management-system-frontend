const AUTH_TOKEN_KEY = 'wms_auth_token'
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
  localStorage.removeItem(AUTH_TOKEN_KEY)
  notifyAuthChange()
}

export function subscribeAuthToken(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}
