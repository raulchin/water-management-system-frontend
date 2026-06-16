import { z } from 'zod'

export const meterAssignmentSchema = z.object({
  identificacionSocio: z.string().min(1, 'Ingrese la identificacion o RUC del socio'),
  numeroMedidor: z.string().min(1, 'Ingrese el numero de medidor'),
  fechaAsignacion: z.string().min(1, 'La fecha de asignacion es obligatoria'),
  estado: z.enum(['ACTIVO', 'INACTIVO']),
  observacion: z.string().max(500, 'Maximo 500 caracteres').optional().or(z.literal('')),
})

export type MeterAssignmentFormData = z.infer<typeof meterAssignmentSchema>