export type SocioAsignacion = {
  idPartner: number
  taxIdentification: string
  names: string
  lastName: string
  address?: string
  phone?: string
  email?: string
  status?: boolean
}

export type MedidorAsignacion = {
  medidorId: number
  numeroMedidor: string
  marca?: string
  modelo?: string
  ubicacion?: string
  direccionReferencia?: string
  fechaInstalacion?: string
  estado: 'ACTIVO' | 'INACTIVO' | 'RETIRADO' | 'DANADO' | 'SUSPENDIDO'
}

export type AsignarMedidorInput = {
  socioId: number
  medidorId: number
  fechaAsignacion: string
  estado: 'ACTIVO' | 'INACTIVO'
  observacion?: string
}

export type EstadoAsignacionMedidor = 'ACTIVO' | 'INACTIVO';

export type MeterAssignment = {
  idAsignacion: number
  socioId: number
  medidorId: number
  identificacionSocio: string
  nombresSocio: string
  numeroMedidor: string
  marcaMedidor?: string
  modeloMedidor?: string
  fechaAsignacion: string
  estado: EstadoAsignacionMedidor
  observacion?: string
}

export type ReadingAssignmentPartner = {
  socioId: number
  identificacionSocio: string
  nombreSocio: string
  email: string
}

export type ReadingMeterAssignment = {
  asignacionId: number
  medidorId: number
  numeroMedidor: string
  marcaMedidor: string
  modeloMedidor: string
  estadoAsignacion: 'ACTIVO' | 'INACTIVO'
}

export type ReadingAssignmentsByPartner = {
  socio: ReadingAssignmentPartner
  asignaciones: ReadingMeterAssignment[]
}