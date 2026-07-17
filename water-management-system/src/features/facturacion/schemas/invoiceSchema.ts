
import { z } from "zod";

export const invoiceSchema = z.object({
  partnerIdentification: z.string().min(1, "Ingrese la identificacion o RUC"),
  readingId: z.number().min(1, "Debe seleccionar una lectura"),
  partnerName: z.string().min(1, "El nombre del socio es obligatorio"),
  baseFee: z.number().min(0, "La tarifa base no puede ser negativa"),
  consumptionAmount: z.number().min(0, "El consumo no puede ser negativo"),
  penaltyAmount: z.number().min(0, "La multa no puede ser negativa"),
  discountAmount: z.number().min(0, "El descuento no puede ser negativo"),
  dueDate: z.string().min(1, "La fecha de vencimiento es obligatoria"),
  observation: z.string().max(500, "Maximo 500 caracteres").optional().or(z.literal("")),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;