import { BadgeAlert } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenaltyForm } from "../components/PenaltyForm";
import { useCreatePenalty } from "../hooks/useCreatePenalty";
import type { PenaltyFormData } from "../schemas/penaltySchema";
import { useSearchPartnerByIdentification } from "../../medidores/hooks/useSearchPartnerByIdentification";

export function NewPenaltyPage() {
  const navigate = useNavigate();
  const createPenaltyMutation = useCreatePenalty();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const searchPartnerMutation = useSearchPartnerByIdentification();

  const getBackendMessage = (error: any, fallback: string) =>
    error.response?.data?.errors?.[0]?.defaultMessage ??
    error.response?.data?.message ??
    fallback;

  const handleSubmit = async (data: PenaltyFormData) => {
    try {
      setServerError(null);
      setSuccessMessage(null);

      await createPenaltyMutation.mutateAsync({
        penaltyTypeId: data.penaltyTypeId,
        partnerId: data.partnerId,
        meterId: null,
        period: data.period,
        partnerIdentification: data.partnerIdentification,
        meterNumber: null,
        ...(data.amount !== undefined ? { amount: data.amount } : {}),
        observation: data.observation,
      });

      setSuccessMessage("Multa registrada correctamente.");
    } catch (error: any) {
      setServerError(getBackendMessage(error, "No se pudo registrar la multa"));
    }
  };

  const handleSearchPartner = async (identification: string) => {
    try {
      setServerError(null);
      setSuccessMessage(null);

      return await searchPartnerMutation.mutateAsync(identification);
    } catch (error: any) {
      setServerError(
        getBackendMessage(
          error,
          "No se pudo consultar la información del socio",
        ),
      );

      throw error;
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
            <BadgeAlert size={31} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#5b35d5]">
              SIGAP
            </p>
            <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
              Registro de multa
            </h1>
          </div>
        </div>

        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
        <PenaltyForm
          onSubmit={handleSubmit}
          onCancel={() => navigate("/multas")}
          onSearchPartner={handleSearchPartner}
          isSaving={createPenaltyMutation.isPending}
          isSearchingPartner={searchPartnerMutation.isPending}
          serverError={serverError}
          successMessage={successMessage}
          onClearMessages={() => {
            setServerError(null);
            setSuccessMessage(null);
          }}
        />
      </div>
    </section>
  );
}
