import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Gauge,
  MapPin,
  Save,
  X,
  Brush,
  ChevronDown,
  FileText,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { meterSchema, type MeterFormData } from "../schemas/meterSchema";

type Props = {
  onSubmit: (data: MeterFormData) => void;
  onCancel: () => void;
  serverError?: string | null;
  successMessage?: string | null;
  onClearMessages?: () => void;
};

const defaultValues: MeterFormData = {
  numeroMedidor: "",
  marca: "",
  modelo: "",
  ubicacion: "",
  direccionReferencia: "",
  fechaInstalacion: "",
  estado: "ACTIVO",
  observacion: "",
};

const inputClass =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-4 pr-11 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]";

const labelClass = "mb-2 block text-sm font-bold text-[#303659]";
const errorClass = "mt-1 text-xs font-semibold text-red-600";

export function MeterForm({
  onSubmit,
  onCancel,
  serverError,
  successMessage,
  onClearMessages,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MeterFormData>({
    resolver: zodResolver(meterSchema),
    defaultValues,
  });

  const observacion = watch("observacion") ?? "";

  const handleClear = () => {
    reset(defaultValues);
    onClearMessages?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="grid content-start gap-x-6 gap-y-4 lg:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="numeroMedidor">
              Numero de medidor <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="numeroMedidor"
                className={inputClass}
                placeholder="Ej. MED-0001"
                {...register("numeroMedidor")}
              />
              <Gauge
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={20}
              />
            </div>
            {errors.numeroMedidor ? (
              <p className={errorClass}>{errors.numeroMedidor.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="marca">
              Marca
            </label>
            <input
              id="marca"
              className={inputClass}
              placeholder="Ej. Elster"
              {...register("marca")}
            />
            {errors.marca ? (
              <p className={errorClass}>{errors.marca.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="modelo">
              Modelo
            </label>
            <input
              id="modelo"
              className={inputClass}
              placeholder="Ej. V100"
              {...register("modelo")}
            />
            {errors.modelo ? (
              <p className={errorClass}>{errors.modelo.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="fechaInstalacion">
              Fecha instalacion
            </label>
            <div className="relative">
              <input
                id="fechaInstalacion"
                type="date"
                className={inputClass}
                {...register("fechaInstalacion")}
              />
              <Calendar
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={20}
              />
            </div>
            {errors.fechaInstalacion ? (
              <p className={errorClass}>{errors.fechaInstalacion.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="ubicacion">
              Ubicacion
            </label>
            <div className="relative">
              <input
                id="ubicacion"
                className={inputClass}
                placeholder="Entrada principal de la vivienda"
                {...register("ubicacion")}
              />
              <MapPin
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={20}
              />
            </div>
            {errors.ubicacion ? (
              <p className={errorClass}>{errors.ubicacion.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="direccionReferencia">
              Direccion referencia
            </label>
            <input
              id="direccionReferencia"
              className={inputClass}
              placeholder="Frente a la cancha comunal"
              {...register("direccionReferencia")}
            />
            {errors.direccionReferencia ? (
              <p className={errorClass}>{errors.direccionReferencia.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="estado">
              Estado <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="estado"
                className={`${inputClass} appearance-none`}
                {...register("estado")}
              >
                <option value="ACTIVO">Activo</option>
                <option value="INACTIVO">Inactivo</option>
                <option value="RETIRADO">Retirado</option>
                <option value="DANADO">Dañado</option>
                <option value="SUSPENDIDO">Suspendido</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={20}
              />
            </div>
            {errors.estado ? (
              <p className={errorClass}>{errors.estado.message}</p>
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <label className={labelClass} htmlFor="observacion">
              Observacion
            </label>
            <div className="relative">
              <textarea
                id="observacion"
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-16 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
                placeholder="Ingrese observaciones adicionales"
                {...register("observacion")}
              />
              <span className="absolute bottom-3 right-4 text-xs font-semibold text-slate-500">
                {observacion.length}/500
              </span>
            </div>
            {errors.observacion ? (
              <p className={errorClass}>{errors.observacion.message}</p>
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
          <div className="rounded-2xl border border-[#d7e2f2] bg-slate-50 p-5 text-[#303659] shadow-sm">
            <div className="mb-4 rounded-2xl bg-[#efe9ff] p-4 text-[#5b35d5]">
              <FileText size={34} />
            </div>
            <h2 className="text-lg font-extrabold text-[#201a57]">
              Nuevo medidor
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Registra la informacion tecnica del medidor para asociarlo
              posteriormente a un socio.
            </p>
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-6">
        <button
          type="submit"
          className="inline-flex h-13 items-center justify-center gap-3 rounded-lg bg-[#5b35d5] px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#4b2cb1]"
        >
          <Save size={21} />
          Guardar medidor
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
