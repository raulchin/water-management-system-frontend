type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL ?? 'info'
const ENABLE_LOGS = import.meta.env.VITE_ENABLE_FRONT_LOGS === 'true'

const levelOrder: Record<LogLevel, number> = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
}

function shouldLog(level: LogLevel): boolean {
  if (!ENABLE_LOGS) return false

  const currentLevel = LOG_LEVEL as LogLevel
  return levelOrder[level] >= levelOrder[currentLevel]
}

function formatMessage(level: LogLevel, message: string) {
  const date = new Date().toISOString()
  return `[${date}] [${level.toUpperCase()}] ${message}`
}

export const logger = {
  debug: (message: string, data?: unknown) => {
    if (shouldLog('debug')) {
      console.debug(formatMessage('debug', message), data ?? '')
    }
  },

  info: (message: string, data?: unknown) => {
    if (shouldLog('info')) {
      console.info(formatMessage('info', message), data ?? '')
    }
  },

  warn: (message: string, data?: unknown) => {
    if (shouldLog('warn')) {
      console.warn(formatMessage('warn', message), data ?? '')
    }
  },

  error: (message: string, data?: unknown) => {
    if (shouldLog('error')) {
      console.error(formatMessage('error', message), data ?? '')
    }
  },
}