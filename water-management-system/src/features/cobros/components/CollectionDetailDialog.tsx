import { CircleDollarSign, X } from "lucide-react";
import type { CollectionSummary } from "../types/collection.types";

type Props = {
  collection: CollectionSummary | null;
  onClose: () => void;
};

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

/**
 * Returns the Tailwind classes associated with a collection status.
 *
 * @param status - Current collection status.
 * @returns Tailwind classes used to display the status badge.
 */
function getPaymentStatusClass(status: string): string {
  if (status === "REGISTRADO") {
    return "bg-green-500 text-white";
  }

  if (status === "ANULADO") {
    return "bg-red-500 text-white";
  }

  return "bg-[#5b35d5] text-white";
}

/**
 * Displays the complete information for a selected collection.
 *
 * @param props - Dialog properties.
 * @param props.collection - Collection whose details will be displayed.
 * @param props.onClose - Function called when the dialog is closed.
 * @returns The collection detail dialog or null when no collection is selected.
 */
export function CollectionDetailDialog({
  collection,
  onClose,
}: Props) {
  if (!collection) {
    return null;
  }

  const collectionDetails = [
    {
      label: "ID cobro",
      value: String(collection.paymentId),
    },
    {
      label: "Identificación",
      value: collection.partnerIdentification ?? "Sin identificación",
    },
    {
      label: "ID socio",
      value: String(collection.partnerId),
    },
    {
      label: "Medidor",
      value: collection.meterNumber || "Sin medidor",
    },
    {
      label: "ID medidor",
      value: String(collection.meterId),
    },
    {
      label: "Periodo",
      value: collection.period,
    },
    {
      label: "Método de pago",
      value: collection.paymentMethod,
    },
    {
      label: "Referencia",
      value: collection.reference || "Sin referencia",
    },
    {
      label: "Fecha de pago",
      value: collection.paymentDate,
    },
    {
      label: "Fecha de creación",
      value: collection.creationDate,
    },
  ];

  const invoiceDetails = [
    {
      label: "ID factura",
      value: String(collection.billId),
    },
    {
      label: "Total factura",
      value:
        collection.billTotalAmount == null
          ? "No disponible"
          : currencyFormatter.format(collection.billTotalAmount),
    },
    {
      label: "Total pagado",
      value:
        collection.billPaidAmount == null
          ? "No disponible"
          : currencyFormatter.format(collection.billPaidAmount),
    },
    {
      label: "Saldo pendiente",
      value:
        collection.billPendingBalance == null
          ? "No disponible"
          : currencyFormatter.format(collection.billPendingBalance),
    },
    {
      label: "Estado factura",
      value: collection.billStatus ?? "No disponible",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-detail-title"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#efe9ff] text-[#5b35d5]">
              <CircleDollarSign size={25} strokeWidth={2} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
                SIGAP
              </p>

              <h2
                id="collection-detail-title"
                className="text-2xl font-extrabold text-[#201a57]"
              >
                Detalle del cobro
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Referencia: {collection.reference || "Sin referencia"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle del cobro"
            className="rounded-lg border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#d8ccff] bg-[#f7f3ff] p-4">
              <p className="text-sm font-bold text-[#5b35d5]">
                Monto cobrado
              </p>

              <p className="mt-1 text-3xl font-extrabold text-[#201a57]">
                {currencyFormatter.format(collection.paymentAmount)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-500">
                Estado del cobro
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${getPaymentStatusClass(
                  collection.paymentStatus,
                )}`}
              >
                {collection.paymentStatus}
              </span>
            </div>
          </div>

          <section>
            <h3 className="text-lg font-extrabold text-[#201a57]">
              Información del cobro
            </h3>

            <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {collectionDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {detail.label}
                  </dt>

                  <dd className="mt-1 break-words text-sm font-semibold text-slate-900">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-[#201a57]">
              Información de la factura
            </h3>

            <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {invoiceDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {detail.label}
                  </dt>

                  <dd className="mt-1 break-words text-sm font-semibold text-slate-900">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-[#201a57]">
              Observación
            </h3>

            <p className="mt-3 min-h-20 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              {collection.observation || "Sin observación"}
            </p>
          </section>
        </div>

        <div className="sticky bottom-0 flex justify-end border-t border-slate-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#5b35d5] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#4b2cb1]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}