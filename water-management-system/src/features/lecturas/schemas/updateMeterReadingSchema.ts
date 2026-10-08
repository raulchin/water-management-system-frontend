import { z } from "zod";

export const updateMeterReadingSchema = z
  .object({
    readingDate: z.string().min(1, "La fecha de lectura es obligatoria"),
    previousReading: z
      .number()
      .min(0, "La lectura anterior no puede ser negativa"),
    currentReading: z
      .number({
        error: "La lectura actual es obligatoria",
      })
      .positive("La lectura actual debe ser mayor a cero"),
    status: z.enum(["REGISTRADA", "ANULADA", "VALIDADA"]),
    observation: z
      .string()
      .max(500, "Maximo 500 caracteres")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.currentReading >= data.previousReading, {
    message: "La lectura actual no puede ser menor a la anterior",
    path: ["currentReading"],
  });

export type UpdateMeterReadingFormData = z.infer<
  typeof updateMeterReadingSchema
>;
