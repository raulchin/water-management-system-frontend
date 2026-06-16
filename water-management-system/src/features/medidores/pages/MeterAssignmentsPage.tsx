import { Link2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MeterAssignmentsTable } from '../components/MeterAssignmentsTable'
import { useMeterAssignments } from '../hooks/useMeterAssignments'

export function MeterAssignmentsPage() {
  const { data = [], isLoading, isError } = useMeterAssignments()

  const activeAssignments = data.filter((item) => item.estado === 'ACTIVO').length
  const inactiveAssignments = data.filter((item) => item.estado === 'INACTIVO').length

  return (
    <section className="mx-auto max-w-7xl space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4b2cb1]">SIGAP</p>
          <h1 className="text-2xl font-bold text-slate-900">Asignaciones de medidores</h1>
        </div>

        <Link
          to="/asignaciones/asignacion"
          className="rounded-lg bg-[#4b2cb1] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3b238e]"
        >
          Nueva asignacion
        </Link>
      </header>

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