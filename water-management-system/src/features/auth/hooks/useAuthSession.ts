import { useSyncExternalStore } from 'react'
import { getAuthToken, subscribeAuthToken, getAuthUser } from '../utils/authStorage'

export function useAuthSession() {
  const token = useSyncExternalStore(subscribeAuthToken, getAuthToken, () => null)
  const isAuthenticated = Boolean(token)

  const user = getAuthUser()

  return { token, user, isAuthenticated  }
}
