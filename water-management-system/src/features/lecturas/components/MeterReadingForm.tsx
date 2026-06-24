import { zodResolver } from "@hookform/resolvers/zod";
import { Brush, Calendar, Search, Gauge, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  meterReadingSchema,
  type MeterReadingFormData,
} from "../schemas/meterReadingSchema";

import { useEffect } from "react";

import type {
  ReadingAssignmentPartner,
  ReadingMeterAssignment,
} from "../../medidores/types/asignacionMedidor.types";

type Props = {
  onSubmit: (data: MeterReadingFormData) => void;
  onCancel: () => void;
  serverError?: string | null;
  successMessage?: string | null;
  isSaving?: boolean;
  onClearMessages?: () => void;
  onClearSelection?: () => void;
  isSearchingPartner?: boolean;
  assignmentPartner?: ReadingAssignmentPartner | null;
  partnerAssignments?: ReadingMeterAssignment[];
  selectedAssignment?: ReadingMeterAssignment | null;
  onSearchPartner?: (identification: string) => void;
  onSelectAssignment?: (assignment: ReadingMeterAssignment) => void;
};

const defaultValues: MeterReadingFormData = {
  meterId: 0,
  assignmentId: 0,
  partnerIdentification: "",
  partnerId: 0,
  period: "",
  readingDate: "",
  previousReading: 0,
  currentReading: 0,
  status: "REGISTRADA",
  observation: "",
  meterNumber: "",
};

const inputClass =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-4 pr-11 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]";

const labelClass = "mb-2 block text-sm font-bold text-[#303659]";
const errorClass = "mt-1 text-xs font-semibold text-red-600";

const readOnlyClass =
  "h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 shadow-sm";

export function MeterReadingForm({
  onSubmit,
  onCancel,
  serverError,
  successMessage,
  isSaving,
  isSearchingPartner,
  assignmentPartner,
  partnerAssignments = [],
  selectedAssignment,
  onSearchPartner,
  onSelectAssignment,
  onClearMessages,
  onClearSelection,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MeterReadingFormData>({
    resolver: zodResolver(meterReadingSchema),
    defaultValues,
  });

  const previousReading = watch("previousReading");
  const currentReading = watch("currentReading");
  const observation = watch("observation") ?? "";
  const consumption =
    Number(currentReading || 0) - Number(previousReading || 0);

  const handleClear = () => {
    reset(defaultValues);
    onClearMessages?.();
    onClearSelection?.();
  };

  const partnerIdentification = watch("partnerIdentification");

  useEffect(() => {
    if (assignmentPartner && selectedAssignment) {
      setValue("partnerId", assignmentPartner.socioId, {
        shouldValidate: true,
      });
      setValue("assignmentId", selectedAssignment.asignacionId, {
        shouldValidate: true,
      });
      setValue("meterId", selectedAssignment.medidorId, {
        shouldValidate: true,
      });
      setValue("meterNumber", selectedAssignment.numeroMedidor, {
        shouldValidate: true,
      });
    }
  }, [assignmentPartner, selectedAssignment, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="grid content-start gap-x-6 gap-y-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <label className={labelClass} htmlFor="partnerIdentification">
                  Identificacion/RUC <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-[minmax(0,1fr)_44px] gap-2">
                  <input
                    id="partnerIdentification"
                    className={inputClass}
                    placeholder="0105744718"
                    {...register("partnerIdentification")}
                  />

                  <button
                    type="button"
                    onClick={() => onSearchPartner?.(partnerIdentification)}
                    disabled={isSearchingPartner}
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
                    aria-label="Buscar socio"
                  >
                    <Search size={18} />
                  </button>
                </div>

                {errors.partnerIdentification ? (
                  <p className={errorClass}>
                    {errors.partnerIdentification.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  className={readOnlyClass}
                  value={assignmentPartner?.nombreSocio ?? ""}
                  readOnly
                />
              </div>

              <div>
                <label className={labelClass}>Correo</label>
                <input
                  className={readOnlyClass}
                  value={assignmentPartner?.email ?? ""}
                  readOnly
                />
              </div>
            </div>
          </div>

          {partnerAssignments.length > 0 ? (
            <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-4 py-3">
                <h3 className="text-sm font-bold text-[#201a57]">
                  Medidores asignados al socio
                </h3>
                <p className="text-xs text-slate-500">
                  Seleccione el medidor para registrar la lectura.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="px-4 py-3">Seleccionar</th>
                      <th className="px-4 py-3">Medidor</th>
                      <th className="px-4 py-3">Marca</th>
                      <th className="px-4 py-3">Modelo</th>
                      <th className="px-4 py-3 text-center">Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {partnerAssignments.map((assignment) => {
                      const isSelected =
                        selectedAssignment?.asignacionId ===
                        assignment.asignacionId;

                      return (
                        <tr
                          key={assignment.asignacionId}
                          className={`border-t border-slate-100 transition ${
                            isSelected ? "bg-[#efe9ff]" : "hover:bg-slate-50"
                          }`}
                        >
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => onSelectAssignment?.(assignment)}
                              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                                isSelected
                                  ? "bg-[#5b35d5] text-white"
                                  : "border border-[#5b35d5] bg-white text-[#5b35d5] hover:bg-[#efe9ff]"
                              }`}
                            >
                              {isSelected ? "Seleccionado" : "Seleccionar"}
                            </button>
                          </td>

                          <td className="px-4 py-3 font-semibold text-slate-900">
                            {assignment.numeroMedidor}
                          </td>

                          <td className="px-4 py-3">
                            {assignment.marcaMedidor}
                          </td>

                          <td className="px-4 py-3">
                            {assignment.modeloMedidor}
                          </td>

                          <td className="px-4 py-3 text-center">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
                                assignment.estadoAsignacion === "ACTIVO"
                                  ? "bg-green-500"
                                  : "bg-pink-600"
                              }`}
                            >
                              {assignment.estadoAsignacion}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          <div className="lg:col-span-2">
            <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <label className={labelClass} htmlFor="meterNumber">
                  Numero de medidor <span className="text-red-500">*</span>
                </label>

                <div className="grid gap-2 grid-cols-[minmax(0,1fr)_44px]">
                  <input
                    id="meterNumber"
                    className={readOnlyClass}
                    readOnly
                    {...register("meterNumber")}
                  />
                </div>

                {errors.meterNumber ? (
                  <p className={errorClass}>{errors.meterNumber.message}</p>
                ) : null}
              </div>

              <div>
                <label className={labelClass}>Marca</label>
                <input
                  className={readOnlyClass}
                  value={selectedAssignment?.marcaMedidor ?? ""}
                  readOnly
                />
              </div>

              <div>
                <label className={labelClass}>Modelo</label>
                <input
                  className={readOnlyClass}
                  value={selectedAssignment?.modeloMedidor ?? ""}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 lg:grid-cols-4">
              <div>
                <label className={labelClass} htmlFor="period">
                  Periodo <span className="text-red-500">*</span>
                </label>
                <input
                  id="period"
                  type="month"
                  className={inputClass}
                  {...register("period")}
                />
                {errors.period ? (
                  <p className={errorClass}>{errors.period.message}</p>
                ) : null}
              </div>

              <div>
                <label className={labelClass} htmlFor="readingDate">
                  Fecha lectura <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="readingDate"
                    type="date"
                    className={inputClass}
                    {...register("readingDate")}
                  />
                  <Calendar
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={20}
                  />
                </div>
                {errors.readingDate ? (
                  <p className={errorClass}>{errors.readingDate.message}</p>
                ) : null}
              </div>

              <div>
                <label className={labelClass} htmlFor="previousReading">
                  Lectura anterior <span className="text-red-500">*</span>
                </label>
                <input
                  id="previousReading"
                  type="number"
                  step="0.01"
                  className={inputClass}
                  {...register("previousReading", { valueAsNumber: true })}
                />
                {errors.previousReading ? (
                  <p className={errorClass}>{errors.previousReading.message}</p>
                ) : null}
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

          <div className="rounded-xl border border-[#d8ccff] bg-[#f7f3ff] px-4 py-3 lg:col-span-2">
            <p className="text-sm font-semibold text-[#4b2cb1]">
              Consumo calculado
            </p>
            <p className="mt-1 text-2xl font-extrabold text-[#201a57]">
              {consumption >= 0 ? consumption.toFixed(2) : "0.00"} m3
            </p>
          </div>

          <div className="lg:col-span-2">
            <label className={labelClass} htmlFor="observation">
              Observacion
            </label>
            <div className="relative">
              <textarea
                id="observation"
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-16 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
                placeholder="Lectura mensual registrada correctamente"
                {...register("observation")}
              />
              <span className="absolute bottom-3 right-4 text-xs font-semibold text-slate-500">
                {observation.length}/500
              </span>
            </div>
            {errors.observation ? (
              <p className={errorClass}>{errors.observation.message}</p>
            ) : null}
          </div>

          {serverError ? (
            <p className="lg:col-span-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {serverError}
            </p>
          ) : null}

          {successMessage ? (
            <p className="lg:col-span-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              {successMessage}
            </p>
          ) : null}
        </div>

        <aside className="hidden justify-center xl:flex">
          <div className="sticky top-32 rounded-2xl border border-[#d7e2f2] bg-slate-50 p-5 text-[#303659] shadow-sm">
            <div className="mb-4 rounded-2xl bg-[#efe9ff] p-4 text-[#5b35d5]">
              <Gauge size={36} />
            </div>
            <h2 className="text-lg font-extrabold text-[#201a57]">
              Lectura de medidor
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Registra la lectura mensual del medidor y verifica el consumo
              calculado antes de guardar.
            </p>
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex h-13 items-center justify-center gap-3 rounded-lg bg-[#5b35d5] px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Save size={21} />
          {isSaving ? "Guardando..." : "Guardar lectura"}
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="inline-flex h-13 items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-bold text-[#5b35d5] shadow-sm transition hover:bg-slate-50"
        >
          <Brush size={21} />
          Limpiar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-13 items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-bold text-[#303659] shadow-sm transition hover:bg-slate-50"
        >
          <X size={21} />
          Cancelar
        </button>
      </div>
    </form>
  );
}
