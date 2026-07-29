import { MeterReadingsTable } from "../components/MeterReadingsTable";
import { useMeterReadings } from "../hooks/useMeterReadings";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  ClipboardList,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "../../../shared/constants/pagination";
import { EditMeterReadingModal } from "../components/EditMeterReadingModal";
import type { MeterReading } from "../types/meterReading.types";

export function MeterReadingsPage() {
  const [page, setPage] = useState(0);

  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);

  const [selectedReading, setSelectedReading] = useState<MeterReading | null>(
    null,
  );

  const { data, isLoading, isError, isFetching } = useMeterReadings({
    page,
    size: size,
  });

  const readings = data?.content ?? [];

  const navigate = useNavigate();

  const getVisiblePages = (currentPage: number, totalPages: number) => {
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index);
    }

    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(currentPage - half, 0);
    let end = start + maxVisiblePages;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages, 0);
    }

    return Array.from({ length: end - start }, (_, index) => start + index);
  };

  const visiblePages = data ? getVisiblePages(data.page, data.totalPages) : [];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
              <ClipboardList size={31} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
                SIGAP
              </p>
              <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
                Lecturas de medidores
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/lecturas/nueva")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5b35d5] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#4b2cb1]"
          >
            <Plus size={18} />
            Nueva lectura
          </button>
        </div>

        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
        {isLoading ? <p>Cargando lecturas...</p> : null}
        {isError ? (
          <p className="text-sm text-red-700">
            No se pudieron cargar las lecturas.
          </p>
        ) : null}
        {!isLoading && !isError ? (
          <MeterReadingsTable readings={readings} onEdit={setSelectedReading} />
        ) : null}
      </div>

      {!isLoading && !isError && data ? (
        <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-600">
            Mostrando página {data.page + 1} de {data.totalPages} -{" "}
            {data.totalElements} lecturas
            {isFetching ? " (actualizando...)" : ""}
          </p>

          <div className="flex items-center overflow-hidden rounded-lg border border-slate-300 bg-white">
            <button
              type="button"
              onClick={() => setPage(0)}
              disabled={data.page === 0 || isFetching}
              className="h-10 min-w-10 border-r border-slate-300 px-3 text-sm font-bold text-[#0077b6] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronsLeft size={16} />
            </button>

            <button
              type="button"
              onClick={() =>
                setPage((currentPage) => Math.max(currentPage - 1, 0))
              }
              disabled={data.page === 0 || isFetching}
              className="h-10 min-w-10 border-r border-slate-300 px-3 text-sm font-bold text-[#0077b6] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            {visiblePages.map((pageNumber) => {
              const isActive = pageNumber === data.page;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  disabled={isFetching}
                  className={`h-10 min-w-10 border-r border-slate-300 px-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-[#0084c7] text-white"
                      : "bg-white text-[#0077b6] hover:bg-slate-50"
                  }`}
                >
                  {pageNumber + 1}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={data.last || isFetching}
              className="h-10 min-w-10 border-r border-slate-300 px-3 text-sm font-bold text-[#0077b6] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => setPage(data.totalPages - 1)}
              disabled={data.last || isFetching}
              className="h-10 min-w-10 px-3 text-sm font-bold text-[#0077b6] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      ) : null}

      <EditMeterReadingModal
        reading={selectedReading}
        isOpen={selectedReading !== null}
        onClose={() => setSelectedReading(null)}
      />
    </section>
  );
}
