import { Link2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AssignmentMeterForm } from "../components/AssignmentMeterForm";
import { useAssignmentMeter } from "../hooks/useAssignmentMeter";
import { useSearchMeterByNumber } from "../hooks/useSearchMeterByNumber";
import { useSearchPartnerByIdentification } from "../hooks/useSearchPartnerByIdentification";
import type { MeterAssignmentFormData } from "../schemas/meterAssignmentSchema";

import type {
  MedidorAsignacion,
  SocioAsignacion,
} from "../types/asignacionMedidor.types";

export function AssignmentMeterPage() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState<SocioAsignacion | null>(null);
  const [meter, setMeter] = useState<MedidorAsignacion | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const searchPartnerMutation = useSearchPartnerByIdentification();
  const searchMeterMutation = useSearchMeterByNumber();
  const assignmentMeterMutation = useAssignmentMeter();

  const getBackendMessage = (error: any, fallback: string) =>
    error.response?.data?.errors?.[0]?.defaultMessage ??
    error.response?.data?.message ??
    fallback;

  const handleBuscarSocio = async (identificacion: string) => {
    try {
      setServerError(null);
      setSuccessMessage(null);
      setPartner(null);

      const result = await searchPartnerMutation.mutateAsync(identificacion);
      setPartner(result);
    } catch (error: any) {
      setServerError(getBackendMessage(error, "No se pudo encontrar el socio"));
    }
  };

  const handleBuscarMedidor = async (numeroMedidor: string) => {
    try {
      setServerError(null);
      setSuccessMessage(null);
      setMeter(null);

      const result = await searchMeterMutation.mutateAsync(numeroMedidor);
      setMeter(result);
    } catch (error: any) {
      setServerError(
        getBackendMessage(error, "No se pudo encontrar el medidor"),
      );
    }
  };

  const handleSubmit = async (data: MeterAssignmentFormData) => {
    if (!partner || !meter) {
      setServerError(
        "Debe seleccionar un socio y un medidor antes de guardar la asignacion",
      );
      return;
    }

    try {
      setServerError(null);
      setSuccessMessage(null);

      await assignmentMeterMutation.mutateAsync({
        socioId: partner.idPartner,
        medidorId: meter.medidorId,
        fechaAsignacion: data.fechaAsignacion,
        estado: data.estado,
        observacion: data.observacion || undefined,
      });

      setSuccessMessage("Medidor asignado correctamente.");
    } catch (error: any) {
      setServerError(getBackendMessage(error, "No se pudo asignar el medidor"));
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
            <Link2 size={31} strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
            Asignacion de medidor a socio
          </h1>
        </div>
        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
        <AssignmentMeterForm
          socio={partner}
          medidor={meter}
          serverError={serverError}
          successMessage={successMessage}
          isSearchingSocio={searchPartnerMutation.isPending}
          isSearchingMedidor={searchMeterMutation.isPending}
          isSaving={assignmentMeterMutation.isPending}
          onBuscarSocio={handleBuscarSocio}
          onBuscarMedidor={handleBuscarMedidor}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/medidores")}
          onClearMessages={() => {
            setServerError(null);
            setSuccessMessage(null);
          }}
          onClearSelection={() => {
            setPartner(null);
            setMeter(null);
          }}
        />
      </div>
    </section>
  );
}
