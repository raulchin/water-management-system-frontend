import { MedidoresTable } from "../components/MedidoresTable";
import { useMedidores } from "../hooks/useMedidores";

import { Link } from "react-router-dom";

export function MedidoresPage() {
  const { data = [], isLoading, isError } = useMedidores();

  return (
    <section className="mx-auto max-w-6xl space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4b2cb1]">
            SIGAP
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Listado de medidores
          </h1>
        </div>
        <Link
          to="/medidores/nuevo"
          className="rounded-lg bg-[#4b2cb1] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3b238e]"
        >
          Nuevo medidor
        </Link>
      </header>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        {isLoading ? <p>Cargando medidores...</p> : null}
        {isError ? (
          <p className="text-sm text-red-700">
            No se pudieron cargar los medidores.
          </p>
        ) : null}
        {!isLoading && !isError ? <MedidoresTable medidores={data} /> : null}
      </div>
    </section>
  );
}
