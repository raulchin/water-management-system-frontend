import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../api/authApi';
import { saveAuthToken } from '../utils/authStorage';
import { logger } from '../../../config/logger';
import { getTraceId } from '../../../config/trace';

export function useLogin() {

  return useMutation({
    mutationFn: loginApi,

    onMutate: (request) => {
      logger.info('Iniciando proceso de login', {
        traceId: getTraceId(),
        username: request.username,
      })
    },

    onSuccess: (response) => {
      saveAuthToken(response.accessToken);

      logger.info('Login exitoso', {
        traceId: getTraceId(),
        tokenType: response.tokenType,
        expiresIn: response.expiresInMinutes,
      })
    },

    onError: (error) => {
      logger.error('Error en proceso de login', {
        traceId: getTraceId(),
        error,
      })
    },
  })
}
