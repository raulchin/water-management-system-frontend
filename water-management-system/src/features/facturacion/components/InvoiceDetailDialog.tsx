import { ReceiptText, X } from "lucide-react";
import type { InvoiceSummary } from "../types/invoice.types";

type Props = {
  invoice: InvoiceSummary | null;
  onClose: () => void;
};

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

/**
 * Obtiene las clases visuales correspondientes al estado de una factura.
 *
 * @param status Estado actual de la factura.
 * @returns Clases Tailwind para representar el estado.
 */
function getInvoiceStatusClass(status: string): string {
  if (status === "PENDIENTE") {
    return "bg-yellow-500 text-white";
  }

  if (status === "PAGADA") {
    return "bg-green-500 text-white";
  }

  if (status === "VENCIDA") {
    return "bg-red-500 text-white";
  }

  if (status === "ANULADA") {
    return "bg-slate-500 text-white";
  }

  return "bg-[#5b35d5] text-white";
}

/**
 * Formatea una fecha ISO para presentarla al usuario.
 *
 * @param value Fecha recibida desde el backend.
 * @returns Fecha con formato día, mes y año o un texto alternativo.
 */
function formatDate(value: string | null): string {
  if (!value) {
    return "No disponible";
  }

  const datePart = value.split("T")[0];
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${day}-${month}-${year}`;
}

/**
 * Muestra la información principal de una factura seleccionada.
 *
 * @param props Propiedades del diálogo.
 * @param props.invoice Factura que se mostrará.
 * @param props.onClose Función ejecutada al cerrar el diálogo.
 * @returns Diálogo de detalle o null cuando no existe una factura seleccionada.
 */
export function InvoiceDetailDialog({
  invoice,
  onClose,
}: Props) {
  if (!invoice) {
    return null;
  }

  const generalDetails = [
    {
      label: "Identificación",
      value: invoice.partnerIdentification,
    },
    {
      label: "Socio",
      value: invoice.partnerName || "Sin nombre registrado",
    },
    {
      label: "Medidor",
      value: invoice.meterNumber || "Sin medidor",
    },
    {
      label: "Periodo",
      value: invoice.period,
    },
    {
      label: "Tipo de factura",
      value: invoice.billType,
    },
    {
      label: "Consumo calculado",
      value: `${Number(invoice.calculatedConsumption ?? 0).toFixed(2)} m³`,
    },
  ];

  const amountDetails = [
    {
      label: "Tarifa base",
      value: currencyFormatter.format(invoice.baseFee),
    },
    {
      label: "Valor por consumo",
      value: currencyFormatter.format(invoice.consumptionAmount),
    },
    {
      label: "Multas",
      value: currencyFormatter.format(invoice.penaltyAmount),
    },
    {
      label: "Descuentos",
      value: currencyFormatter.format(invoice.discountAmount),
    },
  ];

  const dateDetails = [
    {
      label: "Fecha de emisión",
      value: formatDate(invoice.issueDate),
    },
    {
      label: "Fecha de vencimiento",
      value: formatDate(invoice.dueDate),
    },
    {
      label: "Fecha de creación",
      value: formatDate(invoice.creationDate),
    },
    {
      label: "Última actualización",
      value: formatDate(invoice.updateDate),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="invoice-detail-title"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#efe9ff] text-[#5b35d5]">
              <ReceiptText size={25} strokeWidth={2} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
                SIGAP
              </p>

              <h2
                id="invoice-detail-title"
                className="text-2xl font-extrabold text-[#201a57]"
              >
                Detalle de factura #{invoice.billId}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Periodo {invoice.period}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle de factura"
            className="rounded-lg border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </header>

        <div className="space-y-6 px-6 py-6">
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#d8ccff] bg-[#f7f3ff] p-4">
              <p className="text-sm font-bold text-[#5b35d5]">
                Total factura
              </p>

              <p className="mt-1 text-2xl font-extrabold text-[#201a57]">
                {currencyFormatter.format(invoice.totalAmount)}
              </p>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-bold text-green-700">
                Total pagado
              </p>

              <p className="mt-1 text-2xl font-extrabold text-green-800">
                {currencyFormatter.format(invoice.paidAmount)}
              </p>
            </div>

            <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
              <p className="text-sm font-bold text-orange-700">
                Saldo pendiente
              </p>

              <p className="mt-1 text-2xl font-extrabold text-orange-800">
                {currencyFormatter.format(invoice.pendingBalance)}
              </p>
            </div>
          </section>

          <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Estado de la factura
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${getInvoiceStatusClass(
                  invoice.status,
                )}`}
              >
                {invoice.status}
              </span>
            </div>

            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Vencimiento
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                {formatDate(invoice.dueDate)}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-[#201a57]">
              Información general
            </h3>

            <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {generalDetails.map((detail) => (
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
              Desglose de valores
            </h3>

            <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {amountDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {detail.label}
                  </dt>

                  <dd className="mt-1 text-sm font-bold text-[#201a57]">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-[#201a57]">
              Fechas
            </h3>

            <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {dateDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {detail.label}
                  </dt>

                  <dd className="mt-1 text-sm font-semibold text-slate-900">
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
              {invoice.observation || "Sin observación"}
            </p>
          </section>
        </div>

        <footer className="sticky bottom-0 flex justify-end border-t border-slate-200 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#5b35d5] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#4b2cb1]"
          >
            Cerrar
          </button>
        </footer>
      </div>
    </div>
  );
}