import { z } from 'zod'

export const socioSchema = z.object({
  nombres: z.string().min(1, 'Los nombres son obligatorios'),
  apellidos: z.string().min(1, 'Los apellidos son obligatorios'),
  cedula: z.string().min(1, 'La cedula es obligatoria'),
  telefono: z.string().min(1, 'El telefono es obligatorio'),
  correo: z.string().email('Ingrese un correo valido').optional().or(z.literal('')),
  direccion: z.string().min(1, 'La direccion es obligatoria'),
  numeroContrato: z.string().min(1, 'El numero de contrato es obligatorio'),
  numeroMedidor: z.string().min(1, 'El numero de medidor es obligatorio'),
  fechaAlta: z.string().min(1, 'La fecha de alta es obligatoria'),
  tipoSocio: z.string().min(1, 'Seleccione el tipo de socio'),
  estado: z.boolean(),
  observaciones: z.string().max(500, 'Maximo 500 caracteres').optional(),
})

export type SocioFormData = z.infer<typeof socioSchema>
