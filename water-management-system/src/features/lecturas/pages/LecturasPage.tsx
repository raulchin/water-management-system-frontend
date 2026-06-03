import { Link } from 'react-router-dom'
import { LecturasTable } from '../components/LecturasTable'
import { useLecturas } from '../hooks/useLecturas'

export function LecturasPage() {
  const { data = [], isLoading } = useLecturas()

  return (
    <section className="mx-auto max-w-5xl space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4b2cb1]">SIGAP</p>
          <h1 className="text-2xl font-bold text-slate-900">Modulo de Lecturas</h1>
        </div>
        <Link className="rounded-lg bg-[#4b2cb1] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3b238e]" to="/lecturas/nueva">
          Nueva lectura
        </Link>
      </header>
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        {isLoading ? <p>Cargando lecturas...</p> : <LecturasTable lecturas={data} />}
      </div>
    </section>
  )
}
