
import { z } from 'zod'

export const meterSchema = z.object({
  numeroMedidor: z.string().min(1, 'El numero de medidor es obligatorio').max(50, 'Maximo 50 caracteres'),
  marca: z.string().max(100, 'Maximo 100 caracteres').optional().or(z.literal('')),
  modelo: z.string().max(100, 'Maximo 100 caracteres').optional().or(z.literal('')),
  ubicacion: z.string().max(255, 'Maximo 255 caracteres').optional().or(z.literal('')),
  direccionReferencia: z.string().max(255, 'Maximo 255 caracteres').optional().or(z.literal('')),
  fechaInstalacion: z.string().optional().or(z.literal('')),
  estado: z.enum(['ACTIVO', 'INACTIVO', 'RETIRADO', 'DANADO', 'SUSPENDIDO']),
  observacion: z.string().max(500, 'Maximo 500 caracteres').optional().or(z.literal('')),
})

export type MeterFormData = z.infer<typeof meterSchema>