
import { z } from "zod";

export const penaltySchema = z.object({
  penaltyTypeId: z.number().min(1, "Seleccione el tipo de multa"),
  partnerId: z.number().min(1, "Debe buscar un socio válido"),
  partnerName: z.string().min(1, "Debe buscar un socio válido"),
  period: z.string().min(1, "Ingrese el periodo"),
  partnerIdentification: z
    .string()
    .min(1, "Ingrese la identificación del socio"),
  amount: z
    .number()
    .min(0, "El valor no puede ser negativo")
    .optional(),
  observation: z
    .string()
    .min(1, "Ingrese la observación")
    .max(500, "Máximo 500 caracteres"),
});

export type PenaltyFormData = z.infer<typeof penaltySchema>;