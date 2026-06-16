
import { meterApiClient, partnerApiClient } from '../../../config/apiClient';

import type {
  AsignarMedidorInput,
  MedidorAsignacion,
  SocioAsignacion,
} from '../types/asignacionMedidor.types';

import type { MeterAssignment } from '../types/asignacionMedidor.types'

type SocioResponse = {
  codResult: string
  message: string
  data: SocioAsignacion
}

type MedidorResponse = {
  codResult: string
  message: string
  data: MedidorAsignacion
}

type AsignacionResponse = {
  codResult: string
  message: string
  data: unknown
}

export async function searchPartnerByIdentification(identificacion: string): Promise<SocioAsignacion> {
  const response = await partnerApiClient.get<SocioResponse>(`/partners/tax-identification/${identificacion}`)
  return response.data.data
}

export async function searchMeterByNumber(numeroMedidor: string): Promise<MedidorAsignacion> {
  const response = await meterApiClient.get<MedidorResponse>(`/medidores/number/${numeroMedidor}`)
  return response.data.data
}

export async function assignmentMeter(data: AsignarMedidorInput): Promise<AsignacionResponse> {
  
  console.log('Payload asignacion medidor:', JSON.stringify(data, null, 2))

  try {
    const response = await meterApiClient.post<AsignacionResponse>('/medidor-socios', data)

    console.log('Respuesta asignacion medidor:', response.data)

    return response.data
  } catch (error: any) {
    console.error('Error asignacion medidor:', error.response?.data)
    throw error
  }

}

type MeterAssignmentsResponse = {
  codResult: string
  message: string
  data: MeterAssignment[]
}

export async function getMeterAssignments(): Promise<MeterAssignment[]> {
  const response = await meterApiClient.get<MeterAssignmentsResponse>('/medidor-socios')

  console.log('Respuesta completa asignaciones:', response)
  //console.log('JSON response.data asignaciones:', response.data)
  //console.log('Array de asignaciones:', response.data.data)
  //console.log('JSON asignaciones:', JSON.stringify(response.data, null, 2))
  return response.data.data
}