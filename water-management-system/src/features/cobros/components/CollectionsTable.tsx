import { CollectionSummary } from "../types/collection.types";

type Props = {
  collections: CollectionSummary[];
};

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

function getStatusClass(status: string) {
  if (status === "REGISTRADO") {
    return "bg-green-500";
  }

  if (status === "ANULADO") {
    return "bg-red-500";
  }

  return "bg-[#5b35d5]";
}



export function CollectionsTable({ collections }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-[#303659]">
            <tr>
              <th className="px-4 py-3">Identificación</th>
              <th className="px-4 py-3">Medidor</th>
              <th className="px-4 py-3">Periodo</th>
              <th className="px-4 py-3">Monto</th>
              <th className="px-4 py-3">Método</th>
              <th className="px-4 py-3">Referencia</th>
              <th className="px-4 py-3">Fecha pago</th>
              <th className="px-4 py-3 text-center">Estado</th>
            </tr>
          </thead>

          <tbody>
            {collections.map((collection) => (
              <tr
                key={collection.paymentId}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {collection.partnerIdentification ?? "Sin identificación"}
                </td>

                <td className="px-4 py-3">{collection.meterNumber}</td>

                <td className="px-4 py-3">{collection.period}</td>

                <td className="px-4 py-3 font-bold text-[#201a57]">
                  {currencyFormatter.format(collection.paymentAmount)}
                </td>

                <td className="px-4 py-3">{collection.paymentMethod}</td>

                <td className="px-4 py-3">{collection.reference}</td>

                <td className="px-4 py-3">{collection.paymentDate}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusClass(
                      collection.paymentStatus,
                    )}`}
                  >
                    {collection.paymentStatus}
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