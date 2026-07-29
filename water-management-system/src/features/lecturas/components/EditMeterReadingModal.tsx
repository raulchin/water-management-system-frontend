import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useUpdateMeterReading } from "../hooks/useUpdateMeterReading";

import {
  updateMeterReadingSchema,
  type UpdateMeterReadingFormData,
} from "../schemas/updateMeterReadingSchema";

import type { MeterReading } from "../types/meterReading.types";

type Props = {
  reading: MeterReading | null;
  isOpen: boolean;
  onClose: () => void;
};

const inputClass =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]";

const readOnlyClass =
  "h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 shadow-sm";

const labelClass = "mb-2 block text-sm font-bold text-[#303659]";
const errorClass = "mt-1 text-xs font-semibold text-red-600";

export function EditMeterReadingModal({ reading, isOpen, onClose }: Props) {
  const updateMutation = useUpdateMeterReading();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdateMeterReadingFormData>({
    resolver: zodResolver(updateMeterReadingSchema),
    defaultValues: {
      readingDate: "",
      previousReading: 0,
      currentReading: 0,
      status: "REGISTRADA",
      observation: "",
    },
  });

  const previousReading = watch("previousReading");
  const currentReading = watch("currentReading");
  const observation = watch("observation") ?? "";
  const consumption =
    Number(currentReading || 0) - Number(previousReading || 0);

  useEffect(() => {
    if (!reading) {
      return;
    }

    setServerError(null);

    reset({
      readingDate: reading.readingDate,
      previousReading: reading.previousReading,
      currentReading: reading.currentReading,
      status: reading.status,
      observation: reading.observation ?? "",
    });
  }, [reading, reset]);

  if (!isOpen || !reading) {
    return null;
  }

  const onSubmit = async (data: UpdateMeterReadingFormData) => {
    try {
      setServerError(null);

      await updateMutation.mutateAsync({
        readingId: reading.readingId,
        data: {
          meterId: reading.meterId,
          assignmentId: reading.assignmentId,
          partnerId: reading.partnerId,
          period: reading.period,
          readingDate: data.readingDate,
          previousReading: data.previousReading,
          currentReading: data.currentReading,
          status: data.status,
          observation: data.observation || undefined,
        },
      });

      onClose();
    } catch (error: any) {
      setServerError(
        getBackendMessage(error, "No se pudo actualizar la lectura."),
      );
    }
  };

  const getBackendMessage = (error: any, fallback: string) =>
    error.response?.data?.errors?.[0]?.defaultMessage ??
    error.response?.data?.message ??
    fallback;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
              SIGAP
            </p>
            <h2 className="text-2xl font-extrabold text-[#201a57]">
              Editar lectura
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 p-2 text-[#303659] hover:bg-slate-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className={labelClass}>Periodo</label>
              <input
                value={reading.period}
                readOnly
                className={readOnlyClass}
              />
            </div>

            <div>
              <label className={labelClass}>Medidor</label>
              <input
                value={reading.meterNumber || "Sin medidor"}
                readOnly
                className={readOnlyClass}
              />
            </div>

            <div>
              <label className={labelClass}>Socio</label>
              <input
                value={reading.partnerIdentification || "Sin identificación"}
                readOnly
                className={readOnlyClass}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className={labelClass} htmlFor="readingDate">
                Fecha lectura <span className="text-red-500">*</span>
              </label>
              <input
                id="readingDate"
                type="date"
                className={inputClass}
                {...register("readingDate")}
              />
              {errors.readingDate ? (
                <p className={errorClass}>{errors.readingDate.message}</p>
              ) : null}
            </div>

            <div>
              <label className={labelClass} htmlFor="previousReading">
                Lectura anterior
              </label>
              <input
                id="previousReading"
                type="number"
                step="0.01"
                readOnly
                className={readOnlyClass}
                {...register("previousReading", { valueAsNumber: true })}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="currentReading">
                Lectura actual <span className="text-red-500">*</span>
              </label>
              <input
                id="currentReading"
                type="number"
                step="0.01"
                className={inputClass}
                {...register("currentReading", { valueAsNumber: true })}
              />
              {errors.currentReading ? (
                <p className={errorClass}>{errors.currentReading.message}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="status">
              Estado <span className="text-red-500">*</span>
            </label>

            <select id="status" className={inputClass} {...register("status")}>
              <option value="REGISTRADA">Registrada</option>
              <option value="VALIDADA">Validada</option>
              <option value="ANULADA">Anulada</option>
            </select>

            {errors.status ? (
              <p className={errorClass}>{errors.status.message}</p>
            ) : null}
          </div>

          <div className="rounded-xl border border-[#d8ccff] bg-[#f7f3ff] px-4 py-3">
            <p className="text-sm font-semibold text-[#4b2cb1]">
              Consumo recalculado
            </p>
            <p className="mt-1 text-2xl font-extrabold text-[#201a57]">
              {consumption >= 0 ? consumption.toFixed(2) : "0.00"} m3
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="observation">
              Observación
            </label>
            <textarea
              id="observation"
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-16 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
              {...register("observation")}
            />
            <p className="mt-1 text-right text-xs font-semibold text-slate-500">
              {observation.length}/500
            </p>
            {errors.observation ? (
              <p className={errorClass}>{errors.observation.message}</p>
            ) : null}
          </div>

          {serverError ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {serverError}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-4 border-t border-slate-200 pt-5">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5b35d5] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save size={18} />
              {updateMutation.isPending ? "Guardando..." : "Guardar cambios"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-[#303659] shadow-sm hover:bg-slate-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
