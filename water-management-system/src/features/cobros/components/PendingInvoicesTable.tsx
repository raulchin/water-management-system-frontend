
import type { PendingInvoice } from "../types/collection.types";

type Props = {
  invoices: PendingInvoice[];
  selectedBillIds: number[];
  onToggleInvoice: (invoice: PendingInvoice) => void;
};

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

function getStatusClass(status: string) {
  if (status === "PENDIENTE") {
    return "bg-yellow-500";
  }

  if (status === "PAGO_PARCIAL") {
    return "bg-blue-500";
  }

  return "bg-[#5b35d5]";
}

export function PendingInvoicesTable({
  invoices,
  selectedBillIds,
  onToggleInvoice,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-bold text-[#201a57]">
          Facturas pendientes
        </h3>
        <p className="text-xs text-slate-500">
          Seleccione las facturas que desea cobrar.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[#303659]">
            <tr>
              <th className="px-4 py-3">Concepto</th>
              <th className="px-4 py-3">Medidor</th>
              <th className="px-4 py-3">Periodo</th>
              <th className="px-4 py-3">Consumo</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Saldo pendiente</th>
              <th className="px-4 py-3 text-center">Estado</th>
              <th className="px-4 py-3 text-center">Seleccionar</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => {
              const isSelected = selectedBillIds.includes(invoice.billId);

              return (
                <tr
                  key={invoice.billId}
                  className={`border-t border-slate-100 transition ${
                    isSelected ? "bg-[#efe9ff]" : "hover:bg-slate-50"
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {invoice.observation || "Factura de agua"}
                  </td>

                  <td className="px-4 py-3">
                    {invoice.meterNumber || "Sin medidor"}
                  </td>

                  <td className="px-4 py-3">{invoice.period}</td>

                  <td className="px-4 py-3">
                    {currencyFormatter.format(invoice.consumptionAmount)}
                  </td>

                  <td className="px-4 py-3">
                    {currencyFormatter.format(invoice.totalAmount)}
                  </td>

                  <td className="px-4 py-3 font-bold text-[#201a57]">
                    {currencyFormatter.format(invoice.pendingBalance)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusClass(
                        invoice.status,
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleInvoice(invoice)}
                      className="h-4 w-4 rounded border-slate-300 text-[#5b35d5] focus:ring-[#5b35d5]"
                    />
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