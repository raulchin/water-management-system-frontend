
import { readingsApiClient } from '../../../config/apiClient'
import type { CreateMeterReadingInput, MeterReading } from '../types/meterReading.types'

type MeterReadingsResponse = {
  codResult: string
  message: string
  data: MeterReading[]
}

type MeterReadingResponse = {
  codResult: string
  message: string
  data: MeterReading
}

export async function getMeterReadings(): Promise<MeterReading[]> {
  const response = await readingsApiClient.get<MeterReadingsResponse>('/lecturas-medidor')

  console.log('Respuesta lecturas:', response.data)

  return response.data.data
}

export async function createMeterReading(data: CreateMeterReadingInput): Promise<MeterReading> {
  console.log('Payload registrar lectura:', JSON.stringify(data, null, 2))

  try {
    const response = await readingsApiClient.post<MeterReadingResponse>('/lecturas-medidor', data)

    console.log('Respuesta registrar lectura:', response.data)

    return response.data.data
  } catch (error: any) {
    console.error('Error registrar lectura:', error.response?.data)
    throw error
  }
}