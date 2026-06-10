import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SocioForm } from "../components/SocioForm";
import { crearSocio } from "../api/sociosApi";
import type { SocioFormData } from "../schemas/socioSchema";
import { useState } from "react";

export function NuevoSocioPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (data: SocioFormData) => {
    try {
      setServerError(null);
      setSuccessMessage(null);
      await crearSocio(data);
      setSuccessMessage("Socio registrado correctamente.");
    } catch (error: any) {
      const backendMessage = error.response?.data?.message;
      setSuccessMessage(null);
      setServerError(backendMessage ?? "No se pudo registrar el socio");
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 pt-6 sm:px-8">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm">
            <UserPlus size={31} strokeWidth={1.8} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[#201a57]">
            Registro de nuevos socios
          </h1>
        </div>
        <div className="mt-5 h-px bg-[#b7a4ff]" />
      </div>

      <div className="px-6 py-6 sm:px-8">
        <SocioForm
          onSubmit={handleSubmit}
          onCancel={() => navigate("/socios")}
          serverError={serverError}
          successMessage={successMessage}
          onClearError={() => {
            setServerError(null);
            setSuccessMessage(null);
          }}
        />
      </div>
    </section>
  );
}
