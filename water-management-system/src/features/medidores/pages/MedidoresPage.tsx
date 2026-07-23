import { MedidoresTable } from "../components/MedidoresTable";
import { useNavigate } from "react-router-dom";
import { useMedidores } from "../hooks/useMedidores";
import {  Plus, Gauge } from "lucide-react";


export function MedidoresPage() {
  const { data = [], isLoading, isError } = useMedidores();
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
              <Gauge size={31} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
                SIGAP
              </p>
              <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
                Lista de medidores
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/medidores/nuevo")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5b35d5] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#4b2cb1]"
          >
            <Plus size={18} />
            Nuevo medidor
          </button>
        </div>

        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
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
