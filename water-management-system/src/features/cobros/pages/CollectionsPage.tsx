import { CircleDollarSign, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CollectionsTable } from "../components/CollectionsTable";

import { useItemsCollections } from "../hooks/useItemsCollections";

export function CollectionsPage() {
  const navigate = useNavigate();
  const { data: collections = [], isLoading, isError } = useItemsCollections();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
              <CircleDollarSign size={31} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
                SIGAP
              </p>
              <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
                Cobros realizados
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/cobros/nuevo")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5b35d5] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#4b2cb1]"
          >
            <Plus size={18} />
            Nuevo cobro
          </button>
        </div>

        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
        {isLoading ? (
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
            Cargando cobros...
          </p>
        ) : null}

        {isError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            No se pudo cargar el listado de cobros.
          </p>
        ) : null}

        {!isLoading && !isError && collections.length === 0 ? (
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
            No existen cobros registrados.
          </p>
        ) : null}

        {!isLoading && !isError && collections.length > 0 ? (
          <CollectionsTable collections={collections} />
        ) : null}
      </div>
    </section>
  );
}
