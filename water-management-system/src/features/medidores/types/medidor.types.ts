
export type MeterStatus = 'ACTIVO' | 'INACTIVO' | 'RETIRADO' | 'DANADO' | 'SUSPENDIDO';

export type Medidor = {
  medidorId: number
  numeroMedidor: string
  marca: string
  modelo: string
  ubicacion: string
  direccionReferencia: string
  fechaInstalacion: string
  estado: MeterStatus
  observacion: string
  fechaCreacion: string
}

export type CreateMeterInput = {
  numeroMedidor: string
  marca?: string
  modelo?: string
  ubicacion?: string
  direccionReferencia?: string
  fechaInstalacion?: string
  estado: MeterStatus
  observacion?: string
}