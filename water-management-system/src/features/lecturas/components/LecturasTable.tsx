import { calcularConsumo } from '../utils/calcularConsumo'
import type { Lectura } from '../types/lectura.types'

type Props = {
  lecturas: Lectura[]
}

export function LecturasTable({ lecturas }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="px-4 py-3">Socio</th>
            <th className="px-4 py-3">Medidor</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Consumo</th>
          </tr>
        </thead>
        <tbody>
          {lecturas.map((lectura) => (
            <tr key={lectura.id} className="border-t border-slate-100">
              <td className="px-4 py-3">{lectura.socioId}</td>
              <td className="px-4 py-3">{lectura.medidorId}</td>
              <td className="px-4 py-3">{lectura.fecha}</td>
              <td className="px-4 py-3">
                {calcularConsumo(lectura.lecturaActual, lectura.lecturaAnterior)} m3
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
