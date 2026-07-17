import { ReceiptText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PartnerAssignedMetersSearch } from "../components/PartnerAssignedMetersSearch";
import { useSearchAssignmentsByPartnerIdentification } from "../../medidores/hooks/useSearchAssignmentsByPartnerIdentification";
import type {
  ReadingAssignmentPartner,
  ReadingMeterAssignment,
} from "../../medidores/types/asignacionMedidor.types";

import { InvoiceReadingSearchResult } from "../types/invoice.types";
import { useSearchInvoiceReadings } from "../hooks/useSearchInvoiceReadings";

import { useCreateInvoice } from "../hooks/useCreateInvoice";

export function NewInvoicePage() {
  const navigate = useNavigate();
  const searchAssignmentsMutation =
    useSearchAssignmentsByPartnerIdentification();

  const [assignmentPartner, setAssignmentPartner] =
    useState<ReadingAssignmentPartner | null>(null);

  const [assignments, setAssignments] = useState<ReadingMeterAssignment[]>([]);

  const [selectedAssignment, setSelectedAssignment] =
    useState<ReadingMeterAssignment | null>(null);

  const [serverError, setServerError] = useState<string | null>(null);

  const getBackendMessage = (error: any, fallback: string) =>
    error.response?.data?.errors?.[0]?.defaultMessage ??
    error.response?.data?.message ??
    fallback;

  const createInvoiceMutation = useCreateInvoice();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [baseFee, setBaseFee] = useState("2.00");
  const [penaltyAmount, setPenaltyAmount] = useState("0.00");
  const [discountAmount, setDiscountAmount] = useState("0.00");
  const [dueDate, setDueDate] = useState("");
  const [observation, setObservation] = useState("");

  const [period, setPeriod] = useState("");
  const [readings, setReadings] = useState<InvoiceReadingSearchResult[]>([]);
  const [selectedReading, setSelectedReading] =
    useState<InvoiceReadingSearchResult | null>(null);
  const searchInvoiceReadingsMutation = useSearchInvoiceReadings();

  const handleSearchAssignments = async (identification: string) => {
    try {
      setServerError(null);
      setAssignmentPartner(null);
      setAssignments([]);
      setSelectedAssignment(null);

      const result =
        await searchAssignmentsMutation.mutateAsync(identification);

      setAssignmentPartner(result.socio);
      setAssignments(result.asignaciones);

      if (result.asignaciones.length === 1) {
        setSelectedAssignment(result.asignaciones[0]);
      }
    } catch (error: any) {
      setAssignmentPartner(null);
      setAssignments([]);
      setSelectedAssignment(null);
      setServerError(
        getBackendMessage(
          error,
          "No se encontraron medidores asignados para el socio",
        ),
      );
    }
  };

  const handleSearchReading = async () => {
    if (!selectedAssignment) {
      setServerError("Debe seleccionar un medidor antes de buscar lecturas");
      return;
    }

    if (!period.trim()) {
      setServerError("Debe ingresar el periodo de facturación");
      return;
    }

    try {
      setServerError(null);
      setSelectedReading(null);

      const result = await searchInvoiceReadingsMutation.mutateAsync({
        period,
        meterNumber: selectedAssignment.numeroMedidor,
      });

      setReadings(result);

      if (result.length === 1) {
        setSelectedReading(result[0]);
      }

      if (result.length === 0) {
        setServerError(
          "No existen lecturas registradas para el periodo y medidor seleccionado",
        );
      }
    } catch {
      setReadings([]);
      setSelectedReading(null);
      setServerError("No se pudo consultar la lectura del medidor");
    }
  };

  const handleCreateInvoice = async () => {
    if (!assignmentPartner) {
      setServerError("Debe buscar un socio antes de registrar la factura");
      return;
    }

    if (!selectedAssignment) {
      setServerError(
        "Debe seleccionar un medidor antes de registrar la factura",
      );
      return;
    }

    if (!selectedReading) {
      setServerError(
        "Debe seleccionar una lectura antes de registrar la factura",
      );
      return;
    }

    if (!dueDate) {
      setServerError("Debe ingresar la fecha de vencimiento");
      return;
    }

    try {
      setServerError(null);
      setSuccessMessage(null);

      await createInvoiceMutation.mutateAsync({
        readingId: selectedReading.reading.readingId,
        partnerIdentification: assignmentPartner.identificacionSocio,
        partnerName: assignmentPartner.nombreSocio,
        baseFee: Number(baseFee),
        consumptionAmount: selectedReading.reading.calculatedConsumption,
        penaltyAmount: Number(penaltyAmount),
        discountAmount: Number(discountAmount),
        dueDate,
        observation: observation || undefined,
      });

      setSuccessMessage("Factura registrada correctamente.");
    } catch (error: any) {
      setServerError(
        error.response?.data?.errors?.[0]?.defaultMessage ??
          error.response?.data?.message ??
          "No se pudo registrar la factura",
      );
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
            <ReceiptText size={31} strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
            Registro de factura de agua potable
          </h1>
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

        <PartnerAssignedMetersSearch
          assignmentPartner={assignmentPartner}
          assignments={assignments}
          selectedAssignment={selectedAssignment}
          isSearching={searchAssignmentsMutation.isPending}
          onSearch={handleSearchAssignments}
          onSelectAssignment={setSelectedAssignment}
        />

        <div className="grid gap-4 lg:grid-cols-[260px_180px]">
          <div>
            <label className="mb-2 block text-sm font-bold text-[#303659]">
              Periodo de facturación <span className="text-red-500">*</span>
            </label>

            <input
              type="month"
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleSearchReading}
              disabled={
                !selectedAssignment || searchInvoiceReadingsMutation.isPending
              }
              className="h-11 rounded-lg bg-[#5b35d5] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
            >
              Buscar lectura
            </button>
          </div>
        </div>

        {readings.length > 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-4 py-3">
              <h3 className="text-sm font-bold text-[#201a57]">
                Lecturas encontradas
              </h3>
              <p className="text-xs text-slate-500">
                Seleccione la lectura que desea facturar.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-3">Seleccionar</th>
                    <th className="px-4 py-3">Periodo</th>
                    <th className="px-4 py-3">Fecha lectura</th>
                    <th className="px-4 py-3">Lectura anterior</th>
                    <th className="px-4 py-3">Lectura actual</th>
                    <th className="px-4 py-3">Consumo</th>
                    <th className="px-4 py-3">Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {readings.map((item) => {
                    const isSelected =
                      selectedReading?.reading.readingId ===
                      item.reading.readingId;

                    return (
                      <tr
                        key={item.reading.readingId}
                        className={`border-t border-slate-100 transition ${
                          isSelected ? "bg-[#efe9ff]" : "hover:bg-slate-50"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => setSelectedReading(item)}
                            className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                              isSelected
                                ? "bg-[#5b35d5] text-white"
                                : "border border-[#5b35d5] bg-white text-[#5b35d5] hover:bg-[#efe9ff]"
                            }`}
                          >
                            {isSelected ? "Seleccionada" : "Seleccionar"}
                          </button>
                        </td>

                        <td className="px-4 py-3 font-semibold">
                          {item.reading.period}
                        </td>

                        <td className="px-4 py-3">
                          {item.reading.readingDate}
                        </td>

                        <td className="px-4 py-3">
                          {item.reading.previousReading}
                        </td>

                        <td className="px-4 py-3">
                          {item.reading.currentReading}
                        </td>

                        <td className="px-4 py-3 font-bold text-[#201a57]">
                          {item.reading.calculatedConsumption} m3
                        </td>

                        <td className="px-4 py-3">
                          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                            {item.reading.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {selectedReading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-bold text-[#201a57]">
              Datos de la factura
            </h3>

            <div className="grid gap-4 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-[#303659]">
                  Tarifa base <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={baseFee}
                  onChange={(event) => setBaseFee(event.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#303659]">
                  Consumo
                </label>
                <input
                  value={selectedReading.reading.calculatedConsumption.toFixed(
                    2,
                  )}
                  readOnly
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 shadow-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#303659]">
                  Multa
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={penaltyAmount}
                  onChange={(event) => setPenaltyAmount(event.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#303659]">
                  Descuento
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={discountAmount}
                  onChange={(event) => setDiscountAmount(event.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#303659]">
                  Fecha vencimiento <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="mb-2 block text-sm font-bold text-[#303659]">
                  Observación
                </label>
                <input
                  value={observation}
                  onChange={(event) => setObservation(event.target.value)}
                  placeholder="Factura junio 2026"
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={handleCreateInvoice}
            disabled={
              !assignmentPartner ||
              !selectedAssignment ||
              !selectedReading ||
              createInvoiceMutation.isPending
            }
            className="inline-flex h-13 items-center justify-center rounded-lg bg-[#5b35d5] px-8 py-4 text-base font-bold text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {createInvoiceMutation.isPending
              ? "Guardando factura..."
              : "Guardar factura"}
          </button>

          <button
            type="button"
            onClick={() => {
              setServerError(null);
              setAssignmentPartner(null);
              setAssignments([]);
              setSelectedAssignment(null);
              setReadings([]);
              setSelectedReading(null);
              setPeriod("");
              setBaseFee("2.00");
              setPenaltyAmount("0.00");
              setDiscountAmount("0.00");
              setDueDate("");
              setObservation("");
              setSuccessMessage(null);
            }}
            className="inline-flex h-13 items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-bold text-[#5b35d5] shadow-sm transition hover:bg-slate-50"
          >
            Limpiar
          </button>

          <button
            type="button"
            onClick={() => navigate("/facturacion")}
            className="inline-flex h-13 items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-bold text-[#303659] shadow-sm transition hover:bg-slate-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}
