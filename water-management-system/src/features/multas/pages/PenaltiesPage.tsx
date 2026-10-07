import { BadgeAlert, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenaltiesTable } from "../components/PenaltiesTable";
import { usePenalties } from "../hooks/usePenalties";
import type { PenaltySummary } from "../types/penalty.types";

import type { AxiosError } from "axios";
import { BillPenaltyDialog } from "../components/BillPenaltyDialog";
import { useBillPenalty } from "../hooks/useBillPenalty";

const DEFAULT_PAGE_SIZE = 10;

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

type ApiErrorResponse = {
  message?: string;
  errors?: Array<{
    defaultMessage?: string;
  }>;
};

function getBillingErrorMessage(error: unknown) {
  const apiError = error as AxiosError<ApiErrorResponse>;

  return (
    apiError.response?.data.errors?.[0]?.defaultMessage ??
    apiError.response?.data.message ??
    "No se pudo facturar la multa."
  );
}

export function PenaltiesPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const [penaltyToBill, setPenaltyToBill] = useState<PenaltySummary | null>(
    null,
  );

  const [billingError, setBillingError] = useState<string | null>(null);
  const [billingSuccess, setBillingSuccess] = useState<string | null>(null);

  const billPenaltyMutation = useBillPenalty();

  const pageSize = DEFAULT_PAGE_SIZE;

  const { data, isLoading, isError, isFetching } = usePenalties({
    page,
    size: pageSize,
  });

  const penalties = data?.content ?? [];
  const visiblePages = data ? getVisiblePages(data.page, data.totalPages) : [];

  const handleInvoicePenalty = (penalty: PenaltySummary) => {
    console.log("Multa seleccionada para facturar:", penalty);
    // Pendiente: confirmar flujo de facturación de multas.

    setBillingError(null);
    setBillingSuccess(null);
    setPenaltyToBill(penalty);
  };

  const handleCloseBillingDialog = () => {
    if (billPenaltyMutation.isPending) {
      return;
    }

    setBillingError(null);
    setPenaltyToBill(null);
  };

  const handleConfirmBilling = async () => {
    if (!penaltyToBill) {
      return;
    }

    try {
      setBillingError(null);

      await billPenaltyMutation.mutateAsync(penaltyToBill.penaltyId);

      setPenaltyToBill(null);
      setBillingSuccess(
        `La multa #${penaltyToBill.penaltyId} fue facturada correctamente.`,
      );
    } catch (error: unknown) {
      setBillingError(getBillingErrorMessage(error));
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
              <BadgeAlert size={31} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
                SIGAP
              </p>
              <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
                Multas
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/multas/nueva")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#5b35d5] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#4b2cb1]"
          >
            <Plus size={18} />
            Nueva multa
          </button>
        </div>

        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
        {isLoading ? (
          <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
            Cargando multas...
          </p>
        ) : null}

        {isError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            No se pudo cargar el listado de multas.
          </p>
        ) : null}

       

        {!isLoading && !isError ? (
          <>
            <PenaltiesTable
              penalties={penalties}
              onInvoicePenalty={handleInvoicePenalty}
            />

            {data ? (
              <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  Mostrando página {data.page + 1} de {data.totalPages} -{" "}
                  {data.totalElements} multas
                  {isFetching ? " (actualizando...)" : ""}
                </p>

                <div className="flex items-center overflow-hidden rounded-lg border border-slate-300 bg-white">
                  <button
                    type="button"
                    onClick={() => setPage(0)}
                    disabled={data.page === 0 || isFetching}
                    className="h-10 min-w-10 border-r border-slate-300 px-3 text-sm font-bold text-[#5b35d5] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {"<<"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPage((currentPage) => Math.max(currentPage - 1, 0))
                    }
                    disabled={data.page === 0 || isFetching}
                    className="h-10 min-w-10 border-r border-slate-300 px-3 text-sm font-bold text-[#5b35d5] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {"<"}
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
                            ? "bg-[#5b35d5] text-white"
                            : "bg-white text-[#5b35d5] hover:bg-slate-50"
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
                    className="h-10 min-w-10 border-r border-slate-300 px-3 text-sm font-bold text-[#5b35d5] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {">"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPage(data.totalPages - 1)}
                    disabled={data.last || isFetching}
                    className="h-10 min-w-10 px-3 text-sm font-bold text-[#5b35d5] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {">>"}
                  </button>
                </div>
              </div>
            ) : null}
          </>
        ) : null}

         {billingSuccess ? (
          <div
            role="status"
            className="mb-4 flex items-center justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"
          >
            <span>{billingSuccess}</span>

            <button
              type="button"
              onClick={() => setBillingSuccess(null)}
              className="font-bold text-green-800 hover:underline"
            >
              Cerrar
            </button>
          </div>
        ) : null}
        
      </div>
      <BillPenaltyDialog
        penalty={penaltyToBill}
        isPending={billPenaltyMutation.isPending}
        errorMessage={billingError}
        onConfirm={handleConfirmBilling}
        onClose={handleCloseBillingDialog}
      />
    </section>
  );
}