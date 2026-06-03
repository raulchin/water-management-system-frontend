import { z } from 'zod'

export const lecturaSchema = z
  .object({
    socioId: z.string().min(1, 'El socio es obligatorio'),
    medidorId: z.string().min(1, 'El medidor es obligatorio'),
    fecha: z.string().min(1, 'La fecha es obligatoria'),
    lecturaActual: z.number().min(0),
    lecturaAnterior: z.number().min(0),
  })
  .refine((data) => data.lecturaActual >= data.lecturaAnterior, {
    message: 'La lectura actual no puede ser menor a la anterior',
    path: ['lecturaActual'],
  })

export type LecturaFormData = z.infer<typeof lecturaSchema>
