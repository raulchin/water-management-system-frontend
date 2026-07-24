import type {
  SelectablePendingItem,
  PendingCollectionBill,
} from "../types/collection.types";

type Props = {
  bills: PendingCollectionBill[];
  selectedItemKeys: string[];
  onToggleItem: (item: SelectablePendingItem) => void;
};

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

function getItemKey(item: SelectablePendingItem) {
  return `${item.billId}-${item.itemId}-${item.itemType}`;
}



export function PendingInvoicesTable({
  bills,
  selectedItemKeys,
  onToggleItem,
}: Props) {
  return (
    <div className="space-y-4">
      {bills.map((bill) => (
        <div
          key={bill.billId}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold text-[#201a57]">
                Factura #{bill.billId} - {bill.period}
              </h3>
              <p className="text-xs text-slate-500">
                Medidor: {bill.meterNumber || "Sin medidor"}
              </p>
            </div>

            <span className="rounded-full bg-[#5b35d5] px-3 py-1 text-xs font-semibold text-white">
              {bill.billStatus}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-[#303659]">
                <tr>
                  <th className="px-4 py-3">Concepto</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Valor</th>
                  <th className="px-4 py-3">Pagado</th>
                  <th className="px-4 py-3">Pendiente</th>
                  <th className="px-4 py-3 text-center">Seleccionar</th>
                </tr>
              </thead>

              <tbody>
                {bill.items.map((item) => {
                  const selectableItem = {
                    ...item,
                    billId: bill.billId,
                    billStatus: bill.billStatus,
                    partnerIdentification: bill.partnerIdentification,
                    partnerName: bill.partnerName,
                    meterNumber: bill.meterNumber,
                    period: bill.period,
                  };

                  const itemKey = `${bill.billId}-${item.itemId}-${item.itemType}`;
                  const isSelected = selectedItemKeys.includes(itemKey);

                  return (
                    <tr
                      key={itemKey}
                      className={`border-t border-slate-100 transition ${
                        isSelected ? "bg-[#efe9ff]" : "hover:bg-slate-50"
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {item.description}
                      </td>

                      <td className="px-4 py-3">{item.itemType}</td>

                      <td className="px-4 py-3">
                        {currencyFormatter.format(item.amount)}
                      </td>

                      <td className="px-4 py-3">
                        {currencyFormatter.format(item.paidAmount)}
                      </td>

                      <td className="px-4 py-3 font-bold text-[#201a57]">
                        {currencyFormatter.format(item.pendingAmount)}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onToggleItem(selectableItem)}
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
      ))}
    </div>
  );
}