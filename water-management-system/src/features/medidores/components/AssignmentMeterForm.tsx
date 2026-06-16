
import { zodResolver } from '@hookform/resolvers/zod'
import { Brush, Calendar, Gauge, IdCard, Link2, MapPin, Save, Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form';

import { meterAssignmentSchema, type MeterAssignmentFormData } from '../schemas/meterAssignmentSchema';

import type { MedidorAsignacion, SocioAsignacion } from '../types/asignacionMedidor.types';

type Props = {
  socio: SocioAsignacion | null
  medidor: MedidorAsignacion | null
  serverError?: string | null
  successMessage?: string | null
  isSearchingSocio?: boolean
  isSearchingMedidor?: boolean
  isSaving?: boolean
  onBuscarSocio: (identificacion: string) => void
  onBuscarMedidor: (numeroMedidor: string) => void
  onSubmit: (data: MeterAssignmentFormData) => void
  onCancel: () => void
  onClearMessages?: () => void
  onClearSelection?: () => void
}

const defaultValues: MeterAssignmentFormData = {
  identificacionSocio: '',
  numeroMedidor: '',
  fechaAsignacion: '',
  estado: 'ACTIVO',
  observacion: '',
}

const inputClass =
  'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 pr-11 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]'

const readOnlyClass =
  'h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 shadow-sm'

const labelClass = 'mb-2 block text-sm font-bold text-[#303659]'
const errorClass = 'mt-1 text-xs font-semibold text-red-600';

export function AssignmentMeterForm({
  socio,
  medidor,
  serverError,
  successMessage,
  isSearchingSocio,
  isSearchingMedidor,
  isSaving,
  onBuscarSocio,
  onBuscarMedidor,
  onSubmit,
  onCancel,
  onClearMessages,
  onClearSelection,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MeterAssignmentFormData>({
    resolver: zodResolver(meterAssignmentSchema),
    defaultValues,
  })

  const identificacionSocio = watch('identificacionSocio')
  const numeroMedidor = watch('numeroMedidor')
  const observacion = watch('observacion') ?? ''

  const handleClear = () => {
    reset(defaultValues)
    onClearMessages?.()
    onClearSelection?.()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-7">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-[#efe9ff] p-3 text-[#5b35d5]">
                <IdCard size={24} />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#201a57]">Busqueda del socio</h2>
                <p className="text-sm text-slate-500">Ingrese identificacion o RUC del socio.</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <label className={labelClass} htmlFor="identificacionSocio">
                  Identificacion o RUC <span className="text-red-500">*</span>
                </label>
                <input
                  id="identificacionSocio"
                  className={inputClass}
                  placeholder="Ej. 0105744718"
                  {...register('identificacionSocio')}
                />
                {errors.identificacionSocio ? <p className={errorClass}>{errors.identificacionSocio.message}</p> : null}
              </div>

              <button
                type="button"
                onClick={() => onBuscarSocio(identificacionSocio)}
                disabled={isSearchingSocio}
                className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#5b35d5] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Search size={18} />
                {isSearchingSocio ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div>
                <label className={labelClass}>Nombres</label>
                <input className={readOnlyClass} value={socio ? `${socio.names} ${socio.lastName}` : ''} readOnly />
              </div>
              <div>
                <label className={labelClass}>Identificacion/RUC</label>
                <input className={readOnlyClass} value={socio?.taxIdentification ?? ''} readOnly />
              </div>
              <div>
                <label className={labelClass}>Telefono</label>
                <input className={readOnlyClass} value={socio?.phone ?? ''} readOnly />
              </div>
              <div>
                <label className={labelClass}>Correo</label>
                <input className={readOnlyClass} value={socio?.email ?? ''} readOnly />
              </div>
              <div className="lg:col-span-2">
                <label className={labelClass}>Direccion</label>
                <input className={readOnlyClass} value={socio?.address ?? ''} readOnly />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-[#efe9ff] p-3 text-[#5b35d5]">
                <Gauge size={24} />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#201a57]">Busqueda del medidor</h2>
                <p className="text-sm text-slate-500">Ingrese el numero de medidor disponible.</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <label className={labelClass} htmlFor="numeroMedidor">
                  Numero de medidor <span className="text-red-500">*</span>
                </label>
                <input
                  id="numeroMedidor"
                  className={inputClass}
                  placeholder="Ej. MED-0001"
                  {...register('numeroMedidor')}
                />
                {errors.numeroMedidor ? <p className={errorClass}>{errors.numeroMedidor.message}</p> : null}
              </div>

              <button
                type="button"
                onClick={() => onBuscarMedidor(numeroMedidor)}
                disabled={isSearchingMedidor}
                className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#5b35d5] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Search size={18} />
                {isSearchingMedidor ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div>
                <label className={labelClass}>Numero</label>
                <input className={readOnlyClass} value={medidor?.numeroMedidor ?? ''} readOnly />
              </div>
              <div>
                <label className={labelClass}>Estado</label>
                <input className={readOnlyClass} value={medidor?.estado ?? ''} readOnly />
              </div>
              <div>
                <label className={labelClass}>Marca</label>
                <input className={readOnlyClass} value={medidor?.marca ?? ''} readOnly />
              </div>
              <div>
                <label className={labelClass}>Modelo</label>
                <input className={readOnlyClass} value={medidor?.modelo ?? ''} readOnly />
              </div>
              <div>
                <label className={labelClass}>Fecha instalacion</label>
                <input className={readOnlyClass} value={medidor?.fechaInstalacion ?? ''} readOnly />
              </div>
              <div>
                <label className={labelClass}>Ubicacion</label>
                <input className={readOnlyClass} value={medidor?.ubicacion ?? ''} readOnly />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-[#efe9ff] p-3 text-[#5b35d5]">
                <Link2 size={24} />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#201a57]">Datos de asignacion</h2>
                <p className="text-sm text-slate-500">Complete los datos para vincular el medidor al socio.</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="fechaAsignacion">
                  Fecha asignacion <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input id="fechaAsignacion" type="date" className={inputClass} {...register('fechaAsignacion')} />
                  <Calendar className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                </div>
                {errors.fechaAsignacion ? <p className={errorClass}>{errors.fechaAsignacion.message}</p> : null}
              </div>

              <div>
                <label className={labelClass} htmlFor="estado">
                  Estado <span className="text-red-500">*</span>
                </label>
                <select id="estado" className={inputClass} {...register('estado')}>
                  <option value="ACTIVO">Activo</option>
                  <option value="INACTIVO">Inactivo</option>
                </select>
                {errors.estado ? <p className={errorClass}>{errors.estado.message}</p> : null}
              </div>

              <div className="lg:col-span-2">
                <label className={labelClass} htmlFor="observacion">Observacion</label>
                <div className="relative">
                  <textarea
                    id="observacion"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-16 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
                    placeholder="Ingrese observaciones adicionales"
                    {...register('observacion')}
                  />
                  <span className="absolute bottom-3 right-4 text-xs font-semibold text-slate-500">{observacion.length}/500</span>
                </div>
                {errors.observacion ? <p className={errorClass}>{errors.observacion.message}</p> : null}
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
          </section>
        </div>

        <aside className="hidden justify-center xl:flex">
          <div className="sticky top-32 rounded-2xl border border-[#d7e2f2] bg-slate-50 p-5 text-[#303659] shadow-sm">
            <div className="mb-4 rounded-2xl bg-[#efe9ff] p-4 text-[#5b35d5]">
              <Link2 size={36} />
            </div>
            <h2 className="text-lg font-extrabold text-[#201a57]">Relacion socio-medidor</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Busque el socio por identificacion o RUC y seleccione el medidor por su numero para completar la asignacion.
            </p>
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={isSaving || !socio || !medidor}
          className="inline-flex h-13 items-center justify-center gap-3 rounded-lg bg-[#5b35d5] px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Save size={21} />
          {isSaving ? 'Guardando...' : 'Guardar asignacion'}
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
  )
}