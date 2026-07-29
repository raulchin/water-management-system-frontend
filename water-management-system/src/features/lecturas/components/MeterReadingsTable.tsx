import type { MeterReading } from "../types/meterReading.types";

type Props = {
  readings: MeterReading[];
  onEdit: (reading: MeterReading) => void;
};

export function MeterReadingsTable({ readings, onEdit }: Props) {
  if (readings.length === 0) {
    return (
      <p className="text-sm text-slate-600">No existen lecturas registradas.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-700">
          <tr>
            <th className="px-4 py-3">Periodo</th>
            <th className="px-4 py-3">Medidor</th>
            <th className="px-4 py-3">Socio</th>
            <th className="px-4 py-3">Fecha lectura</th>
            <th className="px-4 py-3">Anterior</th>
            <th className="px-4 py-3">Actual</th>
            <th className="px-4 py-3">Consumo</th>
            <th className="px-4 py-3 text-center">Estado</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {readings.map((reading) => (
            <tr
              key={reading.readingId}
              className="border-t border-slate-100 transition hover:bg-[#f7f3ff]"
            >
              <td className="px-4 py-3 font-semibold text-slate-900">
                {reading.period}
              </td>
              <td className="px-4 py-3">
                {reading.meterNumber || "Sin medidor"}
              </td>
              <td className="px-4 py-3">
                {reading.partnerIdentification || "Sin identificación"}
              </td>
              <td className="px-4 py-3">{reading.readingDate}</td>
              <td className="px-4 py-3">{reading.previousReading}</td>
              <td className="px-4 py-3">{reading.currentReading}</td>
              <td className="px-4 py-3 font-semibold text-[#4b2cb1]">
                {reading.calculatedConsumption}
              </td>
              <td className="px-4 py-3 text-center">
                <span className="inline-flex rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                  {reading.status}
                </span>
              </td>

              <td className="px-4 py-3 text-center">
                <button
                  type="button"
                  onClick={() => onEdit(reading)}
                  className="rounded-lg border border-[#5b35d5] bg-white px-3 py-1 text-xs font-bold text-[#5b35d5] transition hover:bg-[#efe9ff]"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
