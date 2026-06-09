import type { Socio } from "../types/socio.types";

import { Pencil, Trash2 } from "lucide-react";

type Props = {
  socios: Socio[];
  onEdit: (socio: Socio) => void;
  onDelete: (socio: Socio) => void;
};

export function SociosTable({ socios, onEdit, onDelete }: Props) {
  if (socios.length === 0) {
    return (
      <p className="text-sm text-slate-600">No existen socios registrados.</p>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="px-4 py-3">Nombres</th>
            <th className="px-4 py-3">Cedula</th>
            <th className="px-4 py-3">Telefono</th>
            <th className="px-4 py-3">Direccion</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3 text-center">Estado</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {socios.map((socio) => (
            <tr key={socio.idPartner} className="border-t border-slate-100">
              <td className="px-4 py-3">
                {socio.names} {socio.lastName}
              </td>
              <td className="px-4 py-3">{socio.taxIdentification}</td>
              <td className="px-4 py-3">{socio.phone ?? "-"}</td>
              <td className="px-4 py-3">{socio.address}</td>
              <td className="px-4 py-3">{socio.email}</td>
              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    socio.status ? "bg-green-500" : "bg-pink-600"
                  }`}
                >
                  {socio.status ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(socio)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 transition hover:bg-blue-100"
                    aria-label="Editar socio"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(socio)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700 transition hover:bg-red-100"
                    aria-label="Eliminar socio"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
