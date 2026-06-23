import { ClipboardList } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MeterReadingForm } from "../components/MeterReadingForm";
import { useCreateMeterReading } from "../hooks/useCreateMeterReading";
import type { MeterReadingFormData } from "../schemas/meterReadingSchema";

import { useSearchPartnerByIdentification } from "../../medidores/hooks/useSearchPartnerByIdentification";
import type {
  MedidorAsignacion,
  SocioAsignacion,
} from "../../medidores/types/asignacionMedidor.types";

import { useSearchMeterByNumber } from "../../medidores/hooks/useSearchMeterByNumber";

export function NewMeterReadingPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateMeterReading();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const getBackendMessage = (error: any, fallback: string) =>
    error.response?.data?.errors?.[0]?.defaultMessage ??
    error.response?.data?.message ??
    fallback;

  const handleSubmit = async (data: MeterReadingFormData) => {
    try {
      setServerError(null);
      setSuccessMessage(null);

      await mutateAsync({
        meterId: data.meterId,
        assignmentId: data.assignmentId,
        partnerId: data.partnerId,
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
      setPartner(null);

      const result = await searchPartnerMutation.mutateAsync(identification);

      console.log("Socio encontrado para lectura:", result);

      setPartner(result);
    } catch (error: any) {
      setPartner(null);
      setServerError(getBackendMessage(error, "No se pudo encontrar el socio"));
    }
  };

  const handleSearchMeter = async (meterNumber: string) => {
    try {
      setServerError(null);
      setSuccessMessage(null);
      setMeter(null);

      const result = await searchMeterMutation.mutateAsync(meterNumber);

      console.log("Medidor encontrado para lectura:", result);

      setMeter(result);
    } catch (error: any) {
      setMeter(null);
      setServerError(
        getBackendMessage(error, "No se pudo encontrar el medidor"),
      );
    }
  };
  const [partner, setPartner] = useState<SocioAsignacion | null>(null);

  const searchPartnerMutation = useSearchPartnerByIdentification();

  const [meter, setMeter] = useState<MedidorAsignacion | null>(null);

  const searchMeterMutation = useSearchMeterByNumber();

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
          partner={partner}
          meter={meter}
          isSearchingPartner={searchPartnerMutation.isPending}
          isSearchingMeter={searchMeterMutation.isPending}
          onSearchPartner={handleSearchPartner}
          onSearchMeter={handleSearchMeter}
          onClearMessages={() => {
            setServerError(null);
            setSuccessMessage(null);
          }}
        />
      </div>
    </section>
  );
}
