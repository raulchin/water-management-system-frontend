import { Eye } from 'lucide-react'
import type { MeterAssignment } from '../types/asignacionMedidor.types'

type Props = {
  assignments: MeterAssignment[]
}

export function MeterAssignmentsTable({ assignments }: Props) {
  if (assignments.length === 0) {
    return <p className="text-sm text-slate-600">No existen asignaciones registradas.</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="px-4 py-3">Socio</th>
            <th className="px-4 py-3">Identificacion/RUC</th>
            <th className="px-4 py-3">Medidor</th>
            <th className="px-4 py-3">Marca/Modelo</th>
            <th className="px-4 py-3">Fecha asignacion</th>
            <th className="px-4 py-3 text-center">Estado</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.idAsignacion} className="border-t border-slate-100">
              <td className="px-4 py-3 font-semibold text-slate-900">
                {assignment.socioId}
              </td>

              <td className="px-4 py-3">
                {assignment.identificacionSocio}
              </td>

              <td className="px-4 py-3 font-semibold text-[#4b2cb1]">
                {assignment.numeroMedidor}
              </td>

              <td className="px-4 py-3">
                {[assignment.marcaMedidor, assignment.modeloMedidor].filter(Boolean).join(' / ') || '-'}
              </td>

              <td className="px-4 py-3">
                {assignment.fechaAsignacion}
              </td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    assignment.estado === 'ACTIVO' ? 'bg-green-500' : 'bg-pink-600'
                  }`}
                >
                  {assignment.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-700 transition hover:bg-blue-100"
                    aria-label="Ver asignacion"
                  >
                    <Eye size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}