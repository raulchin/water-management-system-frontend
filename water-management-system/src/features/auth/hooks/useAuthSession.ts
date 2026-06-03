import { useSyncExternalStore } from 'react'
import { getAuthToken, subscribeAuthToken } from '../utils/authStorage'

export function useAuthSession() {
  const token = useSyncExternalStore(subscribeAuthToken, getAuthToken, () => null)
  const isAuthenticated = Boolean(token)

  return { token, isAuthenticated }
}
