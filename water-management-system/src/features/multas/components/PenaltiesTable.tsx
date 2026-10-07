import type { PenaltySummary } from "../types/penalty.types";

type Props = {
  penalties: PenaltySummary[];
  onInvoicePenalty: (penalty: PenaltySummary) => void;
};

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

function getStatusClass(status: string) {
  if (status === "PENDIENTE") {
    return "bg-yellow-500";
  }

  if (status === "FACTURADA") {
    return "bg-green-500";
  }

  if (status === "ANULADA") {
    return "bg-red-500";
  }

  return "bg-[#5b35d5]";
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
}

export function PenaltiesTable({ penalties, onInvoicePenalty }: Props) {
  if (penalties.length === 0) {
    return (
      <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
        No existen multas registradas.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[#303659]">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Identificación</th>
              <th className="px-4 py-3">Periodo</th>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Multa</th>
              <th className="px-4 py-3">Valor</th>
              <th className="px-4 py-3 text-center">Estado</th>
              <th className="px-4 py-3">Aplicación</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {penalties.map((penalty) => {
              const canInvoice = penalty.status === "PENDIENTE";

              return (
                <tr
                  key={penalty.penaltyId}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {penalty.penaltyId}
                  </td>

                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {penalty.partnerIdentification}
                  </td>

                  <td className="px-4 py-3">{penalty.period}</td>

                  <td className="px-4 py-3">{penalty.penaltyCode}</td>

                  <td className="px-4 py-3">{penalty.penaltyName}</td>

                  <td className="px-4 py-3 font-bold text-[#201a57]">
                    {currencyFormatter.format(penalty.amount)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusClass(
                        penalty.status,
                      )}`}
                    >
                      {penalty.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {formatDate(penalty.applicationDate)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => onInvoicePenalty(penalty)}
                      disabled={!canInvoice}
                      className="rounded-lg border border-[#5b35d5] bg-white px-3 py-1 text-xs font-bold text-[#5b35d5] transition hover:bg-[#efe9ff] disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400 disabled:hover:bg-white"
                    >
                      Facturar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}