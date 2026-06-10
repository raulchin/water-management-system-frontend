import type { Medidor } from '../types/medidor.types';

type Props = {
  medidores: Medidor[]
}

export function MedidoresTable({ medidores }: Props) {

  if (medidores.length === 0) {
    return (
      <p className="text-sm text-slate-600">
        No existen medidores registrados.
      </p>
    )
  }
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="px-4 py-3">Numero</th>
            <th className="px-4 py-3">Marca</th>
            <th className="px-4 py-3">Modelo</th>
            <th className="px-4 py-3">Ubicacion</th>
            <th className="px-4 py-3">Referencia</th>
            <th className="px-4 py-3">Fecha instalacion</th>
            <th className="px-4 py-3 text-center">Estado</th>
          </tr>
        </thead>

        <tbody>
          {medidores.map((medidor) => (
            <tr key={medidor.medidorId} className="border-t border-slate-100">
              <td className="px-4 py-3 font-semibold text-slate-900">
                {medidor.numeroMedidor}
              </td>

              <td className="px-4 py-3">
                {medidor.marca}
              </td>

              <td className="px-4 py-3">
                {medidor.modelo}
              </td>

              <td className="px-4 py-3">
                {medidor.ubicacion}
              </td>

              <td className="px-4 py-3">
                {medidor.direccionReferencia}
              </td>

              <td className="px-4 py-3">
                {medidor.fechaInstalacion}
              </td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
                    medidor.estado === 'ACTIVO' ? 'bg-green-500' : 'bg-pink-600'
                  }`}
                >
                  {medidor.estado === 'ACTIVO' ? 'Activo' : 'Inactivo'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}