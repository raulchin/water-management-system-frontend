import { zodResolver } from "@hookform/resolvers/zod";
import { Brush, Save, Search, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { penaltySchema, type PenaltyFormData } from "../schemas/penaltySchema";

import type { SocioAsignacion } from "../../medidores/types/asignacionMedidor.types";

type Props = {
  onSubmit: (data: PenaltyFormData) => void;
  onCancel: () => void;
  onSearchPartner: (identification: string) => Promise<SocioAsignacion>;
  isSaving?: boolean;
  isSearchingPartner?: boolean;
  serverError?: string | null;
  successMessage?: string | null;
  onClearMessages?: () => void;
};

const inputClass =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]";

const labelClass = "mb-2 block text-sm font-bold text-[#303659]";
const errorClass = "mt-1 text-xs font-semibold text-red-600";

const defaultValues: PenaltyFormData = {
  penaltyTypeId: 0,
  partnerId: 0,
  partnerName: "",
  period: "",
  partnerIdentification: "",
  amount: undefined,
  observation: "",
};

export function PenaltyForm({
  onSubmit,
  onCancel,
  onSearchPartner,
  isSaving,
  isSearchingPartner,
  serverError,
  successMessage,
  onClearMessages,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PenaltyFormData>({
    resolver: zodResolver(penaltySchema),
    defaultValues,
  });

  const observation = watch("observation") ?? "";
  const partnerIdentification = watch("partnerIdentification");
  const [partnerSearchError, setPartnerSearchError] = useState<string | null>(
    null,
  );

  const handleSearchPartner = async () => {
    const value = partnerIdentification.trim();

    if (!value) {
      setPartnerSearchError("Ingrese la identificación del socio");
      return;
    }

    try {
      setPartnerSearchError(null);
      onClearMessages?.();

      const partner = await onSearchPartner(value);

      setValue("partnerId", partner.idPartner, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("partnerName", `${partner.names} ${partner.lastName}`, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("partnerIdentification", partner.taxIdentification, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch {
      setValue("partnerId", 0, { shouldValidate: true });
      setValue("partnerName", "", { shouldValidate: true });
      setPartnerSearchError(
        "No se encontró el socio con la identificación ingresada",
      );
    }
  };

  const handleClear = () => {
    reset(defaultValues);
    setPartnerSearchError(null);
    onClearMessages?.();
  };

  const partnerIdentificationRegister = register("partnerIdentification");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="penaltyTypeId">
            Tipo de multa <span className="text-red-500">*</span>
          </label>
          <select
            id="penaltyTypeId"
            className={inputClass}
            {...register("penaltyTypeId", { valueAsNumber: true })}
          >
            <option value={0}>Seleccione</option>
            <option value={1}>Multa por mora</option>
            <option value={2}>Multa por reunión</option>
            <option value={3}>Multa por reconexión</option>
          </select>
          {errors.penaltyTypeId ? (
            <p className={errorClass}>{errors.penaltyTypeId.message}</p>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="partnerIdentification">
            Identificación socio <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-[minmax(0,1fr)_44px] gap-2">
            <input
              id="partnerIdentification"
              className={inputClass}
              placeholder="0105744718"
              {...partnerIdentificationRegister}
              onChange={(event) => {
                partnerIdentificationRegister.onChange(event);
                setValue("partnerId", 0, { shouldValidate: true });
                setValue("partnerName", "", { shouldValidate: true });

                if (partnerSearchError) {
                  setPartnerSearchError(null);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSearchPartner();
                }
              }}
            />

            <button
              type="button"
              onClick={handleSearchPartner}
              disabled={isSearchingPartner}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
              aria-label="Buscar socio"
            >
              <Search size={18} />
            </button>
          </div>

          {errors.partnerIdentification ? (
            <p className={errorClass}>{errors.partnerIdentification.message}</p>
          ) : partnerSearchError ? (
            <p className={errorClass}>{partnerSearchError}</p>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="partnerId">
            ID socio
          </label>
          <input
            id="partnerId"
            readOnly
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 shadow-sm"
            {...register("partnerId", { valueAsNumber: true })}
          />
          {errors.partnerId ? (
            <p className={errorClass}>{errors.partnerId.message}</p>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="partnerName">
            Nombres socio
          </label>
          <input
            id="partnerName"
            readOnly
            className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 shadow-sm"
            {...register("partnerName")}
          />
          {errors.partnerName ? (
            <p className={errorClass}>{errors.partnerName.message}</p>
          ) : null}
        </div>

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
          <label className={labelClass} htmlFor="amount">
            Valor
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            className={inputClass}
            placeholder="Opcional"
            {...register("amount", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
          />
          {errors.amount ? (
            <p className={errorClass}>{errors.amount.message}</p>
          ) : null}
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Si lo deja vacio, el sistema usara el valor parametrizado del tipo
            de multa seleccionado.
          </p>
        </div>

        <div className="lg:col-span-2">
          <label className={labelClass} htmlFor="observation">
            Observación <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="observation"
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-16 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
              placeholder="Multa por reconexión"
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
      </div>

      {serverError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {serverError}
        </p>
      ) : null}

      {successMessage ? (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {successMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex h-13 items-center justify-center gap-3 rounded-lg bg-[#5b35d5] px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Save size={21} />
          {isSaving ? "Guardando..." : "Guardar multa"}
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
