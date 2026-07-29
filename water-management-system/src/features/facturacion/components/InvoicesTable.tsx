import type { InvoiceSummary } from "../types/invoice.types";

type Props = {
  invoices: InvoiceSummary[];
};

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

function getStatusClass(status: string) {
  if (status === "PENDIENTE") {
    return "bg-yellow-500";
  }

  if (status === "PAGADA") {
    return "bg-green-500";
  }

  if (status === "VENCIDA") {
    return "bg-red-500";
  }

  if (status === "ANULADA") {
    return "bg-slate-500";
  }

  return "bg-[#5b35d5]";
}

export function InvoicesTable({ invoices }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[#303659]">
            <tr>
              <th className="px-4 py-3">Identificación</th>
              <th className="px-4 py-3">Medidor</th>
              <th className="px-4 py-3">Periodo</th>
              <th className="px-4 py-3">Tarifa base</th>
              <th className="px-4 py-3">Consumo</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Vencimiento</th>
              <th className="px-4 py-3 text-center">Estado</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.billId}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {invoice.partnerIdentification}
                </td>

                <td className="px-4 py-3 font-semibold text-slate-900">
                  {invoice.meterNumber}
                </td>

                <td className="px-4 py-3">{invoice.period}</td>

                <td className="px-4 py-3">
                  {currencyFormatter.format(invoice.baseFee)}
                </td>

                <td className="px-4 py-3 font-semibold text-[#201a57]">
                  {Number(invoice.calculatedConsumption ?? 0).toFixed(2)} m³
                </td>

                <td className="px-4 py-3 font-bold text-[#201a57]">
                  {currencyFormatter.format(invoice.totalAmount)}
                </td>

                <td className="px-4 py-3">{invoice.dueDate}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusClass(
                      invoice.status,
                    )}`}
                  >
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
