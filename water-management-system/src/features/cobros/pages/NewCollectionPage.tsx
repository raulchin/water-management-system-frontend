import { CircleDollarSign, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PendingInvoicesTable } from "../components/PendingInvoicesTable";
import { usePendingInvoicesByIdentification } from "../hooks/usePendingInvoicesByIdentification";
import type { PendingInvoice } from "../types/collection.types";

import { useCreateBatchCollection } from "../hooks/useCreateBatchCollection";

const currencyFormatter = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

export function NewCollectionPage() {
  const navigate = useNavigate();
  const pendingInvoicesMutation = usePendingInvoicesByIdentification();

  const [identification, setIdentification] = useState("");
  const [pendingInvoices, setPendingInvoices] = useState<PendingInvoice[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<PendingInvoice[]>(
    [],
  );
  const [paymentMethod, setPaymentMethod] = useState("EFECTIVO");
  const [receivedAmountCents, setReceivedAmountCents] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);

  const createBatchCollectionMutation = useCreateBatchCollection();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [observation, setObservation] = useState("");

  const selectedBillIds = selectedInvoices.map((invoice) => invoice.billId);

  const totalAmount = useMemo(() => {
    return selectedInvoices.reduce(
      (total, invoice) => total + invoice.pendingBalance,
      0,
    );
  }, [selectedInvoices]);

  const receivedAmountValue = receivedAmountCents / 100;
  const changeAmount =
    receivedAmountValue > totalAmount ? receivedAmountValue - totalAmount : 0;

  const handleSearch = async () => {
    const value = identification.trim();

    if (!value) {
      setServerError("Ingrese la identificación del socio");
      return;
    }

    try {
      setServerError(null);
      setPendingInvoices([]);
      setSelectedInvoices([]);
      setSuccessMessage(null);

      const result = await pendingInvoicesMutation.mutateAsync(value);

      setPendingInvoices(result);

      if (result.length === 0) {
        setServerError(
          "No existen facturas pendientes para la identificación ingresada",
        );
      }
    } catch (error: any) {
      setPendingInvoices([]);
      setSelectedInvoices([]);
      setServerError(
        error.response?.data?.errors?.[0]?.defaultMessage ??
          error.response?.data?.message ??
          "No se pudieron consultar las facturas pendientes",
      );
    }
  };

  const formatCurrencyInput = (cents: number) => {
    return currencyFormatter.format(cents / 100);
  };

  const handleReceivedAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const digits = event.target.value.replace(/\D/g, "");
    const cents = Number(digits || 0);

    setReceivedAmountCents(cents);
  };

  const handleToggleInvoice = (invoice: PendingInvoice) => {
    setSelectedInvoices((currentInvoices) => {
      const exists = currentInvoices.some(
        (item) => item.billId === invoice.billId,
      );

      if (exists) {
        return currentInvoices.filter((item) => item.billId !== invoice.billId);
      }

      return [...currentInvoices, invoice];
    });
  };

  const handleConfirmCollection = async () => {
    if (selectedInvoices.length === 0) {
      setServerError("Debe seleccionar al menos una factura");
      return;
    }

    if (paymentMethod === "EFECTIVO" && receivedAmountValue < totalAmount) {
      setServerError("El valor recibido no puede ser menor al total a cobrar");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    const payload = {
      paymentMethod,
      paymentDate: today,
      observation: observation || undefined,
      items: selectedInvoices.map((invoice) => ({
        billId: invoice.billId,
        paymentAmount: invoice.pendingBalance,
      })),
    };

    try {
      setServerError(null);
      setSuccessMessage(null);

      await createBatchCollectionMutation.mutateAsync(payload);

      setSuccessMessage("Cobro registrado correctamente.");
      setPendingInvoices([]);
      setSelectedInvoices([]);
      setReceivedAmountCents(0);
      setObservation("");
    } catch (error: any) {
      setServerError(
        error.response?.data?.errors?.[0]?.defaultMessage ??
          error.response?.data?.message ??
          "No se pudo registrar el cobro",
      );
    }
  };

  const handleClear = () => {
    setIdentification("");
    setPendingInvoices([]);
    setSelectedInvoices([]);
    setPaymentMethod("EFECTIVO");
    setReceivedAmountCents(0);
    setServerError(null);
    setSuccessMessage(null);
    setObservation("");
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
            <CircleDollarSign size={31} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
              SIGAP
            </p>
            <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
              Registro de cobro
            </h1>
          </div>
        </div>

        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="space-y-6 px-6 py-6 sm:px-8">
        {serverError ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {serverError}
          </p>
        ) : null}

        {successMessage ? (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            {successMessage}
          </p>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[320px_140px]">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#303659]">
              Identificación <span className="text-red-500">*</span>
            </label>

            <input
              value={identification}
              onChange={(event) => {
                setIdentification(event.target.value);
                setServerError(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="0105744718"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleSearch}
              disabled={pendingInvoicesMutation.isPending}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#5b35d5] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Search size={18} />
              Buscar
            </button>
          </div>
        </div>

        {pendingInvoices.length > 0 ? (
          <PendingInvoicesTable
            invoices={pendingInvoices}
            selectedBillIds={selectedBillIds}
            onToggleInvoice={handleToggleInvoice}
          />
        ) : null}

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="ml-auto max-w-md space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[#303659]">Subtotal:</span>
              <span className="font-bold text-[#201a57]">
                {currencyFormatter.format(totalAmount)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[#303659]">Descuento:</span>
              <span className="font-bold text-[#201a57]">
                {currencyFormatter.format(0)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-slate-300 pt-3 text-base">
              <span className="font-extrabold text-[#303659]">TOTAL:</span>
              <span className="font-extrabold text-[#201a57]">
                {currencyFormatter.format(totalAmount)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#303659]">
              Forma de pago
            </label>

            <select
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
            >
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="TARJETA">Tarjeta</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#303659]">
              Valor recibido
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={formatCurrencyInput(receivedAmountCents)}
              onChange={handleReceivedAmountChange}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-[#303659]">
              Cambio
            </label>

            <input
              value={currencyFormatter.format(changeAmount)}
              readOnly
              className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-[#201a57] shadow-sm"
            />
          </div>

          <div className="lg:col-span-3">
            <label className="mb-2 block text-sm font-bold text-[#303659]">
              Observación
            </label>

            <input
              value={observation}
              onChange={(event) => setObservation(event.target.value)}
              placeholder="Pago en ventanilla"
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={handleConfirmCollection}
            disabled={
              selectedInvoices.length === 0 ||
              createBatchCollectionMutation.isPending
            }
            className="inline-flex h-13 items-center justify-center rounded-lg bg-[#5b35d5] px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {createBatchCollectionMutation.isPending
              ? "Registrando cobro..."
              : "Confirmar cobro"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="inline-flex h-13 items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-bold text-[#5b35d5] shadow-sm transition hover:bg-slate-50"
          >
            Limpiar
          </button>

          <button
            type="button"
            onClick={() => navigate("/cobros")}
            className="inline-flex h-13 items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-bold text-[#303659] shadow-sm transition hover:bg-slate-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}
