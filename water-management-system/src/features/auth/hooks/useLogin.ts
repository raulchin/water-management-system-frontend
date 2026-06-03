import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../api/authApi'
import { saveAuthToken } from '../utils/authStorage'

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      saveAuthToken(response.token)
    },
  })
}
