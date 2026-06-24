import { ClipboardList } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MeterReadingForm } from "../components/MeterReadingForm";
import { useCreateMeterReading } from "../hooks/useCreateMeterReading";
import type { MeterReadingFormData } from "../schemas/meterReadingSchema";

import { useSearchAssignmentsByPartnerIdentification } from "../../medidores/hooks/useSearchAssignmentsByPartnerIdentification";

import type {
  ReadingAssignmentPartner,
  ReadingMeterAssignment,
} from "../../medidores/types/asignacionMedidor.types";




export function NewMeterReadingPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateMeterReading();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const searchAssignmentsMutation = useSearchAssignmentsByPartnerIdentification();

  const getBackendMessage = (error: any, fallback: string) =>
    error.response?.data?.errors?.[0]?.defaultMessage ??
    error.response?.data?.message ??
    fallback;

  const handleSubmit = async (data: MeterReadingFormData) => {
    if (!assignmentPartner || !selectedAssignment) {
      setServerError(
        "Debe seleccionar un medidor asignado antes de guardar la lectura",
      );
      return;
    }

    try {
      setServerError(null);
      setSuccessMessage(null);

      await mutateAsync({
        meterId: selectedAssignment.medidorId,
        assignmentId: selectedAssignment.asignacionId,
        partnerId: assignmentPartner.socioId,
        period: data.period,
        readingDate: data.readingDate,
        previousReading: data.previousReading,
        currentReading: data.currentReading,
        status: data.status,
        observation: data.observation || undefined,
      });

      setSuccessMessage("Lectura registrada correctamente.");
    } catch (error: any) {
      setServerError(
        getBackendMessage(error, "No se pudo registrar la lectura"),
      );
    }
  };

  

  const handleSearchPartner = async (identification: string) => {
    try {
      setServerError(null);
      setSuccessMessage(null);
      setAssignmentPartner(null);
      setPartnerAssignments([]);
      setSelectedAssignment(null);

      const result =
        await searchAssignmentsMutation.mutateAsync(identification);

      console.log("Asignaciones encontradas para lectura:", result);

      setAssignmentPartner(result.socio);
      setPartnerAssignments(result.asignaciones);

      if (result.asignaciones.length === 1) {
        setSelectedAssignment(result.asignaciones[0]);
      }
    } catch (error: any) {
      setAssignmentPartner(null);
      setPartnerAssignments([]);
      setSelectedAssignment(null);
      setServerError(
        getBackendMessage(
          error,
          "No se encontraron asignaciones para el socio",
        ),
      );
    }
  };


  const [assignmentPartner, setAssignmentPartner] =
    useState<ReadingAssignmentPartner | null>(null);
  const [partnerAssignments, setPartnerAssignments] = useState<
    ReadingMeterAssignment[]
  >([]);
  const [selectedAssignment, setSelectedAssignment] =
    useState<ReadingMeterAssignment | null>(null);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
            <ClipboardList size={31} strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
            Registro de lectura de medidor
          </h1>
        </div>
        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
        <MeterReadingForm
          onSubmit={handleSubmit}
          onCancel={() => navigate("/lecturas")}
          serverError={serverError}
          successMessage={successMessage}
          isSaving={isPending}
          isSearchingPartner={searchAssignmentsMutation.isPending}
          assignmentPartner={assignmentPartner}
          partnerAssignments={partnerAssignments}
          selectedAssignment={selectedAssignment}
          onSearchPartner={handleSearchPartner}
          onSelectAssignment={setSelectedAssignment}
          onClearMessages={() => {
            setServerError(null);
            setSuccessMessage(null);
          }}
          onClearSelection={() => {
            setAssignmentPartner(null);
            setPartnerAssignments([]);
            setSelectedAssignment(null);
          }}
        />
      </div>
    </section>
  );
}
