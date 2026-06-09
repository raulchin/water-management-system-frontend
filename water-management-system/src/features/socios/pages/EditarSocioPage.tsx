import { useNavigate, useParams } from "react-router-dom";
import { SocioForm } from "../components/SocioForm";
import { actualizarSocio, obtenerSocioPorId } from "../api/sociosApi";
import type { SocioFormData } from "../schemas/socioSchema";
import { useQuery } from "@tanstack/react-query";

export function EditarSocioPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const idPartner = Number(id);

  const {
    data: socio,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["socio", idPartner],
    queryFn: () => obtenerSocioPorId(idPartner),
    enabled: Number.isFinite(idPartner),
  });

  const handleSubmit = async (data: SocioFormData) => {
    await actualizarSocio(idPartner, data);
    navigate("/socios");
  };

  if (isLoading) return <p>Cargando socio...</p>;

  if (isError || !socio) {
    return <p className="text-sm text-red-700">No se pudo cargar el socio.</p>;
  }

  const formValues: SocioFormData = {
    cedula: socio.taxIdentification,
    nombres: socio.names,
    apellidos: socio.lastName,
    direccion: socio.address,
    telefono: socio.phone ?? "",
    correo: socio.email ?? "",
    estado: socio.status ?? true,
    numeroContrato: "",
    numeroMedidor: "",
  };

  return (
    <SocioForm
      defaultValues={formValues}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/socios")}
      submitLabel="Actualizar socio"
    />
  );
}
