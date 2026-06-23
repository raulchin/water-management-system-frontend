

import { Link } from 'react-router-dom'
import { MeterReadingsTable } from '../components/MeterReadingsTable'
import { useMeterReadings } from '../hooks/useMeterReadings'

export function MeterReadingsPage() {
  const { data = [], isLoading, isError } = useMeterReadings()

  return (
    <section className="mx-auto max-w-7xl space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4b2cb1]">SIGAP</p>
          <h1 className="text-2xl font-bold text-slate-900">Lecturas de medidores</h1>
        </div>

        <Link
          className="rounded-lg bg-[#4b2cb1] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3b238e]"
          to="/lecturas/nueva"
        >
          Nueva lectura
        </Link>
      </header>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        {isLoading ? <p>Cargando lecturas...</p> : null}
        {isError ? <p className="text-sm text-red-700">No se pudieron cargar las lecturas.</p> : null}
        {!isLoading && !isError ? <MeterReadingsTable readings={data} /> : null}
      </div>
    </section>
  )
}