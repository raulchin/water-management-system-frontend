import axios from "axios";
import { clearAuthToken, getAuthToken } from "../features/auth/utils/authStorage";
import { logger } from "./logger";
import { getTraceId } from "./trace";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const partnerApiClient = axios.create({
  baseURL: import.meta.env.VITE_PARTNER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
    const token = getAuthToken()
    const traceId = getTraceId()

    config.headers['X-Trace-Id'] = traceId
    config.headers['X-Client-App'] = 'sigap-web'

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    logger.debug('Enviando petición HTTP', {
        traceId,
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
    });

    return config;
})

apiClient.interceptors.response.use (
    
    (response) => {
        const traceId = response.config.headers['X-Trace-Id']

        logger.info('Respuesta HTTP recibida', {
            traceId,
            status: response.status,
            method: response.config.method?.toUpperCase(),
            url: response.config.url,
        })

        return response
    },
    (error) => {
        const traceId = error.config?.headers?.['X-Trace-Id']

        logger.error('Error en petición HTTP', {
            traceId,
            status: error.response?.status,
            url: error.config?.url,
            method: error.config?.method?.toUpperCase(),
            message: error.message,
            backendMessage: error.response?.data,
        })

        if (error.response?.status === 401) {
            clearAuthToken()
            window.location.href = '/login'
        }

        return Promise.reject(error)
    },
)