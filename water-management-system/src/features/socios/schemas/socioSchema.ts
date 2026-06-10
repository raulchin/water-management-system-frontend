import { z } from 'zod'

export const socioSchema = z.object({
  nombres: z.string().min(1, 'Los nombres son obligatorios'),
  apellidos: z.string().min(1, 'Los apellidos son obligatorios'),
  cedula: z.string().min(1, 'La cedula es obligatoria'),
  telefono: z.string().min(1, 'El telefono es obligatorio'),
  correo: z.string().email('Ingrese un correo valido').optional().or(z.literal('')),
  direccion: z.string().min(1, 'La direccion es obligatoria'),
  estado: z.boolean(),
})

export type SocioFormData = z.infer<typeof socioSchema>
