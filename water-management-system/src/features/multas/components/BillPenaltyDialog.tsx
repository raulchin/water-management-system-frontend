import { AlertTriangle } from "lucide-react";
import type { PenaltySummary } from "../types/penalty.types";

type Props = {
  penalty: PenaltySummary | null;
  isPending: boolean;
  errorMessage: string | null;
  onConfirm: () => void;
  onClose: () => void;
};

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

export function BillPenaltyDialog({
  penalty,
  isPending,
  errorMessage,
  onConfirm,
  onClose,
}: Props) {
  if (!penalty) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bill-penalty-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#efe9ff] text-[#5b35d5]">
            <AlertTriangle size={24} />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
              SIGAP
            </p>

            <h2
              id="bill-penalty-title"
              className="text-xl font-extrabold text-[#201a57]"
            >
              Confirmar facturación
            </h2>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          ¿Está seguro de que desea facturar esta multa? Después de confirmar,
          la multa será enviada al proceso de facturación.
        </p>

        <div className="mt-5 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-slate-500">
              Identificación
            </span>
            <span className="text-right text-sm font-bold text-slate-900">
              {penalty.partnerIdentification}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-slate-500">
              Multa
            </span>
            <span className="text-right text-sm font-bold text-slate-900">
              {penalty.penaltyName}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-slate-500">
              Periodo
            </span>
            <span className="text-right text-sm font-bold text-slate-900">
              {penalty.period}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-3">
            <span className="text-sm font-semibold text-slate-500">
              Valor
            </span>
            <span className="text-lg font-extrabold text-[#201a57]">
              {currencyFormatter.format(penalty.amount)}
            </span>
          </div>
        </div>

        {errorMessage ? (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="rounded-lg bg-[#5b35d5] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Facturando..." : "Sí, facturar"}
          </button>
        </div>
      </div>
    </div>
  );
}