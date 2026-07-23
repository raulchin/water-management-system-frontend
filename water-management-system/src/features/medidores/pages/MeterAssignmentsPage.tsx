import { Link2 } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { MeterAssignmentsTable } from '../components/MeterAssignmentsTable'
import { useMeterAssignments } from '../hooks/useMeterAssignments'
import {  Plus, Settings } from "lucide-react";

export function MeterAssignmentsPage() {
  const { data = [], isLoading, isError } = useMeterAssignments()

  const activeAssignments = data.filter((item) => item.estado === 'ACTIVO').length
  const inactiveAssignments = data.filter((item) => item.estado === 'INACTIVO').length
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="px-6 pt-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
              <Settings size={31} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
                SIGAP
              </p>
              <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
                Asignación de medidor a socio
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/facturacion/nueva")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5b35d5] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#4b2cb1]"
          >
            <Plus size={18} />
            Nueva asignación
          </button>
        </div>

        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>
      

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total asignaciones</p>
          <p className="mt-2 text-3xl font-extrabold text-[#201a57]">{data.length}</p>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
          <p className="text-sm font-semibold text-emerald-700">Activos</p>
          <p className="mt-2 text-3xl font-extrabold text-emerald-700">{activeAssignments}</p>
        </article>

        <article className="rounded-2xl border border-rose-100 bg-rose-50 p-5 shadow-sm">
          <p className="text-sm font-semibold text-rose-700">Inactivos</p>
          <p className="mt-2 text-3xl font-extrabold text-rose-700">{inactiveAssignments}</p>
        </article>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-4">
          <div className="rounded-xl bg-[#efe9ff] p-3 text-[#5b35d5]">
            <Link2 size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Listado de asignaciones</h2>
            <p className="text-sm text-slate-500">Socios vinculados con sus medidores registrados.</p>
          </div>
        </div>

        {isLoading ? <p>Cargando asignaciones...</p> : null}
        {isError ? <p className="text-sm text-red-700">No se pudieron cargar las asignaciones.</p> : null}
        {!isLoading && !isError ? <MeterAssignmentsTable assignments={data} /> : null}
      </div>
    </section>
  )
}