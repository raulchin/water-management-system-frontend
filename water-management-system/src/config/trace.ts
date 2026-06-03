const TRACE_ID_KEY = 'sigap_trace_id'

export function getTraceId(): string {
  let traceId = sessionStorage.getItem(TRACE_ID_KEY)

  if (!traceId) {
    traceId = crypto.randomUUID()
    sessionStorage.setItem(TRACE_ID_KEY, traceId)
  }

  return traceId
}

export function resetTraceId(): void {
  sessionStorage.removeItem(TRACE_ID_KEY)
}