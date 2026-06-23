
export type MeterReadingStatus = 'REGISTRADA' | 'ANULADA' | 'VALIDADA'

export type MeterReading = {
  readingId: number
  meterId: number
  assignmentId: number
  partnerId: number
  period: string
  readingDate: string
  previousReading: number
  currentReading: number
  consumption: number
  status: MeterReadingStatus
  observation?: string
  createdAt?: string
  meterNumber?: string
  partnerIdentification?: string
}

export type CreateMeterReadingInput = {
  meterId: number
  assignmentId: number
  partnerId: number
  period: string
  readingDate: string
  previousReading: number
  currentReading: number
  status: MeterReadingStatus
  observation?: string
}