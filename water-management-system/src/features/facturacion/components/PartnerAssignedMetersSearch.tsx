import { Search } from 'lucide-react'
import { useState } from 'react'
import type {
  ReadingAssignmentPartner,
  ReadingMeterAssignment,
} from '../../medidores/types/asignacionMedidor.types'

type Props = {
  assignmentPartner: ReadingAssignmentPartner | null
  assignments: ReadingMeterAssignment[]
  selectedAssignment: ReadingMeterAssignment | null
  isSearching?: boolean
  onSearch: (identification: string) => void
  onSelectAssignment: (assignment: ReadingMeterAssignment) => void
}

const inputClass =
  'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm placeholder:text-slate-400 focus:border-[#5b35d5] focus:outline-none focus:ring-2 focus:ring-[#d8ccff]'

const readOnlyClass =
  'h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 shadow-sm'

const labelClass = 'mb-2 block text-sm font-bold text-[#303659]'
const errorClass = 'mt-1 text-xs font-semibold text-red-600'

export function PartnerAssignedMetersSearch({
  assignmentPartner,
  assignments,
  selectedAssignment,
  isSearching,
  onSearch,
  onSelectAssignment,
}: Props) {
  const [identification, setIdentification] = useState('')
  const [searchError, setSearchError] = useState<string | null>(null)

  const handleSearch = () => {
    const value = identification.trim()

    if (!value) {
      setSearchError('Ingrese el criterio para buscar')
      return
    }

    setSearchError(null)
    onSearch(value)
  }

  return (
    <section className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <label className={labelClass} htmlFor="partnerIdentification">
            Identificacion/RUC <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-[minmax(0,1fr)_44px] gap-2">
            <input
              id="partnerIdentification"
              className={inputClass}
              placeholder="0105744718"
              value={identification}
              onChange={(event) => {
                setIdentification(event.target.value)

                if (searchError) {
                  setSearchError(null)
                }
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleSearch()
                }
              }}
            />

            <button
              type="button"
              onClick={handleSearch}
              disabled={isSearching}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#5b35d5] text-white shadow-sm transition hover:bg-[#4b2cb1] disabled:cursor-not-allowed disabled:opacity-70"
              aria-label="Buscar socio"
            >
              <Search size={18} />
            </button>
          </div>

          {searchError ? <p className={errorClass}>{searchError}</p> : null}
        </div>

        <div>
          <label className={labelClass}>Nombre</label>
          <input
            className={readOnlyClass}
            value={assignmentPartner?.nombreSocio ?? ''}
            readOnly
          />
        </div>

        <div>
          <label className={labelClass}>Correo</label>
          <input
            className={readOnlyClass}
            value={assignmentPartner?.email ?? ''}
            readOnly
          />
        </div>
      </div>

      {assignments.length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-4 py-3">
            <h3 className="text-sm font-bold text-[#201a57]">
              Medidores asignados al socio
            </h3>
            <p className="text-xs text-slate-500">
              Seleccione el medidor que desea usar para continuar.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3">Seleccionar</th>
                  <th className="px-4 py-3">Medidor</th>
                  <th className="px-4 py-3">Marca</th>
                  <th className="px-4 py-3">Modelo</th>
                  <th className="px-4 py-3 text-center">Estado</th>
                </tr>
              </thead>

              <tbody>
                {assignments.map((assignment) => {
                  const isSelected =
                    selectedAssignment?.asignacionId === assignment.asignacionId

                  return (
                    <tr
                      key={assignment.asignacionId}
                      className={`border-t border-slate-100 transition ${
                        isSelected ? 'bg-[#efe9ff]' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => onSelectAssignment(assignment)}
                          className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                            isSelected
                              ? 'bg-[#5b35d5] text-white'
                              : 'border border-[#5b35d5] bg-white text-[#5b35d5] hover:bg-[#efe9ff]'
                          }`}
                        >
                          {isSelected ? 'Seleccionado' : 'Seleccionar'}
                        </button>
                      </td>

                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {assignment.numeroMedidor}
                      </td>

                      <td className="px-4 py-3">{assignment.marcaMedidor}</td>

                      <td className="px-4 py-3">{assignment.modeloMedidor}</td>

                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
                            assignment.estadoAsignacion === 'ACTIVO'
                              ? 'bg-green-500'
                              : 'bg-pink-600'
                          }`}
                        >
                          {assignment.estadoAsignacion}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-3">
        <div>
          <label className={labelClass}>Medidor seleccionado</label>
          <input
            className={readOnlyClass}
            value={selectedAssignment?.numeroMedidor ?? ''}
            readOnly
          />
        </div>

        <div>
          <label className={labelClass}>Marca</label>
          <input
            className={readOnlyClass}
            value={selectedAssignment?.marcaMedidor ?? ''}
            readOnly
          />
        </div>

        <div>
          <label className={labelClass}>Modelo</label>
          <input
            className={readOnlyClass}
            value={selectedAssignment?.modeloMedidor ?? ''}
            readOnly
          />
        </div>
      </div>
    </section>
  )
}