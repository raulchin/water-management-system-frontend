import { zodResolver } from "@hookform/resolvers/zod";
import {
  Brush,
  FileText,
  Gauge,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Save,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { socioSchema, type SocioFormData } from "../schemas/socioSchema";

type Props = {
  onCancel: () => void;
  onSubmit: (data: SocioFormData) => void;
  defaultValues?: SocioFormData;
  submitLabel?: string;
};

const emptySocioValues: SocioFormData = {
  nombres: "",
  apellidos: "",
  cedula: "",
  telefono: "",
  correo: "",
  direccion: "",
  numeroContrato: "",
  numeroMedidor: "",
  estado: true,
};

const inputClass =
  "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 pr-11 text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]";
const labelClass = "mb-2 block text-sm font-bold text-[#303659]";
const errorClass = "mt-1 text-xs font-semibold text-red-600";

export function SocioForm({ onCancel, onSubmit, defaultValues, submitLabel }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SocioFormData>({
    resolver: zodResolver(socioSchema),
    defaultValues: defaultValues ?? emptySocioValues,
  });

  const estado = watch("estado");

  const handleClear = () => {
    reset(defaultValues ?? emptySocioValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="grid items-start gap-8 2xl:grid-cols-[minmax(0,1fr)_255px]">
        <div className="grid content-start gap-x-8 gap-y-4 xl:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="nombres">
              Nombres <span className="text-red-500">*</span>
            </label>
            <input
              id="nombres"
              className={inputClass}
              placeholder="Ingrese los nombres"
              {...register("nombres")}
            />
            {errors.nombres ? (
              <p className={errorClass}>{errors.nombres.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="apellidos">
              Apellidos <span className="text-red-500">*</span>
            </label>
            <input
              id="apellidos"
              className={inputClass}
              placeholder="Ingrese los apellidos"
              {...register("apellidos")}
            />
            {errors.apellidos ? (
              <p className={errorClass}>{errors.apellidos.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="cedula">
              Cedula <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="cedula"
                className={inputClass}
                placeholder="Ej. 0102030405"
                {...register("cedula")}
              />
              <IdCard
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={21}
              />
            </div>
            {errors.cedula ? (
              <p className={errorClass}>{errors.cedula.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="telefono">
              Telefono <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="telefono"
                className={inputClass}
                placeholder="Ej. 0991234567"
                {...register("telefono")}
              />
              <Phone
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={21}
              />
            </div>
            {errors.telefono ? (
              <p className={errorClass}>{errors.telefono.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="correo">
              Correo electronico
            </label>
            <div className="relative">
              <input
                id="correo"
                type="email"
                className={inputClass}
                placeholder="Ej. correo@ejemplo.com"
                {...register("correo")}
              />
              <Mail
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={21}
              />
            </div>
            {errors.correo ? (
              <p className={errorClass}>{errors.correo.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="direccion">
              Direccion <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="direccion"
                className={inputClass}
                placeholder="Ingrese la direccion completa"
                {...register("direccion")}
              />
              <MapPin
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={21}
              />
            </div>
            {errors.direccion ? (
              <p className={errorClass}>{errors.direccion.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="numeroContrato">
              Numero de contrato <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="numeroContrato"
                className={inputClass}
                placeholder="Ej. CT-00012345"
                {...register("numeroContrato")}
              />
              <FileText
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={21}
              />
            </div>
            {errors.numeroContrato ? (
              <p className={errorClass}>{errors.numeroContrato.message}</p>
            ) : null}
          </div>

          <div>
            <label className={labelClass} htmlFor="numeroMedidor">
              Numero de medidor <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="numeroMedidor"
                className={inputClass}
                placeholder="Ej. MED-00012345"
                {...register("numeroMedidor")}
              />
              <Gauge
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={21}
              />
            </div>
            {errors.numeroMedidor ? (
              <p className={errorClass}>{errors.numeroMedidor.message}</p>
            ) : null}
          </div>

          <div>
            <span className={labelClass}>
              Estado <span className="text-red-500">*</span>
            </span>
            <div className="flex h-12 items-center gap-4">
              <input
                type="checkbox"
                className="sr-only"
                {...register("estado")}
              />
              <button
                type="button"
                onClick={() =>
                  setValue("estado", !estado, { shouldDirty: true })
                }
                className={`flex h-8 w-16 items-center rounded-full p-1 transition ${estado ? "bg-[#5b35d5]" : "bg-slate-300"}`}
                aria-pressed={estado}
              >
                <span
                  className={`h-6 w-6 rounded-full bg-white shadow transition ${estado ? "translate-x-8" : "translate-x-0"}`}
                />
              </button>
              <span className="text-base font-semibold text-[#303659]">
                {estado ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

        </div>

        <aside className="flex justify-center 2xl:justify-end">
          <div className="overflow-hidden rounded-2xl border border-[#d7e2f2] bg-slate-50 p-3 shadow-sm">
            <img
              src="/auth/register1.png"
              alt="Registro de socios SIGAP"
              className="h-[500px] w-[230px] rounded-xl object-cover object-top"
            />
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-6">
        <button
          type="submit"
          className="inline-flex h-13 items-center justify-center gap-3 rounded-lg bg-[#5b35d5] px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#4b2cb1]"
        >
          <Save size={21} />
          {submitLabel ?? 'Guardar socio'}
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
