import { Link } from "react-router-dom";
import { SociosTable } from "../components/SociosTable";
import { useSocios } from "../hooks/useSocios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import type { Socio } from "../types/socio.types";

import { useQueryClient } from "@tanstack/react-query";

import { deleteSocio } from "../api/sociosApi";

export function SociosPage() {
  const [socioToDelete, setSocioToDelete] = useState<Socio | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { data = [], isLoading, isError } = useSocios();

  const queryClient = useQueryClient()

  const navigate = useNavigate();

  const handleEdit = (socio: Socio) => {

    navigate(`/socios/${socio.idPartner}/editar`);

  };

  const handleDelete = (socio: Socio) => {
    setDeleteError(null);
    console.log("Eliminar socio:", socio);
    setSocioToDelete(socio);
  };

  const handleCancelDelete = () => {
    setSocioToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!socioToDelete) return;

    try {
      await deleteSocio(socioToDelete.idPartner);
      setSocioToDelete(null);
      // refrescar lista
      await queryClient.invalidateQueries({ queryKey: ['socios'] })
    } catch (error: any) {
      setDeleteError(
        error.response?.data?.message ?? "No se pudo eliminar el socio",
      );
    }
  };

  return (
    <section className="mx-auto max-w-6xl space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4b2cb1]">
            SIGAP
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Listado de socios
          </h1>
        </div>

        <Link
          to="/socios/nuevo"
          className="rounded-lg bg-[#4b2cb1] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3b238e]"
        >
          Nuevo socio
        </Link>
      </header>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        {isLoading ? <p>Cargando socios...</p> : null}
        {isError ? (
          <p className="text-sm text-red-700">
            No se pudieron cargar los socios.
          </p>
        ) : null}
        {!isLoading && !isError ? (
          <SociosTable
            socios={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : null}
      </div>

      {socioToDelete ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">Eliminar socio</h2>

            <p className="mt-3 text-sm text-slate-600">
              Estas seguro de eliminar al socio{" "}
              <span className="font-semibold text-slate-900">
                {socioToDelete.names} {socioToDelete.lastName}
              </span>
              ?
            </p>

            {deleteError ? (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {deleteError}
              </p>
            ) : null}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
