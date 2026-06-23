
import { z } from 'zod'

export const meterReadingSchema = z
  .object({
    meterId: z.number().min(1, 'El medidor es obligatorio'),
    assignmentId: z.number().min(1, 'La asignacion es obligatoria'),
    partnerIdentification: z.string().min(1, 'Ingrese la identificacion o RUC del socio'),
    partnerId: z.number().min(1, 'El socio es obligatorio'),
    period: z.string().min(1, 'El periodo es obligatorio'),
    readingDate: z.string().min(1, 'La fecha de lectura es obligatoria'),
    previousReading: z.number().min(0, 'La lectura anterior no puede ser negativa'),
    currentReading: z.number().min(0, 'La lectura actual no puede ser negativa'),
    status: z.enum(['REGISTRADA', 'ANULADA', 'VALIDADA']),
    observation: z.string().max(500, 'Maximo 500 caracteres').optional().or(z.literal('')),
    meterNumber: z.string().min(1, 'Ingrese el numero de medidor'),
  })
  .refine((data) => data.currentReading >= data.previousReading, {
    message: 'La lectura actual no puede ser menor a la anterior',
    path: ['currentReading'],
  })

export type MeterReadingFormData = z.infer<typeof meterReadingSchema>